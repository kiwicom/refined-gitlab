export default () => {
  const a = location.pathname.split("/");
  if (a[5] === "diffs" && a[3] === "merge_requests") {
    const url = "?expand_all_diffs=1";
    if (!window.location.href.includes(url)) window.location.href += url;
  }
};
