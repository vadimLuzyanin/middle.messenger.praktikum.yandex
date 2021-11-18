import "./helpers"
import "./partials"
import {
  renderLogin,
  render404,
  renderMain,
  renderRegister,
  render500,
  renderSettings,
} from "./screens";

const render = () => {
  const { pathname } = document.location;
  switch (pathname) {
    case "/": {
      renderMain();
      return;
    }
    case "/register": {
      renderRegister();
      return;
    }
    case "/auth": {
      renderLogin();
      return;
    }
    case "/500": {
      render500();
      return;
    }
    case "/settings": {
      renderSettings();
      return;
    }
    default: {
      render404();
      return;
    }
  }
};

render();
