import "modern-normalize";
import "./fonts.css";
import { ScreensPathnames } from "./constants";
import { authController, chatsController, WSController } from "./controllers";
import { router } from "./router";
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
    .use(ScreensPathnames.Login, () => import("./screens/auth/Login"))
    .use(ScreensPathnames.Register, () => import("./screens/auth/Register"))
    .use(ScreensPathnames.Messenger, () => import("./screens/main/MainScreen"))
    .use(
      ScreensPathnames.Settings,
      () => import("./screens/settings/SettingsScreen")
    )
    .use(ScreensPathnames.Screen500, () => import("./screens/errors/500"))
    .use("*", () => import("./screens/errors/404"))
    .addOnPathname((pathname) => {
      store.dispatch(pathnameChange(pathname));
    });
  await router.start();

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
