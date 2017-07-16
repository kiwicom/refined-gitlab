import ROUTES from "../ROUTES";

export default input => {
  // /kiwi/frontend/merge_requests/1800
  const parts = input.split("/");
  const group = parts[1]; // eslint-disable-line no-unused-vars
  const project = parts[2]; // eslint-disable-line no-unused-vars
  const module = parts[3];
  const id = parts[4];

  switch (module) {
    case "issues":
      return id ? ROUTES.ISSUE : ROUTES.ISSUES;
    case "merge_requests":
      return id ? ROUTES.MR : ROUTES.MRS;
    default:
      return "unknown";
  }
};
