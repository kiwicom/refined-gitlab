import components from "./components";
import * as storage from "./storage";
import options from "./options";

const formEl = document.querySelector("#options");

storage.load().then(() => {
  Object.entries(options).forEach(([key, val]) => {
    formEl.innerHTML += components({
      name: key,
      type: val.type,
      label: val.label,
      defaultValue: val.defaultValue,
      value: storage.get(key),
    });
  });

  formEl.innerHTML += "<hr />";

  Object.entries(storage.getAll()).forEach(([key, val]) => {
    if (
      !options[key] && // already added
      !key.startsWith("_") && // notation for "private" options, usually cache
      !key.includes("lastVisitedTime") // deprecated, but do not remove yet
    ) {
      formEl.innerHTML += components({
        name: key,
        type: "text",
        label: key,
        value: val,
      });
    }
  });
});

formEl.addEventListener("change", ({ target }) => {
  const tag = target.tagName.toLowerCase();

  if (tag === "input" && target.type === "checkbox") {
    storage.set(target.name, target.checked);
  } else {
    storage.set(target.name, target.value);
  }
});
