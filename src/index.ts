import Component from "./component";
import "./helpers";
import {
  ErrorScreen,
  LoginScreen,
  MainScreen,
  RegisterScreen,
  SettingsScreen,
} from "./screens";

export function renderRoot(block: Component<any, any, any>) {
  const root = document.getElementById("app");
  if (root) {
    root.appendChild(block.render());
  }
  block.dispatchComponentDidMount();
}

export function clearRoot() {
  const root = document.getElementById("app");
  if (root) {
    root.innerHTML = "";
  }
}

export function pushPathname(pathname: string) {
  if (document.location.pathname !== pathname) {
    window.history.pushState(null, "", pathname);
    render();
  }
}

export default function render() {
  clearRoot();
  const { pathname } = document.location;
  switch (pathname) {
    case "/": {
      renderRoot(new MainScreen());
      break;
    }
    case "/login": {
      renderRoot(new LoginScreen());
      break;
    }
    case "/register": {
      renderRoot(new RegisterScreen());
      break;
    }
    case "/settings": {
      renderRoot(new SettingsScreen());
      break;
    }
    case "/500": {
      renderRoot(
        new ErrorScreen({ description: "Мы уже фиксим", title: "500" })
      );
      break;
    }
    case "/404":
    default: {
      renderRoot(
        new ErrorScreen({ description: "Не туда попали", title: "404" })
      );
    }
  }
}

render();
