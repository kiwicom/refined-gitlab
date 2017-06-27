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
import assignMe from "./libs/transformations/assignMe";

const s = document.createElement("script");
s.src = chrome.runtime.getURL("agent.js");
(document.head || document.documentElement).appendChild(s);

storage.load().then(() => {
  const route = pathnameToRoute(location.pathname);
  switch (route) {
    case ROUTES.MR:
    case ROUTES.ISSUE:
      // Enable when it will work properly
      // assignMe();
      // showUsername(route);
      expandAll();
      rotateDiscussion("notes-list");
      expandSidePanel();
      divideLabels();
      appendTo();
      break;
    case ROUTES.MRS:
    case ROUTES.ISSUES:
      filterItems("filtered-search-box");
      alignLabels(route);
      // Enable when it will work properly
      // showUsername(route);
      break;
  }
});
