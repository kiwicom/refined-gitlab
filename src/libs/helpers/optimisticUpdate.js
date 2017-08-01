import ROUTES from "../ROUTES";
import noAssigneeButton from "./../../libs/helpers/noAssigneeButton";

export default (
  currentUsername,
  fullName,
  avatarLink,
  route,
  issueId,
  assigned,
  assignees
) => {
  if (route === ROUTES.ISSUES || route === ROUTES.MRS) {
    if (!assigned) {
      const parent = document.getElementsByClassName("issuable-list")[0];
      let index;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].id === issueId) {
          index = i;
          break;
        }
      }
      const el = document.getElementsByClassName("controls")[index];
      if (el.children.length > 1) {
        el.children[0].remove();
      }
      const avatar = document.createElement("img");
      avatar.setAttribute("width", "16");
      avatar.setAttribute("src", `${avatarLink}`);
      avatar.setAttribute("alt", "");
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
      el.insertBefore(list, el.children[0]);
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const assignee of assignees) {
        assignee.remove();
      }
    }
  } else if (assigned) {
    noAssigneeButton();
  } else {
    const el = document.getElementsByClassName("value hide-collapsed")[0];
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
    link.setAttribute("href", `https://gitlab.com/${currentUsername}`);
    link.className = "author_link bold";
    link.appendChild(avatar);
    link.appendChild(author);
    link.appendChild(username);
    el.replaceChild(link, el.children[0]);
  }
};
