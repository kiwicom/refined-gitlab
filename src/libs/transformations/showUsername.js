/* eslint-disable no-continue,default-case */

import ROUTES from "../ROUTES";
import getUsername from "../helpers/getUsername";

export default route => {
  switch (route) {
    case ROUTES.MR:
    case ROUTES.ISSUE: {
      const commitsTab = document.getElementsByClassName("commits-tab")[0];
      commitsTab.children[0].click();
      const notesTab = document.getElementsByClassName("notes-tab")[0];
      notesTab.children[0].click();
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < 7; j++) {
        const className = [
          "author has-tooltip",
          "author_link bold",
          "author_link has-tooltip",
          "note-header-author-name",
          "author_link",
          "inline discussion-headline-light",
          "commit-author-link has-tooltip",
          "avatar has-tooltip s36 hidden-xs",
        ];
        let a = document.getElementsByClassName(className[j]);
        if (j === 6 || j === 7) a = [].slice.call(a);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < a.length; i++) {
          let username;
          if (j === 2 || j === 4 || j === 6) username = getUsername(a[i]);
          switch (j) {
            case 0:
              // Author
              a[i].innerText = a[i].getAttribute("title").slice(1);
              continue;
            case 1:
              // Assignees
              a[i].children[1].innerText = a[i].children[2].innerText.slice(1);
              continue;
            case 2:
              // Participants
              a[i].setAttribute("title", username);
              continue;
            case 3:
              // Discussion
              a[i].innerText = getUsername(a[i].parentElement);
              a[i].parentElement.children[1].remove();
              continue;
            case 4:
              a[i].children[0].innerText = username;
              continue;
            case 5:
              a[i].innerText = a[i].innerText.replace(
                `@${getUsername(a[i].parentElement.children[1])}`,
                ""
              );
              continue;
            case 6:
              a[i].innerText = username;
              continue;
            case 7: {
              const userName = getUsername(a[i].parentElement);
              a[i].setAttribute("alt", `${userName}'s avatar`);
              a[i].setAttribute("title", `${userName}`);
            }
          }
        }
      }
      break;
    }
    case ROUTES.MRS:
    case ROUTES.ISSUES: {
      let a = document.getElementsByClassName("author_link");
      a = [].slice.call(a);
      // eslint-disable-next-line array-callback-return
      a.map(element => {
        const username = getUsername(element);
        // eslint-disable-next-line no-unused-expressions
        element.classList.contains("has-tooltip")
          ? element.setAttribute("title", `Assigned to ${username}`)
          : (element.children[0].innerText = username); // eslint-disable-line no-param-reassign
      });
      break;
    }
  }
};
