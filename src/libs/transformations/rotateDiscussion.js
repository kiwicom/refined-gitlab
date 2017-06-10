export default (id) => {
	const elem = document.getElementById(id);
	elem.style.display = "flex";
	elem.style.flexDirection = "column-reverse";
	var a = document.getElementsByClassName("notes-form")[0];
	var b = a.parentElement;
	b.removeChild(a);
	b.insertBefore(a, b.childNodes[0]);
}
