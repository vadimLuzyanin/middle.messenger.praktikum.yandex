import "./normalize.css";
import "./fonts.css";
import { ScreensPathnames } from "./constants";
import { authController, chatsController, WSController } from "./controllers";
import { router } from "./router";
import {
  LoginScreen,
  MainScreen,
  RegisterScreen,
  Screen404,
  Screen500,
  SettingsScreen,
} from "./screens";
import { pathnameChange, store } from "./store";

function subRedirects() {
  store.subscribe((getState) => {
    const { isLoggedIn, pathname } = getState();
    if (isLoggedIn) {
      switch (pathname) {
        case ScreensPathnames.Register:
        case ScreensPathnames.Login: {
          router.go(ScreensPathnames.Messenger);
          break;
        }
        default: {
          break;
        }
      }
    } else {
      switch (pathname) {
        case ScreensPathnames.Messenger:
        case ScreensPathnames.Settings: {
          router.go(ScreensPathnames.Login);
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
    .use(ScreensPathnames.Login, LoginScreen)
    .use(ScreensPathnames.Register, RegisterScreen)
    .use(ScreensPathnames.Messenger, MainScreen)
    .use(ScreensPathnames.Settings, SettingsScreen)
    .use(ScreensPathnames.Screen500, Screen500)
    .use("*", Screen404)
    .addOnPathname((pathname) => {
      store.dispatch(pathnameChange(pathname));
    })
    .start();

  const alreadyLoggedIn = await authController.ensureInSystem();
  if (alreadyLoggedIn) {
    await chatsController.fetchChats();
  }
  subRedirects();

  store.dispatch({ type: "@@INIT", payload: null });
  if (alreadyLoggedIn) {
    await WSController.requestOldMessagesAndSubscribeToNew();
  }
}

init();
