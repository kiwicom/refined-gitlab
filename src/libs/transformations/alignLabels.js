import ROUTES from "../ROUTES";
import * as storage from "./../../options/storage";

export default route => {
  let itemsClassName;
  switch (route) {
    case ROUTES.MRS:
      itemsClassName = "merge-request";
      break;
    case ROUTES.ISSUES:
      itemsClassName = "issue-box";
      break;
    default:
      throw new Error("Unexpected");
  }

  const itemsCollection = document.getElementsByClassName(itemsClassName);
  const itemsArray = [].slice.call(itemsCollection);
  itemsArray.forEach(mrEl => {
    // prepare labelsEl to hold all labels
    const labelsEl = document.createElement("div");
    labelsEl.classList.add("labels");

    const moduleEls = {};
    storage
      .get("labelCategories")
      .split(",")
      .concat(["no-module"])
      .forEach(module => {
        const el = document.createElement("div");
        el.classList.add("labels-module");
        el.setAttribute("data-module", module);
        labelsEl.appendChild(el);
        moduleEls[module] = el;
      });

    const labelsCollection = mrEl.getElementsByClassName("label-link");
    const labelsArray = [].slice.call(labelsCollection);
    labelsArray.forEach(label => {
      const text = label.textContent;
      const textParts = text.split("/");
      const module = textParts[0];

      const moduleEl = moduleEls[module] || moduleEls["no-module"];
      moduleEl.appendChild(label);
    });

    // insert
    mrEl
      .getElementsByClassName("issue-info-container")[0]
      .appendChild(labelsEl);
  });
};
