import injectContentScripts from "webext-dynamic-content-scripts";
import DPT from "webext-domain-permission-toggle";
import * as storage from "./options/storage";
import insight from "./insight";

DPT.addContextMenu();
injectContentScripts();

storage.load().then(() => {
  insight("UA-102570755-1", storage.get("clientId"), storage.get("doTrack"));
});
