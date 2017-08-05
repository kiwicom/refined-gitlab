import FUNCTIONS from "./libs/FUNCTIONS";
import getUsername from "./libs/helpers/getUsername";
import optimisticUpdate from "./libs/helpers/optimisticUpdate";
import ROUTES from "./libs/ROUTES";
import pathnameToRoute from "./libs/helpers/pathnameToRoute";

function addOrRemove(array, value) {
  const index = array.indexOf(value);
  if (index === -1) {
    array.push(value);
  } else {
    array.splice(index, 1);
  }
  return array;
}

document.addEventListener("refined-gitlab", e => {
  if (
    e.detail.fn === FUNCTIONS.SELF_ASSIGN_MR ||
    e.detail.fn === FUNCTIONS.SELF_UNASSIGN_MR
  ) {
    const { issueId, group, project } = e.detail;
    let { userId } = e.detail;
    if (e.detail.fn === FUNCTIONS.SELF_UNASSIGN_MR) {
      userId = 0;
    }
    $.ajax({
      type: "PUT",
      headers: {
        "X-CSRF-Token": $.rails.csrfToken(),
      },
      url: `/${group}/${project}/issues/${issueId}.json?basic=true`,
      contentType: "application/x-www-form-urlencoded",
      data: `issue%5Bassignee_ids%5D%5B%5D=${userId}`,
    });
  }

  if (e.detail.fn === FUNCTIONS.bindLabelsKeyboardShortcuts) {
    const { mapping } = e.detail;

    window.Mousetrap.bind(
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ev => {
        const key = ev.key;

        const number = Number(key);
        const label = mapping[number];
        const route = pathnameToRoute(window.location.pathname);

        if (label) {
          const parts = location.pathname.split("/");
          const group = parts[1];
          const project = parts[2];
          const issueId = parts[4];

          const prefix = route === ROUTES.ISSUE ? "issue" : "merge_request";

          const labelsAlready = new Set(
            [].slice
              .call(
                document.querySelectorAll(
                  `input[name='${prefix}[label_names][]']`
                )
              )
              .map(x => Number(x.value))
          );

          const labelsNew = addOrRemove(Array.from(labelsAlready), label);

          const labelsString = Array.from(labelsNew)
            .map(x => `${prefix}%5Blabel_ids%5D%5B%5D=${x}`)
            .join("&");

          $.ajax({
            type: "PUT",
            headers: {
              "X-CSRF-Token": $.rails.csrfToken(),
            },
            url: `/${group}/${project}/${route === ROUTES.ISSUE ? "issues" : "merge_requests"}/${issueId}.json`,
            contentType: "application/x-www-form-urlencoded",
            data: labelsString,
            success: () => {
              window.location.reload();
            },
          });
        } else {
          // eslint-disable-next-line no-alert
          window.alert(
            `No shortcut label set in slot ${number}, set it in extension settings`
          );
        }
      }
    );
  }

  if (e.detail.fn === FUNCTIONS.bindAssignKeyboardShortcuts) {
    const { shortcut } = e.detail;
    const route = pathnameToRoute(window.location.pathname);
    let x, y; // eslint-disable-line one-var
    if (route === ROUTES.ISSUES || route === ROUTES.MRS) {
      document.onmousemove = _e => {
        x = _e.pageX;
        y = _e.pageY;
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
  const userId = window.gon.current_user_id; // eslint-disable-line no-undef
  if (userId !== undefined) {
    let issueId, internalIssueId, assignees; // eslint-disable-line one-var
    let assigned = false;
    const parts = window.location.pathname.split("/");
    const currentUsername = window.gon.current_username; // eslint-disable-line no-undef
    const currentUserFullName = window.gon.current_user_fullname; // eslint-disable-line no-undef

    if (route === ROUTES.ISSUES || route === ROUTES.MRS) {
      const { x, y } = e.detail;

      const el = document.elementFromPoint(x, y);
      const issue = el.closest("div.issue-info-container"); // eslint-disable-line no-undef
      const issueIdFull = issue.children[0].children[1].children[0].innerText;
      internalIssueId = issue.closest("li").id; // eslint-disable-line no-undef
      issueId = issueIdFull.slice(1, issueIdFull.length - 1);

      assignees = issue.getElementsByClassName("author_link has-tooltip");
      // eslint-disable-next-line no-restricted-syntax
      for (const assignee of assignees) {
        if (getUsername(assignee) === currentUsername) {
          assigned = true;
          break;
        }
      }
    } else {
      assignees = document.getElementsByClassName("user-item");
      // eslint-disable-next-line no-restricted-syntax
      for (const assignee of assignees) {
        if (getUsername(assignee.children[0]) === currentUsername) {
          assigned = true;
          break;
        }
      }
      if (
        document.getElementsByClassName("author_link bold").length !== 0 &&
        !assigned &&
        document.getElementsByClassName("author_link bold")[0].children[1]
          .innerText === currentUserFullName
      ) {
        assigned = true;
      }
      issueId = parts[4];
    }
    const fn = assigned ? FUNCTIONS.SELF_UNASSIGN_MR : FUNCTIONS.SELF_ASSIGN_MR;
    optimisticUpdate(
      window.gon.current_username, // eslint-disable-line no-undef
      window.gon.current_user_fullname, // eslint-disable-line no-undef
      window.gon.current_user_avatar_url, // eslint-disable-line no-undef
      route,
      internalIssueId,
      assigned,
      assignees
    );
    document.dispatchEvent(
      new CustomEvent("refined-gitlab", {
        detail: {
          fn,
          issueId,
          userId,
          group: parts[1],
          project: parts[2],
        },
      })
    );
  }
});
