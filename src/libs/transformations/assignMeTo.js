import ROUTES from "../ROUTES";
import getUsername from "../helpers/getUsername";
import detectGlobals from "../helpers/detectGlobals";
import optimisticUpdate from "../helpers/optimisticUpdate";

const parentElClassNames = ["merge-request", "issue"];

// eslint-disable-next-line no-unused-vars
export const agent = (STORAGE, route, projectHash) => {
  const shortcut = STORAGE.assignShortcut;

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

  // eslint-disable-next-line no-unused-vars
  document.addEventListener("assign_me_to_issue_or_mr", e => {
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

    const fn = assigned ? "SELF_UNASSIGN_MR" : "SELF_ASSIGN_MR";

    optimisticUpdate(
      userName, // eslint-disable-line no-undef
      userFullName, // eslint-disable-line no-undef
      userAvatar, // eslint-disable-line no-undef
      route,
      issuableIdInternal,
      assigned,
      assignees
    );

    const newUserId = fn === "SELF_UNASSIGN_MR" ? 0 : userId;
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
  })
};
