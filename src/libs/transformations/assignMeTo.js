import pathnameToRoute from "../helpers/pathnameToRoute";
import ROUTES from "../ROUTES";

export default () => {
  const parts = location.pathname;
  let x, y; // eslint-disable-line one-var
  if (
    pathnameToRoute(parts) === ROUTES.ISSUES ||
    pathnameToRoute(parts) === ROUTES.MRS
  ) {
    document.onmousemove = e => {
      x = e.pageX;
      y = e.pageY;
    };
  }
  document.body.onkeydown = function(e) {
    if (e.keyCode === 32 || (e.keyCode === 65 && e.altKey)) {
      document.dispatchEvent(
        new CustomEvent("assign_me_to_issue_or_mr", {
          detail: {
            x,
            y,
            parts,
          },
        })
      );
    }
  };
};
