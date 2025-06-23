export class BurgerMenu {
	constructor() {
		this.menues = [];
		this.is_open = false;
	}

	init() {
		const menues = document.querySelectorAll("[data-burger]");
		menues.forEach((menu) => {
			const close_btn = menu.querySelector(".menu__close-button");

			this.menues.push({ burger: menu, close_btn });

			close_btn.addEventListener("click", () => {
				if (this.is_open) {
					this.close(menu, close_btn)
				} else this.open(menu, close_btn)
			});

			const burgerLinks = menu.querySelectorAll('a[href^="#"]');
			burgerLinks.forEach(link => {
				link.addEventListener('click', () => {
					this.close(menu, close_btn);
				});
			});
		});
	}

	open(menu, button) {
		this.is_open = true;
		menu.classList.add("_open");
		document.body.classList.add("_locked");

		button.setAttribute(
			"aria-label",
			"Закрити меню-бургер"
		);
	}

	close(menu, button) {
		this.is_open = false;
		menu.classList.remove("_open");
		document.body.classList.remove("_locked");

		button.setAttribute(
			"aria-label",
			"Відкрити меню-бургер"
		);
	}
}
