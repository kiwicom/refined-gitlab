import detectUsername from "../helpers/detectUsername";

// eslint-disable-next-line no-unused-vars
export const agent = (STORAGE, route, projectHash) => {
  const box = "filtered-search-box"
  document.body.onkeydown = e => {
    if (
      !document.getElementsByClassName(box)[0].classList.contains("focus") &&
      document.getElementsByClassName("current-user")[0] !== undefined
    ) {
      if (e.keyCode === 81) {
        const username = detectUsername();
        let opened = "";
        const url = `&author_username=${username}&assignee_username=${username}`;
        if (window.location.href.includes(url)) {
          window.location.href = window.location.href.replace(url, "");
        } else {
          if (
            window.location.href.endsWith("merge_requests") ||
            window.location.href.endsWith("issues")
          ) {
            opened += "?scope=all&state=opened";
          }
          window.location.href += opened + url;
        }
      }
    }
  };
};
