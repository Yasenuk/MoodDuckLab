export class Ligth {
	constructor() {
		this.lights = [];
	}

	init() {
		const all_lights = document.querySelectorAll("[data-light]");
		all_lights.forEach(light => {
			this.lights.push({
				el: light,
				parent: document.getElementById(light.dataset.light.split("|")[0]),
				sub_parent: light.dataset.light.split("|").length > 1
					? document.getElementById(light.dataset.light.split("|")[1])
					: null
			});
		});

		this.setPlase(this.lights);
		window.addEventListener("resize", e => {
			this.setPlase(this.lights);
		});
	}

	setPlase(lights) {
		lights.forEach(light => {
			const offsetTop = light.parent.offsetTop;
			const offsetHeight = light.parent.offsetHeight * light.el.dataset.lightYOffset;
			const offsetX = (light.sub_parent
				? light.sub_parent.offsetLeft
				: 0
			);

			light.el.style.top = `${offsetTop + offsetHeight}px`;
			if (offsetX > 0) {
				light.el.style.right = `${offsetX}px`;
			}
		});
	}	
}