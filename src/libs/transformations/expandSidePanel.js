export default (remove, add, aside, toggle, pageGutter) => {
	const sidebar = document.getElementsByTagName(aside)[0];
	sidebar.classList.remove(remove);
	sidebar.classList.add(add);
	const button = document.getElementsByClassName(toggle)[1];
	button.style.display = "none";
	const page = document.getElementsByClassName(pageGutter)[0];
	page.classList.remove(remove);
	page.classList.add(add);
}
