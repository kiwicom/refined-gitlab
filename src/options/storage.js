import uuid from "uuid";
import ChromePromise from "chrome-promise";
import options from "./options";

const chromep = new ChromePromise();
const store = {};
const defaults = {};

Object.entries(options).forEach(([key, val]) => {
  defaults[key] = val.defaultValue;
});

export const get = key => store[key];

export const getAll = () => store;

export const set = async (key, value) => {
  const data = {
    [key]: value,
  };

  try {
    return await chromep.storage.sync.set(data);
  } catch (err) {
    return chromep.storage.local.set(data);
  }
};

export const load = async () => {
  let data;

  try {
    data = await chromep.storage.sync.get(null);
  } catch (err) {
    data = await chromep.storage.local.get(null);
  }

  Object.assign(store, defaults, data);

  if (!store.clientId) {
    store.clientId = uuid.v4();
    set("clientId", store.clientId);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(store)) {
    if (Object.keys(defaults).includes(key)) {
      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage({
        type: "track",
        payload: {
          category: "options",
          action: key,
          label: value.toString(),
        },
      });
    }
  }
};
