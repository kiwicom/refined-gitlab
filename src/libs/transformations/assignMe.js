import FUNCTIONS from "../FUNCTIONS";

export default () => {
  const parts = location.pathname.split("/");
  const userId = document
    .getElementsByClassName("header-user-avatar")[0]
    .src.split("/")[7];

  if (userId !== undefined) {
    // TODO: Do on keystoke, not page load
    setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent("refined-gitlab", {
          detail: {
            fn: FUNCTIONS.SELF_ASSIGN_MR,
            id: parts[4],
            userId: userId,
            group: parts[1],
            project: parts[2],
          },
        })
      );
    }, 1000);
  }
};
