import * as storage from "./../../options/storage";
import FUNCTIONS from "../FUNCTIONS";

export default () => {
  const mapping = {};
  ["1", "2", "3", "4", "5", "6", "7", "8", "9"].forEach(x => {
    mapping[x] = Number(storage.get(`labelShortcut${x}`));
  });

  setTimeout(() => {
    document.dispatchEvent(
      new CustomEvent("refined-gitlab", {
        detail: {
          fn: FUNCTIONS.bindLabelsKeyboardShortcuts,
          mapping,
        },
      })
    );
  }, 500);
};
