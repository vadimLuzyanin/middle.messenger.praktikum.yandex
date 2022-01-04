import { ScreenComponentClassType } from "../types";
import Route from "./route";

class Router {
  routes: Route[];

  history: History;

  #currentRoute: Route | null;

  constructor() {
    this.routes = [];
    this.history = window.history;
    this.#currentRoute = null;
  }

  use(pathname: string, componentClass: ScreenComponentClassType) {
    const route = new Route(pathname, componentClass);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      const newPathname = (event.currentTarget as Window).location.pathname;
      if (newPathname) {
        this.#onRoute(newPathname);
      }
    };

    this.#onRoute(window.location.pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.#onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.matchPathname(pathname));
  }

  #onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) return;

    if (this.#currentRoute && this.#currentRoute !== route) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route.render();
  }
}

export default new Router();
