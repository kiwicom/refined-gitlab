// const utils = require("./utils")

// TODO: Move to utils and add build step
function rotateDiscussion(id) {
    const elem = document.getElementById(id);
    elem.style.display = "flex";
    elem.style.flexDirection = "column-reverse";
}

// TODO: Move to utils and add build step
function expandSidePanel(remove, add, aside, toggle, pageGutter) {
  const sidebar = document.getElementsByTagName(aside)[0];
  sidebar.classList.remove(remove);
  sidebar.classList.add(add);
  const button = document.getElementsByClassName(toggle)[1];
  button.style.display = "none";
  const page = document.getElementsByClassName(pageGutter)[0];
  page.classList.remove(remove);
  page.classList.add(add);
}

const ROUTES = {
  ISSUE: "ISSUE",
  ISSUES: "ISSUES",
  MR: "MR",
  MRS: "MRS"
};

// List of module categories
// TODO: Refactor to settings
const MODULES = [
  "module",
  "type",
  "prio",
  "process",
  "qa",
  "design",
  "testing",
  "waiting",
  "weight",
  "no-module"
];

// TODO: Move to utils and add build step
function alignLabels(route) {

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
    MODULES.forEach(module => {
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
    mrEl.getElementsByClassName("issue-info-container")[0].appendChild(labelsEl);
  });
}

// TODO: Move to utils and add build step
function divideLabels() {
  var labelsEl = document.getElementsByClassName('issuable-show-labels')[0];
  var labelsCollection = labelsEl.getElementsByTagName('a');
  var labelsArray = [].slice.call(labelsCollection);

  var moduleEls = {};
  MODULES.forEach(module => {
    var el = document.createElement("div");
    el.classList.add("labels-module");
    el.setAttribute("data-module", module);
    labelsEl.appendChild(el);
    moduleEls[module] = el;
  });

  labelsArray.forEach(labelEl => {
    var text = labelEl.textContent;
    var textParts = text.split("/");
    var module = textParts[0];
    moduleEls[module].appendChild(labelEl)
  })
}


const pathnameToRoute = input => {
  // /kiwi/frontend/merge_requests/1800
  const parts = input.split("/");
  const group = parts[1];
  const project = parts[2];
  const module = parts[3];
  const id = parts[4];

  switch (module) {
    case "issues":
      return id ? ROUTES.ISSUE : ROUTES.ISSUES;
    case "merge_requests":
      return id ? ROUTES.MR : ROUTES.MRS;
  }
};

function main() {
  const route = pathnameToRoute(location.pathname);
  switch (route) {
    case ROUTES.MR:
    case ROUTES.ISSUE:
      rotateDiscussion("notes-list");
      expandSidePanel("right-sidebar-collapsed", "right-sidebar-expanded", "ASIDE", "gutter-toggle", "page-gutter");
      divideLabels();
    case ROUTES.MRS:
    case ROUTES.ISSUES:
      alignLabels(route);
  }
}

main();

// Exports for tests
if (typeof module !== "undefined") {
  module.exports = {
    ROUTES,
    pathnameToRoute
  };
}
