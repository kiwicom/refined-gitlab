/* eslint-disable no-unused-vars */
import "./content.scss"
import * as storage from "./options/storage";

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
