/* eslint-disable no-use-before-define */
import * as storage from "./../../options/storage";

export default () => {
  if (storage.get(`${window.location.pathname}/lastVisitedTime`)) {
    const time = storage.get(`${window.location.pathname}/lastVisitedTime`);
    const date = new Date(time);
    const notes = document.querySelector(
      ".notes.main-notes-list.timeline"
    );

    // Notes are loaded asynchronously
    const timer = setInterval(() => {
      const el = notes.querySelector("time");
      if (el) {
        clearInterval(timer)
        adjustDom(notes, date)
      }
    }, 1000);
  }
  storage.set(`${window.location.pathname}/lastVisitedTime`, Date.now(), "local");
};

function adjustDom(notes, date) {
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
