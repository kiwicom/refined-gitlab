import 'webext-dynamic-content-scripts';
import addDomainPermissionToggle from 'webext-domain-permission-toggle';
import * as storage from "./options/storage";
import insight from "./insight";

addDomainPermissionToggle();

storage.load().then(() => {
  insight("UA-102570755-1", storage.get("clientId"), storage.get("doTrack"));
});
