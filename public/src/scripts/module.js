import { BurgerMenu } from "./modules/burger-menu.min.js";
import { Ligth } from "./modules/light.min.js";
import { Popup } from "./modules/popup.min.js";
import { Watcher } from "./modules/watcher.min.js";

export const _Module = {
	watcher: new Watcher(),
	burger_menu: new BurgerMenu(),
	popup: new Popup(),
	light: new Ligth()
};