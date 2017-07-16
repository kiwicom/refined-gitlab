import injectContentScripts from "webext-dynamic-content-scripts";
import * as storage from "./options/storage";
import insight from "./insight";

injectContentScripts();

storage.load().then(() => {
  insight("UA-102570755-1", storage.get("clientId"), storage.get("doTrack"));
});
