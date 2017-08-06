import FUNCTIONS from "./../FUNCTIONS";
import * as storage from "./../../options/storage";

export default () => {
  setTimeout(() => {
    document.dispatchEvent(
      new CustomEvent("refined-gitlab", {
        detail: {
          fn: FUNCTIONS.bindAssignKeyboardShortcuts,
          shortcut: storage.get(`assignShortcut`),
        },
      })
    );
  }, 500);
};
