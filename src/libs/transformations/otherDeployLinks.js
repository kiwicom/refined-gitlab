export default () => {
	// FIXME: Optimize
	let already = false;

	setInterval(() => {
		let deployLinkEl = document.getElementsByClassName("js-deploy-url")[0];
		if (deployLinkEl && !already) {
			deployLinkEl.insertAdjacentHTML('afterend', `| <a href="https://skymock.skypicker.com?baseUrl=${deployLinkEl.href}cs" target="_blank">Skymock</a>`);
			already = true
		}
	}, 1000)
}
