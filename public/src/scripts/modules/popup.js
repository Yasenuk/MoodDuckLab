export class Popup {
	constructor() {
		this.popups = [];
	}

	init() {
		const get_popups = document.querySelectorAll("[data-popup]");
		get_popups.forEach((popup) => {
			this.popups.push({
				element: popup,
				open_button: document.querySelector(`[data-popup-open="#${popup.id}"]`),
				close_button: popup.querySelector("[data-popup-close]"),
				is_open: false
			});
		});

		this.event();
	}

	event() {
		document.addEventListener("click", (e) => {
			this.popups.forEach((popup) => {
				// Відкриття
				if (
					e.target === popup.open_button ||
					e.target.closest(`[data-popup-open="#${popup.element.id}"]`)
				) {
					e.preventDefault();
					this.open(popup);

					return;
				}

				// Закриття
				const close_button = e.target.closest(`[data-popup-close]`);
				if (close_button || !e.target.closest(".popup__body") && popup.is_open) {
					e.preventDefault();
					this.close(popup);
					popup.element.is_open = false;

					return;
				}
			});
		});

		// ESC закриває тільки той, що відкритий
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				const opened = this.popups.find((popup) =>
					popup.element.classList.contains("_open")
				);

				if (opened) this.close(opened);

				return;
			}
		});
	}

	open(popup) {
		popup.is_open = true;
		popup?.element?.classList?.add("_open");
		document.body.classList.add("_locked");
		popup?.element?.removeAttribute("aria-hidden");
	}

	close(popup) {
		popup.is_open = false;
		popup?.element?.classList?.remove("_open");
		document.body.classList.remove("_locked");
	}
}
