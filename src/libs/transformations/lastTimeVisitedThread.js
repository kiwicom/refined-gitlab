import * as storage from "./../../options/storage";

export default () => {
  if (storage.get(`${window.location.pathname}/lastVisitedTime`)) {
    const time = storage.get(`${window.location.pathname}/lastVisitedTime`);
    const date = new Date(time);
    const notes = document.getElementsByClassName(
      "notes main-notes-list timeline"
    )[0];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < notes.children.length; i++) {
      const noteTime = notes.children[i].querySelector("time");
      const noteDate = new Date(noteTime.getAttribute("datetime"));
      if (noteDate > date || i === notes.children.length - 1) {
        const el = document.createElement("div");
        el.setAttribute(
          "style",
          "height:20px; background-color: orange; text-align: center; color: white;"
        );
        el.innerText = noteDate > date
          ? "Last Time You Saw This Conversation"
          : "You've Read Everything In This Conversation";
        if (noteDate > date) {
          notes.children[i].parentElement.insertBefore(el, notes.children[i]);
        } else {
          notes.children[i].parentElement.appendChild(el);
        }
        break;
      }
    }
  }
  storage.set(`${window.location.pathname}/lastVisitedTime`, Date.now());
};
