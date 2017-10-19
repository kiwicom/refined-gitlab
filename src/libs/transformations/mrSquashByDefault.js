export default () => {
  try {
    const element = document.querySelector(
      ".merge-param-checkbox [name='squash']"
    );
    element.checked = true;
  } catch (e) {
    // ignore
  }
};
