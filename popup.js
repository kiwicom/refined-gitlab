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
  }
}

main();

// Exports for tests
module.exports = {
  ROUTES,
  pathnameToRoute
};
