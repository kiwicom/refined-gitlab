import pathnameToRoute from "./pathnameToRoute";
import ROUTES from "../ROUTES";

export default (currentUsername, fullName, avatarLink, parts) => {
  if (pathnameToRoute(parts) === ROUTES.ISSUES || pathnameToRoute(parts) === ROUTES.MRS) {
    const avatar = document.createElement("img");
    avatar.setAttribute("width", "16");
    avatar.setAttribute("src", `${avatarLink}`);
    avatar.setAttribute("alt", '');
    avatar.className = "avatar avatar-inline s16";
    const link = document.createElement("a");
    link.className = "author_link has-tooltip";
    link.setAttribute("title", "");
    link.setAttribute("data-container", "body");
    link.setAttribute("href", `https://gitlab.com/${currentUsername}`);
    link.setAttribute("data-original-title", `Assigned to ${fullName}`);
    link.appendChild(avatar);
    const list = document.createElement("li");
    list.appendChild(link);
    document.getElementsByClassName("controls")[0].insertBefore(list, document.getElementsByClassName("controls")[0].children[0])
  } else {
    const el = document.getElementsByClassName("value hide-collapsed")[0];
    el.children[0].remove();
    const author = document.createElement("span");
    author.classList.add("author");
    author.innerText = fullName;
    const username = document.createElement("span");
    username.classList.add("username");
    username.innerText = `@${currentUsername}`;
    const avatar = document.createElement("img");
    avatar.className = "avatar avatar-inline s32";
    avatar.setAttribute("src", `${avatarLink}`);
    avatar.setAttribute("alt", `${fullName}'s avatar`);
    avatar.setAttribute("width", "32");
    const link = document.createElement("a");
    link.setAttribute("href", `https://gitlab.com/${username}`);
    link.className = "author_link bold";
    link.appendChild(avatar);
    link.appendChild(author);
    link.appendChild(username);
    el.appendChild(link);
  }
}
