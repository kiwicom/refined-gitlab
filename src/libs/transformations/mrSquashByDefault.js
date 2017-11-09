// eslint-disable-next-line no-unused-vars
export const agent = (STORAGE, route, projectHash) => {
  try {
    const element = document.querySelector(
      ".merge-param-checkbox [name='squash']"
    );
    element.checked = true;
  } catch (e) {
    // ignore
  }
};
