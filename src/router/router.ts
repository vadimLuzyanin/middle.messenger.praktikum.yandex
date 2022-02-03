import { ScreenComponentClassType, ValidRouterPathname } from "../types";
import Route from "./route";

type RouteModule = {
  default: ScreenComponentClassType;
};

type LoadableRoute = () => Promise<RouteModule>;

class Router {
  routes: Route[];

  history: History;

  #currentRoute: Route | null;

  #onPathname?: (pathname: string) => void;

  pending: {
    pathname: string;
    loadableRoute: LoadableRoute;
  }[] = [];

  constructor() {
    this.routes = [];
    this.history = window.history;
    this.#currentRoute = null;
  }

  use(pathname: ValidRouterPathname, loadableRoute: LoadableRoute) {
    this.pending.push({ pathname, loadableRoute });
    return this;
  }

  async start() {
    window.onpopstate = (event) => {
      const newPathname = (event.currentTarget as Window).location.pathname as
        | ValidRouterPathname
        | undefined;
      if (newPathname) {
        this.#onRoute(newPathname);
      }
    };

    await this.#onRoute(window.location.pathname as ValidRouterPathname);
  }

  async go(pathname: ValidRouterPathname) {
    this.history.pushState({}, "", pathname);
    await this.#onRoute(pathname);
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

  async #onRoute(pathname: ValidRouterPathname) {
    let route = this.getRoute(pathname);
    if (!route) {
      const loadableRoute = this.pending.find(
        (p) => p.pathname === pathname
      )?.loadableRoute;
      if (!loadableRoute) {
        return;
      }
      const module = await loadableRoute();
      const pendingClass = module.default;
      route = new Route(pathname, pendingClass);
      this.routes.push(route);
    }

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
