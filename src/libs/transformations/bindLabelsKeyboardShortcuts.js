import ROUTES from "../ROUTES";
import addOrRemove from "../helpers/addOrRemove";

// eslint-disable-next-line no-unused-vars
export const agent = (STORAGE, route, projectHash) => {
  window.Mousetrap.bind(
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ev => {
      const key = ev.key;

      const number = Number(key);
      const label = STORAGE[`labelShortcut${number}`];

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
  )
};
