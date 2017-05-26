// const utils = require("./utils")

// TODO: Move to utils and add build step
function rotateDiscussion(id) {
  var elem = document.getElementById(id), value = elem.value;
  var children = elem.children;
  if (parseFloat(value) != NaN) {
    elem.style.transform = "rotate(180deg)";
    for (var i = 0; i < children.length; i++) {
      children[i].style.transform = "rotate(-180deg)";
    }
  }
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
  }
}

main();

// Exports for tests
module.exports = {
  ROUTES,
  pathnameToRoute
};
