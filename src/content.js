import ROUTES from "./libs/ROUTES";
import * as storage from "./options/storage";

import pathnameToRoute from "./libs/helpers/pathnameToRoute";

import expandAll from "./libs/transformations/expandAll";
import rotateDiscussion from "./libs/transformations/rotateDiscussion";
import expandSidePanel from "./libs/transformations/expandSidePanel";
import divideLabels from "./libs/transformations/divideLabels";
import filterItems from "./libs/transformations/filterItems";
import alignLabels from "./libs/transformations/alignLabels";
import appendTo from "./libs/transformations/appendTo";
import showUsername from "./libs/transformations/showUsername";

storage.load().then(() => {
  const route = pathnameToRoute(location.pathname);
  switch (route) {
    case ROUTES.MR:
    case ROUTES.ISSUE:
      expandAll();
      rotateDiscussion("notes-list");
      expandSidePanel();
      divideLabels();
      appendTo();
      showUsername(route);
      break;
    case ROUTES.MRS:
    case ROUTES.ISSUES:
      filterItems("filtered-search-box");
      alignLabels(route);
  }
});
