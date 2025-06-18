export class Watcher {
	constructor() {
		this.defaultObserver = null;
		this.customObservers = new Map();
	}

	init(
		options = { root: null, rootMargin: "0px 0px -100px 0px", threshold: 0.1 }
	) {
		options.root = options.root
			? document.querySelector(`.${options.root}`)
			: null;

		this.defaultObserver = new IntersectionObserver(
			(entries) => this.observerCallBack(entries),
			options
		);

		this.defaultObserver.root?.classList.add("_watcher");

		this.watch();
	}

	getObserverForElement(element, defaultOptions) {
		const customMargin = element.dataset.watchMargin;
		if (!customMargin) return this.defaultObserver;

		const key = `margin:${customMargin}`;
		if (!this.customObservers.has(key)) {
			const customObserver = new IntersectionObserver(
				(entries) => this.observerCallBack(entries),
				{
					...defaultOptions,
					rootMargin: customMargin,
				}
			);
			this.customObservers.set(key, customObserver);
		}
		return this.customObservers.get(key);
	}

	watch() {
		const watchElements = document.querySelectorAll("[data-watch]");
		watchElements.forEach((element) => {
			element.classList.add("_watcher-element");
			const observer = this.getObserverForElement(
				element,
				this.defaultObserver
			);
			observer.observe(element);
		});
	}

	watchOne(target) {
		if (target.dataset.watch !== "navigator") {
			this.defaultObserver?.unobserve(target);
			const customMargin = target.dataset.watchMargin;

			setTimeout(() => {
				target.classList.add("_end");
			}, 3000);

			if (customMargin) {
				const key = `margin:${customMargin}`;
				this.customObservers.get(key)?.unobserve(target);
			}
		}
	}

	observerCallBack(entries) {
		entries.forEach((entry) => {
			const targetElement = entry.target;
			if (entry.isIntersecting) {
				targetElement.classList.add("_watched");
				this.watchOne(targetElement);
			} else {
				targetElement.classList.remove("_watched");
			}
		});
	}
}
