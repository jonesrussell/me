export function gridCellDimensions(): { width: number; height: number } {
	const element = document.createElement('div');
	element.style.position = 'fixed';
	element.style.height = 'var(--line-height)';
	element.style.width = '1ch';
	document.body.appendChild(element);
	const rect = element.getBoundingClientRect();
	document.body.removeChild(element);
	return { width: rect.width, height: rect.height };
}

export function adjustMediaPadding() {
	const cell = gridCellDimensions();

	function setHeightFromRatio(
		media: HTMLImageElement | HTMLVideoElement,
		ratio: number
	) {
		const rect = media.getBoundingClientRect();
		const realHeight = rect.width / ratio;
		const diff = cell.height - (realHeight % cell.height);
		media.style.setProperty('padding-bottom', `${diff}px`);
	}

	function setFallbackHeight(media: HTMLImageElement | HTMLVideoElement) {
		const rect = media.getBoundingClientRect();
		const height = Math.round(rect.width / 2 / cell.height) * cell.height;
		media.style.setProperty('height', `${height}px`);
	}

	function onMediaLoaded(media: HTMLImageElement | HTMLVideoElement) {
		let width = 0,
			height = 0;
		switch (media.tagName) {
			case 'IMG':
				width = (media as HTMLImageElement).naturalWidth;
				height = (media as HTMLImageElement).naturalHeight;
				break;
			case 'VIDEO':
				width = (media as HTMLVideoElement).videoWidth;
				height = (media as HTMLVideoElement).videoHeight;
				break;
		}
		if (width > 0 && height > 0) {
			setHeightFromRatio(media, width / height);
		} else {
			setFallbackHeight(media);
		}
	}

	const medias = document.querySelectorAll('img, video');
	for (const media of medias) {
		switch (media.tagName) {
			case 'IMG':
				if ((media as HTMLImageElement).complete) {
					onMediaLoaded(media as HTMLImageElement);
				} else {
					media.addEventListener('load', () =>
						onMediaLoaded(media as HTMLImageElement)
					);
					media.addEventListener('error', () =>
						setFallbackHeight(media as HTMLImageElement)
					);
				}
				break;
			case 'VIDEO':
				switch ((media as HTMLVideoElement).readyState) {
					case HTMLMediaElement.HAVE_CURRENT_DATA:
					case HTMLMediaElement.HAVE_FUTURE_DATA:
					case HTMLMediaElement.HAVE_ENOUGH_DATA:
						onMediaLoaded(media as HTMLVideoElement);
						break;
					default:
						media.addEventListener('loadeddata', () =>
							onMediaLoaded(media as HTMLVideoElement)
						);
						media.addEventListener('error', () =>
							setFallbackHeight(media as HTMLVideoElement)
						);
						break;
				}
				break;
		}
	}
}

export function checkOffsets() {
	const ignoredTagNames = new Set([
		'THEAD',
		'TBODY',
		'TFOOT',
		'TR',
		'TD',
		'TH'
	]);
	const cell = gridCellDimensions();
	const elements = document.querySelectorAll(
		'body :not(.debug-grid, .debug-toggle)'
	);
	for (const element of elements) {
		if (ignoredTagNames.has(element.tagName)) {
			continue;
		}
		const rect = element.getBoundingClientRect();
		if (rect.width === 0 && rect.height === 0) {
			continue;
		}
		const top = rect.top + window.scrollY;
		const offset = top % (cell.height / 2);
		if (offset > 0) {
			element.classList.add('off-grid');
			console.error(
				'Incorrect vertical offset for',
				element,
				'with remainder',
				top % cell.height,
				'when expecting divisible by',
				cell.height / 2
			);
		} else {
			element.classList.remove('off-grid');
		}
	}
}

export function setupDebugToggle() {
	const debugToggle = document.querySelector(
		'.debug-toggle'
	) as HTMLInputElement | null;
	function onDebugToggle() {
		if (debugToggle) {
			document.body.classList.toggle('debug', debugToggle.checked);
		}
	}
	if (debugToggle) {
		debugToggle.addEventListener('change', onDebugToggle);
		onDebugToggle();
	}
}
