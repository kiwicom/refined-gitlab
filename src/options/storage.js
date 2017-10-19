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

export const set = async (key, value, where = "sync") => {
  const data = {
    [key]: value,
  };

  return chromep.storage[where].set(data);
};

export const reset = async () => {
  await chromep.storage.local.clear();
  await chromep.storage.sync.clear();
}

export const load = async () => {
  // eslint-disable-next-line
  await migrate()

  const local = await chromep.storage.local.get(null)
  const sync = await chromep.storage.sync.get(null)

  Object.assign(
    store,
    defaults,
    local,
    sync
  );

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


async function migrateLastVisitedTimeFromSyncToLocal() {
  // eslint-disable-next-line no-unused-vars
  const local = await chromep.storage.local.get(null)
  const sync = await chromep.storage.sync.get(null)

  // console.log("local", local);
  // console.log("sync", sync);

  const toSet = {};
  Object.entries(sync).forEach(([key, val]) => {
    if (key.includes("lastVisitedTime")) {
      toSet[key] = val
    }
  })

  chromep.storage.local.set(toSet);
  chromep.storage.sync.remove(Object.keys(toSet));
  // console.log(`Migration: from sync to local storage`, toSet)
}

async function migrateDeleteAllButLastVisitedTimeFromLocal() {
  const local = await chromep.storage.local.get(null)

  const toRemove = [];
  Object.entries(local).forEach(([key, val]) => { // eslint-disable-line no-unused-vars
    if (!key.includes("lastVisitedTime")) {
      toRemove.push(key)
    }
  })

  chromep.storage.local.remove(toRemove);
  // console.log(`Migration: Removed from local storage`, toRemove)
}

async function migrate() {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "") // 20171016
  // eslint-disable-next-line dot-notation
  const lastMigration = (await chromep.storage.sync.get("_lastMigration"))["_lastMigration"];

  console.log("today", today)
  console.log("lastMigration", lastMigration)

  if (
    !lastMigration ||
    Number(lastMigration) < today
  ) {
    await migrateLastVisitedTimeFromSyncToLocal()
    await migrateDeleteAllButLastVisitedTimeFromLocal()
    await chromep.storage.sync.set({_lastMigration: today});
    console.log(`Setting _lastMigration to ${today}`)
  }
}
