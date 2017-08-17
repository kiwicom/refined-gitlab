import FUNCTIONS from "./libs/FUNCTIONS";
import getUsername from "./libs/helpers/getUsername";
import optimisticUpdate from "./libs/helpers/optimisticUpdate";
import ROUTES from "./libs/ROUTES";
import pathnameToRoute from "./libs/helpers/pathnameToRoute";
import detectGlobals from "./libs/helpers/detectGlobals";
import addOrRemove from "./libs/helpers/addOrRemove";
import isProjectPage from "./libs/helpers/isProjectPage";
import detectProjectSlug from "./libs/helpers/detectProjectSlug";
import detectProjectLabelCategories
  from "./libs/helpers/detectProjectLabelCategories";
import divideLabels from "./libs/transformations/divideLabels";
import alignLabels from "./libs/transformations/alignLabels";

const parentElClassNames = ["merge-request", "issue"];

document.addEventListener("refined-gitlab", e => {
  const route = pathnameToRoute(window.location.pathname);

  if (e.detail.fn === "ready") {
    const { storage } = e.detail;

    let labelCategories;
    if (isProjectPage(document)) {
      const projectHash = detectProjectSlug();
      labelCategories = storage[`labelCategories:${projectHash}`];
      if (!labelCategories) {
        detectProjectLabelCategories().then(categories => {
          document.dispatchEvent(
            new CustomEvent("refined-gitlab", {
              detail: {
                fn: "storageSet",
                key: `labelCategories:${projectHash}`,
                val: categories.join(",") || "__NO_CATEGORIES_DETECTED__",
              },
            })
          );

          window.location.reload();
        });
        return; // Do not continue
      }
    }

    switch (route) { // eslint-disable-line default-case
      case ROUTES.MR:
      case ROUTES.ISSUE:
        // Enable when it will work properly
        // showUsername(route);
        divideLabels(labelCategories);
        break;
      case ROUTES.MRS:
      case ROUTES.ISSUES:
        alignLabels(route, labelCategories);
        break;
    }
  }

  if (e.detail.fn === FUNCTIONS.bindLabelsKeyboardShortcuts) {
    const { mapping } = e.detail;

    window.Mousetrap.bind(
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ev => {
        const key = ev.key;

        const number = Number(key);
        const label = mapping[number];

        if (label) {
          const parts = location.pathname.split("/");
          const group = parts[1];
          const project = parts[2];
          const issueId = parts[4];

          const issuableTypeInternal = [ROUTES.ISSUE, ROUTES.ISSUES].includes(
            route
          )
            ? "issue"
            : "merge_request";
          const issuableTypeInternalPlural = [
            ROUTES.ISSUE,
            ROUTES.ISSUES,
          ].includes(route)
            ? "issues"
            : "merge_requests";

          const labelsAlready = new Set(
            [].slice
              .call(
                document.querySelectorAll(
                  `input[name='${issuableTypeInternal}[label_names][]']`
                )
              )
              .map(x => Number(x.value))
          );

          const labelsNew = addOrRemove(Array.from(labelsAlready), label);

          const labelsString = Array.from(labelsNew)
            .map(x => `${issuableTypeInternal}%5Blabel_ids%5D%5B%5D=${x}`)
            .join("&");

          $.ajax({
            type: "PUT",
            headers: {
              "X-CSRF-Token": $.rails.csrfToken(),
            },
            url: `/${group}/${project}/${issuableTypeInternalPlural}/${issueId}.json`,
            contentType: "application/x-www-form-urlencoded",
            data: labelsString,
            success: () => {
              window.location.reload();
            },
          });
        } else {
          window.alert(
            `No shortcut label set in slot ${number}, set it in extension settings`
          );
        }
      }
    );
  }

  if (e.detail.fn === FUNCTIONS.bindAssignKeyboardShortcuts) {
    const { shortcut } = e.detail;
    let x, y; // eslint-disable-line one-var
    if (route === ROUTES.ISSUES || route === ROUTES.MRS) {
      document.onmousemove = _e => {
        x = _e.pageX - window.pageXOffset;
        y = _e.pageY - window.pageYOffset;
      };
    }

    // eslint-disable-next-line no-unused-vars
    window.Mousetrap.bind(shortcut, ev => {
      document.dispatchEvent(
        new CustomEvent("assign_me_to_issue_or_mr", {
          detail: {
            x,
            y,
            route,
          },
        })
      );
    });
  }
});

