import { v4 } from "uuid";
import { ListenerNames } from "./constants";
import EventBus from "./eventBus";
import { BlockProps, NativeListenersMap, TemplateFn } from "./types";

enum FLOW {
  didMount = "flow:did-mount",
  didUpdate = "flow:did-update",
  init = "flow:init",
  render = "flow:render",
  requestUpdate = "flow:request-update",
}

type Children = {
  [name: string]: Component<any, any> | Children[];
};

type ShallowImmutable<T> = {
  readonly [K in keyof T]: T[K];
};
export default class Component<
  P extends object = BlockProps,
  S extends object = {},
  I extends object = BlockProps
> {
  #template: TemplateFn<typeof this.props & S>;

  #eventBus: EventBus<FLOW>;

  #state: S = {} as S;

  #listeners: NativeListenersMap = {};

  #prevEl: HTMLElement | null = null;

  id: string;

  eventTargetSelector?: string;

  cn: object = {};

  innerProps: I = {} as I;

  outerProps: P;

  get props(): ShallowImmutable<P & I> {
    return { ...this.innerProps, ...this.outerProps };
  }

  constructor(template: TemplateFn<any>, outerProps: P = {} as P) {
    this.#template = template;
    this.outerProps = this.#makeOuterPropsProxy(outerProps);
    this.#eventBus = new EventBus<FLOW>();
    this.id = v4();
    this.state = this.#makeStateProxy({} as S);
    this.#registerEvents();
  }

  #registerEvents() {
    this.#eventBus.on(FLOW.didMount, this.#componentDidMount.bind(this));
    this.#eventBus.on(FLOW.render, this.#render.bind(this));
    this.#eventBus.on(FLOW.didUpdate, this.componentDidUpdate.bind(this));
    this.#eventBus.on(FLOW.requestUpdate, this.#updateIfNeeded.bind(this));
  }

  #makeStateProxy(rawState: S) {
    return new Proxy(rawState, {
      set: (target, prop, value) => {
        const prevState = { ...target };
        // @ts-ignore
        const oldProp = target[prop];
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        if (oldProp !== value) {
          this.#eventBus.emit(FLOW.requestUpdate, this.props, prevState);
        }
        return true;
      },
    });
  }

  #makeOuterPropsProxy(outerProps: P) {
    return new Proxy(outerProps, {
      set: (target, prop, value) => {
        const prevOuterProps = { ...target };
        // @ts-ignore
        const oldProp = target[prop];
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        if (oldProp !== value) {
          this.#eventBus.emit(
            FLOW.requestUpdate,
            { ...prevOuterProps, ...this.innerProps },
            this.state
          );
        }
        return true;
      },
    });
  }

  set state(newState: S) {
    this.#state = this.#makeStateProxy(newState);
  }

  get state() {
    return this.#state;
  }

  setState(newState: Partial<S>): void;

  setState(updateFromPrev: (prev: S) => S): void;

  setState(arg: any) {
    if (typeof arg === "object") {
      Object.assign(this.#state, arg);
    } else if (typeof arg === "function") {
      const newState = arg(this.#state);
      Object.assign(this.#state, newState);
    }
  }

  componentDidMount() {}

  componentDidUpdate(_prevProps: typeof this.props, _prevState: S) {}

  shouldComponentUpdate(_prevProps: P, _prevState: S) {
    return true;
  }

  dispatchComponentDidUpdate() {
    this.componentDidUpdate(this.props, this.state);
  }

  #componentDidMount() {
    this.componentDidMount();

    Object.values(this.#getChildren()).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((c) => {
          if (c.element && c instanceof Component) {
            c.dispatchComponentDidMount();
          }
        });
      } else if (child.element) {
        child.dispatchComponentDidMount();
      }
    });
  }

  dispatchComponentDidMount() {
    this.#eventBus.emit(FLOW.didMount);
  }

  #updateIfNeeded(prevProps: P, prevState: S) {
    if (this.shouldComponentUpdate(prevProps, prevState)) {
      this.#eventBus.emit(FLOW.didUpdate, prevProps, prevState);
      this.#eventBus.emit(FLOW.render);
    }
  }

  forceUpdate() {
    this.#eventBus.emit(FLOW.didUpdate);
    this.#eventBus.emit(FLOW.render);
  }

  #getListenersFromProps() {
    const listeners: NativeListenersMap = {};
    Object.entries(this.props).forEach(([name, value]) => {
      if (
        Object.values(ListenerNames).includes(name as ListenerNames) &&
        typeof value === "function"
      ) {
        const nativeName = Object.keys(ListenerNames).find(
          // @ts-ignore
          (key) => ListenerNames[key] === name
        );
        if (nativeName) {
          // @ts-ignore
          listeners[nativeName] = value;
        }
      }
    });

    return listeners;
  }

  #getTargetForListeners(root: HTMLElement) {
    if (this.eventTargetSelector) {
      return root.querySelector(this.eventTargetSelector);
    }
    return root;
  }

  #addListeners(element: HTMLElement) {
    const listeners = this.#getListenersFromProps();
    Object.keys(listeners).forEach((eventName) => {
      // @ts-ignore
      const listener = listeners[eventName];
      if (listener) {
        this.#getTargetForListeners(element)?.addEventListener(
          eventName,
          listener
        );
      }
    });
    this.#listeners = listeners;
  }

  #removeListeners(element: HTMLElement) {
    Object.keys(this.#listeners).forEach((eventName) => {
      // @ts-ignore
      const listener = this.#listeners[eventName];
      if (listener) {
        this.#getTargetForListeners(element)?.removeEventListener(
          eventName,
          listener
        );
      }
    });

    this.#listeners = {};
  }

  #getChildren() {
    const children = {} as Children;

    Object.entries({ ...this.props, ...this.state }).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        if (value.every((el) => el instanceof Component)) {
          children[key] = value;
        }
      }
    });

    return children;
  }

  #render() {
    const copy = { ...this.props, ...this.state };
    Object.entries(this.#getChildren()).forEach(([name, child]) => {
      if (Array.isArray(child)) {
        // @ts-ignore
        copy[name] = child.map(
          (c) => `<div data-component-id="${c.id}"></div>`
        );
      } else {
        // @ts-ignore
        copy[name] = `<div data-component-id="${child.id}"></div>`;
      }
    });
    const string = this.#template({ ...copy, cn: this.cn });

    const fragment = document.createElement("template");
    fragment.innerHTML = string;
    Object.values(this.#getChildren()).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((c) => {
          const element = fragment.content.querySelector(
            `[data-component-id="${c.id}"]`
          );
          if (element && c instanceof Component) {
            // c.dispatchComponentDidUpdate();
            element.replaceWith(c.render());
          }
        });
      } else {
        const element = fragment.content.querySelector(
          `[data-component-id="${child.id}"]`
        );
        if (element) {
          // child.dispatchComponentDidUpdate();
          element.replaceWith(child.render());
        }
      }
    });

    const result = fragment.content.firstElementChild as HTMLElement;
    this.#addListeners(result);

    if (this.#prevEl) {
      this.#removeListeners(this.#prevEl);
      this.#prevEl.replaceWith(result);
    }

    this.#prevEl = result;

    return result;
  }

  render() {
    return this.#render();
  }

  get element() {
    return this.#prevEl;
  }

  remove() {
    if (this.element) {
      this.#removeListeners(this.element);
      this.element.remove();
    }
  }
}
