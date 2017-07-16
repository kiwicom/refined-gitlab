import * as storage from "./../../options/storage";

export default () => {
  const labelsEl = document.getElementsByClassName("issuable-show-labels")[0];
  if (labelsEl !== undefined) {
    const labelsCollection = labelsEl.getElementsByTagName("a");
    const labelsArray = [].slice.call(labelsCollection);

    const moduleEls = {};
    storage
      .get("labelCategories")
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
      const textParts = text.split("/");
      const module = textParts[0];
      const moduleEl = moduleEls[module] || moduleEls["no-module"];
      moduleEl.appendChild(labelEl);
    });
  }
};
