export class BurgerMenu {
	constructor() {
		this.menues = [];
	}

	init() {
		const menues = document.querySelectorAll("[data-burger]");
		menues.forEach((menu) => {
			const close_btn = menu.querySelector(".menu__close-button");

			this.menues.push({ burger: menu, close_btn });

			close_btn.addEventListener("click", () => this.toggle(menu, close_btn));
		});
	}

	toggle(menu, button) {
		const isOpen = menu.classList.toggle("_open");
		document.body.classList.toggle("_locked", isOpen);

		button.setAttribute(
			"aria-label",
			isOpen ? "Закрити меню-бургер" : "Відкрити меню-бургер"
		);

		// accessibility: фокус на перший елемент в меню
		if (isOpen) {
			const focusable = menu.querySelector("a, button, input, [tabindex]:not([tabindex='-1'])");
			focusable?.focus();
		}
	}
}
