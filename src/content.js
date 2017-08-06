/* eslint-disable no-unused-vars */

import ROUTES from "./libs/ROUTES";
import * as storage from "./options/storage";

import pathnameToRoute from "./libs/helpers/pathnameToRoute";

import expandAll from "./libs/transformations/expandAll";
import rotateDiscussion from "./libs/transformations/rotateDiscussion";
import expandSidePanel from "./libs/transformations/expandSidePanel";
import filterItems from "./libs/transformations/filterItems";
import appendTo from "./libs/transformations/appendTo";
import bindLabelsKeyboardShortcuts
  from "./libs/transformations/bindLabelsKeyboardShortcuts";
import assignMeTo from "./libs/transformations/assignMeTo";
import discussionOverComment
  from "./libs/transformations/discussionOverComment";

const s = document.createElement("script");
s.src = chrome.runtime.getURL("agent.js"); // eslint-disable-line no-undef
(document.head || document.documentElement).appendChild(s);

storage.load().then(() => {
  setTimeout(() => {
    document.dispatchEvent(
      new CustomEvent("refined-gitlab", {
        detail: {
          fn: "ready",
          storage: storage.getAll(),
        },
      })
    );
  }, 500);

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
      appendTo();
      bindLabelsKeyboardShortcuts();
      discussionOverComment();
      break;
    case ROUTES.MRS:
    case ROUTES.ISSUES:
      filterItems("filtered-search-box");
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

document.addEventListener("refined-gitlab", e => {
  if (e.detail.fn === "storageSet") {
    const { key, val } = e.detail;
    storage.set(key, val);
  }
});
