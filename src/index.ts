import { ScreensPathnames } from "./constants";
import authController from "./controllers/authController";
import chatsController from "./controllers/chatsController";
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
import { pathnameChange } from "./store/actions/pathname";
import store from "./store/store";

function init() {
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

  authController.ensureInSystem().then(() => {
    chatsController
      .fetchChats()
      .then(() => {
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
      })
      .then(() => {
        store.dispatch({ type: "@@INIT", payload: null });
      });
  });

}

init();
