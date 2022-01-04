import { removeModals } from "../components/modal";
import { renderRoot } from "../render";
import {
  ScreenComponentClassType,
  ScreenComponentType,
  ValidRouterPathname,
} from "../types";

export default class Route {
  #pathname: ValidRouterPathname;

  #componentClass: ScreenComponentClassType;

  #component: ScreenComponentType | null;

  constructor(
    pathname: ValidRouterPathname,
    componentClass: ScreenComponentClassType
  ) {
    this.#pathname = pathname;
    this.#componentClass = componentClass;
    this.#component = null;
  }

  matchPathname(pathname: ValidRouterPathname) {
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
