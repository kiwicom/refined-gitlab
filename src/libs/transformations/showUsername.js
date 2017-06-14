export default () => {
	for (let j = 0; j < 7; j++) {
		const className = [
			'author has-tooltip',
			'author_link bold',
			'author_link has-tooltip',
			'note-header-info',
			'author_link',
			'discussion-header',
			'commit-author-link has-tooltip'
		];
		const a = document.getElementsByClassName(className[j]);
		if (a !== undefined) {
			for (let i = 0; i < a.length; i++) {
				switch (j) {
					case 0:
						// Author
						a[i].innerText = a[i].getAttribute('title').slice(1);
						continue;
					case 1:
						// Assignees
						a[i].children[1].innerText = a[i].children[2].innerText.slice(1);
						continue;
					case 2:
						// Participants
						a[i].setAttribute('title', a[i].href.split('/')[3]);
						continue;
					case 3:
						// Discussion
						if (a[i].children[0].childElementCount === 2) {
							a[i].children[0].children[0].innerText = a[i].children[0].children[1].innerText.slice(1);
							a[i].children[0].removeChild(a[i].children[0].children[1]);
						}
						continue;
					case 4:
						a[i].childNodes[0].innerText = a[i].href.split('/')[3];
						continue;
					case 5:
						a[i].children[2].innerText = a[i].children[2].innerText.replace('@' + a[i].children[1].href.split('/')[3], "");
						continue;
					case 6:
						// Commits
						setTimeout( (a, i) => { a[i].innerText = a[i].href.split('/')[3] }, 1000);
				}
			}
		}
	}
}
