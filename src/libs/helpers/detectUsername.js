export default () => {
	let user = document.getElementsByClassName("current-user")[0].textContent;
	user = user.split("\n");
	return user[4].substring(1);
};
