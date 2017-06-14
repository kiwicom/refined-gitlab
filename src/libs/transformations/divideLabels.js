import * as storage from "./../../options/storage"

export default () => {
	var labelsEl = document.getElementsByClassName("issuable-show-labels")[0];
	var labelsCollection = labelsEl.getElementsByTagName("a");
	var labelsArray = [].slice.call(labelsCollection);

	var moduleEls = {};
	storage.get("labelCategories").split(",").forEach(module => {
		var el = document.createElement("div");
		el.classList.add("labels-module");
		el.setAttribute("data-module", module);
		labelsEl.appendChild(el);
		moduleEls[module] = el;
	});

	labelsArray.forEach(labelEl => {
		var text = labelEl.textContent;
		var textParts = text.split("/");
		var module = textParts[0];
		moduleEls[module].appendChild(labelEl);
	});
}
