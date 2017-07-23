import FUNCTIONS from "./libs/FUNCTIONS";
import pathnameToRoute from "./libs/helpers/pathnameToRoute";
import ROUTES from "./libs/ROUTES";
import getUsername from "./libs/helpers/getUsername";
import optimisticUpdate from "./libs/helpers/optimisticUpdate";
import noAssigneeButton from "./libs/helpers/noAssigneeButton";

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
  if (e.detail.fn === FUNCTIONS.SELF_ASSIGN_MR || e.detail.fn === FUNCTIONS.SELF_UNASSIGN_MR) {
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

    window.Mousetrap.bind(["1", "2", "3", "4", "5", "6", "7", "8", "9"], ev => {
      const key = ev.key;
      const number = Number(key);
      const label = mapping[number];

      if (label) {
        const parts = location.pathname.split("/");
        const group = parts[1];
        const project = parts[2];
        const issueId = parts[4];

        $.ajax({
          type: "GET",
          headers: {
            "X-CSRF-Token": $.rails.csrfToken(),
          },
          url: `/${group}/${project}/issues/${issueId}.json?basic=true`,
          success: res => {
            const labelsAlready = res.labels.map(x => x.id);
            const labelsNew = addOrRemove(labelsAlready, label);
            const labelsString = labelsNew
              .map(x => `issue%5Blabel_ids%5D%5B%5D=${x}`)
              .join("&");

            $.ajax({
              type: "PUT",
              headers: {
                "X-CSRF-Token": $.rails.csrfToken(),
              },
              url: `/${group}/${project}/issues/${issueId}.json?basic=true`,
              contentType: "application/x-www-form-urlencoded",
              data: labelsString,
              success: () => {
                window.location.reload();
              },
            });
          },
        });
      } else {
        // eslint-disable-next-line no-alert
        window.alert(
          `No shortcut label set in slot ${number}, set it in extension settings`
        );
      }
    });
  }
});

document.addEventListener("assign_me_to_issue_or_mr", e => {
  const { parts } = e.detail;
  const pathname = parts.split("/");
  let userId = window.gon.current_user_id; // eslint-disable-line no-undef
  let fn = FUNCTIONS.SELF_ASSIGN_MR;
  let issueId = 0;
  let assigned = false;
  if (userId !== undefined) {
    if (pathnameToRoute(parts) === ROUTES.ISSUES || pathnameToRoute(parts) === ROUTES.MRS) {
      const { x, y } = e.detail;
      const el = document.elementFromPoint(x, y);
      if (el.classList.contains('issue-info-container')) {
        issueId = el.children[0].children[1].children[0].innerText.slice(1, el.children[0].children[1].children[0].innerText.length - 1);
      } else if (el.classList.contains('issue-main-info')) {
        issueId = el.children[1].children[0].innerText.slice(1, el.children[1].children[0].innerText.length - 1);
      } else if (el.classList.contains('issue-title')) {
        issueId = el.parentElement.children[1].children[0].innerText.slice(1, el.parentElement.children[1].children[0].innerText.length - 1);
      } else if (el.classList.contains('issuable-info')){
        issueId = el.children[0].innerText.slice(1, el.children[0].innerText.length - 1);
      } else if (el.classList.contains('issuable-authored')){
        issueId = el.parentElement.children[0].innerText.slice(1, el.parentElement.children[0].innerText.length - 1);
      } else if (el.classList.contains('author')){
        issueId = el.parentElement.parentElement.parentElement.children[0].innerText.slice(1, el.parentElement.parentElement.parentElement.children[0].innerText.length - 1);
      } else if (el.classList.contains('issuable-meta')){
        issueId = el.parentElement.children[0].children[1].children[0].innerText.slice(1, el.parentElement.children[0].children[1].children[0].innerText.length - 1);
      } else if (el.classList.contains('controls')){
        issueId = el.parentElement.parentElement.children[0].children[1].children[0].innerText.slice(1, el.parentElement.parentElement.children[0].children[1].children[0].innerText.length - 1);
      } else if (el.classList.contains('avatar-inline')){
        issueId = el.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[0].innerText.slice(1, el.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[0].innerText.length - 1);
      } else if (el.classList.contains('issuable-comments')){
        issueId = el.parentElement.parentElement.parentElement.children[0].children[1].children[0].innerText.slice(1, el.parentElement.parentElement.parentElement.children[0].children[1].children[0].innerText.length - 1);
      } else if (el.classList.contains('issuable-updated-at')){
        issueId = el.parentElement.parentElement.children[0].children[1].children[0].innerText.slice(1, el.parentElement.parentElement.children[0].children[1].children[0].innerText.length - 1);
      } else if (el.classList.contains('labels')){
        issueId = el.parentElement.children[0].children[1].children[0].innerText.slice(1, el.parentElement.children[0].children[1].children[0].innerText.length - 1);
      } else if (el.classList.contains('labels-module')){
        issueId = el.parentElement.parentElement.children[0].children[1].children[0].innerText.slice(1, el.parentElement.parentElement.children[0].children[1].children[0].innerText.length - 1);
      }
      const assignees = document.getElementsByClassName('author_link has-tooltip');
      for (let i = 0; i < assignees.length; i++) {
        if (getUsername(assignees[i]) === window.gon.current_username) {
          assigned = true;
          assignees[i].parentElement.remove();
          break;
        }
      }
    } else {
      const assignees = document.getElementsByClassName("user-item");
      for (let i = 0; i < assignees.length; i++) {
        if (getUsername(assignees[i].children[0]) === window.gon.current_username) {
          assigned = true;
          break;
        }
      }
      if (document.getElementsByClassName('author_link bold').length !== 0 && !assigned &&
      document.getElementsByClassName('author_link bold')[0].children[1].innerText === window.gon.current_user_fullname) { // eslint-disable-line no-undef
        assigned = true;
      }
      if (assigned) {
        noAssigneeButton();
      }
      issueId = pathname[4];
    }
    if (assigned) {
      fn = FUNCTIONS.SELF_UNASSIGN_MR;
    }
    if (!assigned) {
      optimisticUpdate(
        window.gon.current_username, // eslint-disable-line no-undef
        window.gon.current_user_fullname, // eslint-disable-line no-undef
        window.gon.current_user_avatar_url, // eslint-disable-line no-undef
        parts,
      )
    }
    document.dispatchEvent(new CustomEvent("refined-gitlab", {
      detail: {
        fn,
        issueId,
        userId,
        group: pathname[1],
        project: pathname[2],
      }
    }));
  }
});
