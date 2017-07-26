import FUNCTIONS from "./libs/FUNCTIONS";

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
