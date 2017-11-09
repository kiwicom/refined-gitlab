// eslint-disable-next-line no-unused-vars
export const agent = (STORAGE, route, projectHash) => {
  const a = location.pathname.split("/");
  if (a[5] === "diffs" && a[3] === "merge_requests") {
    const postfix = "expand_all_diffs=1";
    const separator = window.location.href.includes("?") ? "&" : "?";
    if (!window.location.href.includes(postfix)) window.location.href += `${separator}${postfix}`;
  }
};
