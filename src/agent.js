import FUNCTIONS from "./libs/FUNCTIONS";
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
  if (e.detail.fn === FUNCTIONS.SELF_ASSIGN_MR) {
    const { group, project, issueId, userId } = e.detail;
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
});
