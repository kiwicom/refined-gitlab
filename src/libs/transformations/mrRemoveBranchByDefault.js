export default () => {
  try {
    const element = document.querySelector("#remove-source-branch-input");
    if (!element.checked) {
      // Gitlab has click click event listener bound to input
      element.click();
    }
  } catch (e) {
    // ignore
  }
};
