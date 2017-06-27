import ROUTES from "../ROUTES";
import * as storage from "./../../options/storage";

export default route => {
  var itemsClassName;
  switch (route) {
    case ROUTES.MRS:
      itemsClassName = "merge-request";
      break;
    case ROUTES.ISSUES:
      itemsClassName = "issue-box";
      break;
  }

  var itemsCollection = document.getElementsByClassName(itemsClassName);
  var itemsArray = [].slice.call(itemsCollection);
  itemsArray.forEach(mrEl => {
    // prepare labelsEl to hold all labels
    var labelsEl = document.createElement("div");
    labelsEl.classList.add("labels");

    var moduleEls = {};
    storage
      .get("labelCategories")
      .split(",")
      .concat(["no-module"])
      .forEach(module => {
        var el = document.createElement("div");
        el.classList.add("labels-module");
        el.setAttribute("data-module", module);
        labelsEl.appendChild(el);
        moduleEls[module] = el;
      });

    var labelsCollection = mrEl.getElementsByClassName("label-link");
    var labelsArray = [].slice.call(labelsCollection);
    labelsArray.forEach(label => {
      var text = label.textContent;
      var textParts = text.split("/");
      var module = textParts[0];

      var moduleEl = moduleEls[module] || moduleEls["no-module"];
      moduleEl.appendChild(label);
    });

    // insert
    mrEl
      .getElementsByClassName("issue-info-container")[0]
      .appendChild(labelsEl);
  });
};