document.addEventListener("assign_me_to_issue_or_mr", e => {
  const { route } = e.detail;
  const { userId, userName, userFullName, userAvatar } = detectGlobals();

  const issuableTypeInternal = [ROUTES.ISSUE, ROUTES.ISSUES].includes(route)
    ? "issue"
    : "merge_request";
  const issuableTypeInternalPlural = [ROUTES.ISSUE, ROUTES.ISSUES].includes(
    route
  )
    ? "issues"
    : "merge_requests";

  if (!userId) {
    window.alert("Not logged in");
    return;
  }

  let issuableId, issuableIdInternal; // eslint-disable-line one-var

  let assignees;
  let assigned = false;
  const parts = window.location.pathname.split("/");

  if (route === ROUTES.ISSUES || route === ROUTES.MRS) {
    const { x, y } = e.detail;

    const hoverEl = document.elementFromPoint(x, y);

    // Find element wrapping whole Issue/Merge request
    // ---
    let parentEl;
    // eslint-disable-next-line no-restricted-syntax
    for (const className of parentElClassNames) {
      if (hoverEl.classList.contains(className)) {
        parentEl = hoverEl;
        break;
      }

      const candidateEL = hoverEl.closest(`.${className}`);
      if (candidateEL) {
        parentEl = candidateEL;
        break;
      }
    }
    if (!parentEl) {
      window.alert("Unable to detect issue / merge request");
      return;
    }

    // Parse info
    // ---
    issuableIdInternal = Number(parentEl.dataset.id); // data-id="123456"
    issuableId = Number(
      parentEl.querySelector(".title a").getAttribute("href").split("/").last()
    ); // href="xx/yy/zz/123"

    assignees = parentEl.getElementsByClassName("author_link has-tooltip");
    // eslint-disable-next-line no-restricted-syntax
    for (const assignee of assignees) {
      if (getUsername(assignee) === userName) {
        assigned = true;
        break;
      }
    }
  } else {
    assignees = document.getElementsByClassName("user-item");
    // eslint-disable-next-line no-restricted-syntax
    for (const assignee of assignees) {
      if (getUsername(assignee.children[0]) === userName) {
        assigned = true;
        break;
      }
    }
    if (
      document.getElementsByClassName("author_link bold").length !== 0 &&
      !assigned &&
      document.getElementsByClassName("author_link bold")[0].children[1]
        .innerText === userFullName
    ) {
      assigned = true;
    }
    issuableId = parts[4];
  }

  const fn = assigned ? FUNCTIONS.SELF_UNASSIGN_MR : FUNCTIONS.SELF_ASSIGN_MR;

  optimisticUpdate(
    userName, // eslint-disable-line no-undef
    userFullName, // eslint-disable-line no-undef
    userAvatar, // eslint-disable-line no-undef
    route,
    issuableIdInternal,
    assigned,
    assignees
  );

  const newUserId = fn === FUNCTIONS.SELF_UNASSIGN_MR ? 0 : userId;
  const url = [ROUTES.ISSUE, ROUTES.ISSUES].includes(route)
    ? "%5Bassignee_ids%5D%5B%5D"
    : "%5Bassignee_id%5D";

  $.ajax({
    type: "PUT",
    headers: {
      "X-CSRF-Token": $.rails.csrfToken(),
    },
    url: `/${parts[1]}/${parts[2]}/${issuableTypeInternalPlural}/${issuableId}.json?basic=true`,
    contentType: "application/x-www-form-urlencoded",
    data: `${issuableTypeInternal}${url}=${newUserId}`,
  });
});
