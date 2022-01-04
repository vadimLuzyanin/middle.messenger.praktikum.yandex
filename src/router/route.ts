import { removeModals } from "../components/modal";
import { renderRoot } from "../render";
import { ScreenComponentClassType, ScreenComponentType } from "../types";

export default class Route {
  #pathname: string;

  #componentClass: ScreenComponentClassType;

  #component: ScreenComponentType | null;

  constructor(pathname: string, componentClass: ScreenComponentClassType) {
    this.#pathname = pathname;
    this.#componentClass = componentClass;
    this.#component = null;
  }

  matchPathname(pathname: string) {
    if (this.#pathname === "*") {
      return true;
    }
    return pathname === this.#pathname;
  }

  render() {
    if (!this.#component) {
      this.#component = new this.#componentClass();
      renderRoot(this.#component);
      return;
    }

    this.#component.show();
  }

  leave() {
    if (this.#component) {
      removeModals();
      this.#component.hide();
    }
  }
}
