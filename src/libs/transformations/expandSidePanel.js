export default () => {
	const classToRemove = "right-sidebar-collapsed";
	const classToAdd = "right-sidebar-expanded";
	const selectorAside = "ASIDE";
	const selectorToggle = "gutter-toggle";
	const selectorPageGutter = "page-gutter";
	const selectorContentWrapper = 'content-wrapper';

	const sidebar = document.getElementsByTagName(selectorAside)[0];
	sidebar.classList.remove(classToRemove);
	sidebar.classList.add(classToAdd);

	const button = document.getElementsByClassName(selectorToggle)[1];
	button.style.display = "none";

	const page = document.getElementsByClassName(selectorPageGutter)[0];
	page.classList.remove(classToRemove);
	page.classList.add(classToAdd);

	const contentWrapper = document.getElementsByClassName(selectorContentWrapper)[0];
	contentWrapper.style.paddingRight = "290px"
}
