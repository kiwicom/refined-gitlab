export default id => {
  const elem = document.getElementById(id);
  elem.style.display = "flex";
  elem.style.flexDirection = "column-reverse";
  const a = document.getElementsByClassName("notes-form")[0];
  const b = a.parentElement;
  b.removeChild(a);
  b.insertBefore(a, b.childNodes[0]);
};
