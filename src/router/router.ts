import { ScreenComponentClassType, ValidRouterPathname } from "../types";
import Route from "./route";

class Router {
  routes: Route[];

  history: History;

  #currentRoute: Route | null;

  #onPathname?: (pathname: string) => void;

  constructor() {
    this.routes = [];
    this.history = window.history;
    this.#currentRoute = null;
  }

  use(pathname: ValidRouterPathname, componentClass: ScreenComponentClassType) {
    const route = new Route(pathname, componentClass);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      const newPathname = (event.currentTarget as Window).location.pathname as
        | ValidRouterPathname
        | undefined;
      if (newPathname) {
        this.#onRoute(newPathname);
      }
    };

    this.#onRoute(window.location.pathname as ValidRouterPathname);
  }

  go(pathname: ValidRouterPathname) {
    this.history.pushState({}, "", pathname);
    this.#onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: ValidRouterPathname) {
    return this.routes.find((route) => route.matchPathname(pathname));
  }

  addOnPathname(onPathname: (pathname: string) => void) {
    this.#onPathname = onPathname;
    return this;
  }

  #onRoute(pathname: ValidRouterPathname) {
    const route = this.getRoute(pathname);
    if (!route) return;

    if (this.#currentRoute && this.#currentRoute !== route) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route.render();
    if (this.#onPathname) {
      this.#onPathname(pathname);
    }
  }
}

export default new Router();
