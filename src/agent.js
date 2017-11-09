import ROUTES from "./libs/ROUTES";
import pathnameToRoute from "./libs/helpers/pathnameToRoute";

import isProjectPage from "./libs/helpers/isProjectPage";
import detectProjectSlug from "./libs/helpers/detectProjectSlug";
import detectProjectLabelCategories from "./libs/helpers/detectProjectLabelCategories";

import * as divideLabels from "./libs/transformations/divideLabels";
import * as alignLabels from "./libs/transformations/alignLabels";
import * as enhanceLabels from "./libs/transformations/enhanceLabels";
import * as discussionOverComment from "./libs/transformations/discussionOverComment";
import * as bindLabelsKeyboardShortcuts from "./libs/transformations/bindLabelsKeyboardShortcuts";
import * as appendTo from "./libs/transformations/appendTo";
import * as expandAll from "./libs/transformations/expandAll";
import * as rotateDiscussion from "./libs/transformations/rotateDiscussion";
import * as mrSquashByDefault from "./libs/transformations/mrSquashByDefault";
import * as lastTimeVisitedThread from "./libs/transformations/lastTimeVisitedThread";
import * as assignMeTo from "./libs/transformations/assignMeTo";
import * as expandSidePanel from "./libs/transformations/expandSidePanel";
import * as mrRemoveBranchByDefault from "./libs/transformations/mrRemoveBranchByDefault";
import * as filterItems from "./libs/transformations/filterItems";


let STORAGE;

document.addEventListener("refined-gitlab", e => {
  const route = pathnameToRoute(window.location.pathname);

  if (e.detail.fn === "ready") {
    STORAGE = e.detail.storage;

    let labelCategories;
    if (isProjectPage(document)) {
      const projectHash = detectProjectSlug();
      labelCategories = STORAGE[`labelCategories:${projectHash}`];
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

      const RUN = [];
      switch (route) { // eslint-disable-line default-case
        case ROUTES.MR:
        case ROUTES.ISSUE:
          RUN.push(
            appendTo,
            divideLabels,
            enhanceLabels,
            discussionOverComment,
            bindLabelsKeyboardShortcuts,
            assignMeTo,
            expandAll,
            rotateDiscussion,
            expandSidePanel,
            lastTimeVisitedThread,
          )
          if (STORAGE.mrSquashByDefault) {
            RUN.push(mrSquashByDefault)
          }
          if (STORAGE.mrRemoveBranchByDefault) {
            RUN.push(mrRemoveBranchByDefault)
          }
          break;

        case ROUTES.MRS:
        case ROUTES.ISSUES:
          RUN.push(
            alignLabels,
            filterItems,
            assignMeTo,
          )
          break;
      }

      RUN.forEach(x => {
        x.agent(STORAGE, route, projectHash);
      })
    }

  }
});


