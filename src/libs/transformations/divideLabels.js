import { LABEL_CATEGORY_SEPARATOR } from "../consts";

// eslint-disable-next-line no-unused-vars
export const agent = (STORAGE, route, projectHash) => {
  const labelCategories = STORAGE[`labelCategories:${projectHash}`];

  const labelsEl = document.getElementsByClassName("issuable-show-labels")[0];
  if (labelsEl !== undefined) {
    const labelsCollection = labelsEl.getElementsByTagName("a");
    const labelsArray = [].slice.call(labelsCollection);

    const moduleEls = {};
    labelCategories
      .split(",")
      .concat(["no-module"])
      .forEach(module => {
        const el = document.createElement("div");
        el.classList.add("labels-module");
        el.setAttribute("data-module", module);
        labelsEl.appendChild(el);
        moduleEls[module] = el;
      });

    labelsArray.forEach(labelEl => {
      const text = labelEl.textContent;
      const textParts = text.split(LABEL_CATEGORY_SEPARATOR);
      const module = textParts[0];
      const moduleEl = moduleEls[module] || moduleEls["no-module"];
      moduleEl.appendChild(labelEl);
    });
  }
};
