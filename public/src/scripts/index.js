import * as functions from "./functions/functions.min.js";
import { _Module } from './module.min.js';

/** Для коректного відображення webp із css */
functions.isWebp();

/* Додавання loaded для HTML після повного завантаження сторінки */
functions.isPageLoad();

/* Додавання класу touch для HTML якщо браузер мобільний */
// functions.isTouch();

/* Модуль для роботи з меню (Бургер) */
_Module.burger_menu.init();

/* Модуль для роботи з спостерігачем */
_Module.watcher.init();

/* Модуль для роботи з попапами */
_Module.popup.init();

/* Модуль для роботи із світлом */
_Module.light.init();

/* Інше */
const phoneInput = document.getElementById('user-phone');
IMask(phoneInput, {
	mask: '+{380} (00) 000-00-00'
});

const cube = document.getElementById("cube");
if (cube) {
	const sides = cube.children;
	
	for (const side of sides) {
		side.addEventListener("click", e => {
			if (!cube.classList.contains("animated")) {
				cube.classList.add("animated");

				setTimeout(() => {
					cube.classList.remove("animated");
				}, 2500);
			}
		});
	}
}

const buttons = document.querySelectorAll(".product-card__picture_buttons");
if (buttons && buttons.length != 0) {
	buttons.forEach(button => {
		const card_picture = button.parentElement;
		const card_info = card_picture.querySelector(".product-card__picture_info");
		

		button.addEventListener("click", e => {
			card_picture.classList.toggle("_open");
		});

		card_info.addEventListener("click", e => {
			card_picture.classList.add("_open");
		});

		card_picture.addEventListener("mouseleave", e => {
			card_picture.classList.remove("_open");
		});
	});
}

const form = document.querySelector('#form-review');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());
	
	const phoneRegex = /^\+380\d{9}$/;

	if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
		return alert('Номер телефону має містити 10 цифр');
	}

	if (!data.message || data.message.length < 5) {
		return alert('Напишіть щось змістовне у відгуку');
	}

  try {
    const res = await fetch('/send-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if(json.success) {
      window.location.reload();
    }
  } catch (err) {
    alert('Помилка зв’язку з сервером');
  }
});
