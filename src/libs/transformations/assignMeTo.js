import pathnameToRoute from "../helpers/pathnameToRoute";
import ROUTES from "../ROUTES";

export default () => {
  const route = pathnameToRoute(location.pathname);
  let x, y; // eslint-disable-line one-var
  if (route === ROUTES.ISSUES || route === ROUTES.MRS) {
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
            route,
          },
        })
      );
    }
  };
};
