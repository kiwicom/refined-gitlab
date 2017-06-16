export default () => {
	const s = document.createElement('script');
	s.src = chrome.runtime.getURL('agent.js');
	// s.onload = function() {
	// 	this.remove();
	// };
	(document.head || document.documentElement).appendChild(s);

	const parts = location.pathname.split("/");
	const userId = document.getElementsByClassName('header-user-avatar')[0].src.split('/')[7];
	if (userId !== undefined) {
		setTimeout(() => {
			document.dispatchEvent(new CustomEvent('RW759_connectExtension', {
				detail: {
					fn: "selfAssignMr",
					id: parts[4],
					userId: userId,
					group: parts[1],
					project: parts[2],
				},
			}));
		}, 1000);
	}
}
