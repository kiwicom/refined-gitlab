/* eslint-disable no-unused-vars */

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
import bindLabelsKeyboardShortcuts
  from "./libs/transformations/bindLabelsKeyboardShortcuts";
import assignMeTo from "./libs/transformations/assignMeTo";

const s = document.createElement("script");
s.src = chrome.runtime.getURL("agent.js"); // eslint-disable-line no-undef
(document.head || document.documentElement).appendChild(s);

storage.load().then(() => {
  const route = pathnameToRoute(location.pathname);
  switch (route) { // eslint-disable-line default-case
    case ROUTES.MR:
    case ROUTES.ISSUE:
      // Enable when it will work properly
      // showUsername(route);

      assignMeTo();
      expandAll();
      rotateDiscussion("notes-list");
      expandSidePanel();
      divideLabels();
      appendTo();
      bindLabelsKeyboardShortcuts();
      break;
    case ROUTES.MRS:
    case ROUTES.ISSUES:
      filterItems("filtered-search-box");
      alignLabels(route);
      assignMeTo();
      // Enable when it will work properly
      // showUsername(route);
      break;
  }

  if (storage.get("disableLabelColors")) {
    document.body.classList.add("refined-gitlab--disableLabelColors");
  }

  if (storage.get("hideRepoAvatars")) {
    document.body.classList.add("refined-gitlab--hideRepoAvatars");
  }
});
