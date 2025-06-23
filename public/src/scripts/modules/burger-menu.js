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
				link.addEventListener('click', (e) => {
					if (this.is_open) {
						setTimeout(() => {
							this.close(menu, close_btn);
						}, 100);
					}
				});
			});
		});
	}

	open(menu, button) {
		this.is_open = true;
		menu.classList.add("_open");
		document.body.classList.add("_locked");

		button.setAttribute("aria-label", "Закрити меню-бургер");
	}

	close(menu, button) {
		this.is_open = false;
		document.body.classList.remove("_locked");

		menu.classList.remove("_open");
		button.setAttribute("aria-label", "Відкрити меню-бургер");
	}
}
