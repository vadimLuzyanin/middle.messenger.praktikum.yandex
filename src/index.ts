import { ScreensPathnames } from "./constants";
import { authController, chatsController, WSController } from "./controllers";
import "./helpers";
import { router } from "./router";
import {
  LoginScreen,
  MainScreen,
  RegisterScreen,
  Screen404,
  Screen500,
  SettingsScreen,
} from "./screens";
import { pathnameChange } from "./store";
import store from "./store/store";

function subRedirects() {
  store.subscribe((getState) => {
    const { isLoggedIn, pathname } = getState();
    if (isLoggedIn) {
      switch (pathname) {
        case ScreensPathnames.register:
        case ScreensPathnames.login: {
          router.go(ScreensPathnames.messenger);
          break;
        }
        default: {
          break;
        }
      }
    } else {
      switch (pathname) {
        case ScreensPathnames.messenger:
        case ScreensPathnames.settings: {
          router.go(ScreensPathnames.login);
          break;
        }
        default: {
          break;
        }
      }
    }
  });
}

async function init() {
  router
    .use(ScreensPathnames.login, LoginScreen)
    .use(ScreensPathnames.register, RegisterScreen)
    .use(ScreensPathnames.messenger, MainScreen)
    .use(ScreensPathnames.settings, SettingsScreen)
    .use(ScreensPathnames.screen500, Screen500)
    .use("*", Screen404)
    .addOnPathname((pathname) => {
      store.dispatch(pathnameChange(pathname));
    })
    .start();

  await authController.ensureInSystem();
  await chatsController.fetchChats();
  subRedirects();

  store.dispatch({ type: "@@INIT", payload: null });
  await WSController.requestOldMessagesAndSubscribeToNew();
}

init();
