const initialDocTitle = document.title;
function updateDocTitle(content) {
	document.title = initialDocTitle + ' #' + content;
}

const barHistory = [];
function init() {
	const historyBrowser = document.querySelector('select[name="history"]');
	const links = document.querySelectorAll('a');
	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener('click', function (e) {
			e.preventDefault();

			let hash = ((e.type === 'click') ? e.target.hash : location.hash).substr(1);
			let label = document.querySelector('a[href="#' + hash + '"]');
			label = (label === null) ? 'Home' : label.textContent;
			console.log(label + ' #' + hash);

			updateDocTitle(label);
			history.pushState(hash, label, '#' + hash);

			barHistory.push({ hashKey: hash, value: label });
			console.log(barHistory);

			if (e.type === 'click') {
				location.hash = '';
				location.hash = hash;
			}

			const option = document.createElement('option');
			option.value = hash;
			option.textContent = label;
			historyBrowser.appendChild(option);
		});
	}
	historyBrowser.addEventListener('change', function (e) {
		location.hash = e.target.value;
	});
}

window.addEventListener('load', init);