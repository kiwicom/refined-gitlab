export default () => {
  const el = document.getElementsByClassName("value hide-collapsed")[0];
  el.children[0].remove();
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.classList.add("btn-link");
  button.innerText = "assign yourself";
  const span = document.createElement("span");
  span.className = "assign-yourself no-value";
  span.innerText = "No assignee - ";
  span.appendChild(button);
  el.appendChild(span);
};
