import { ScreensPathnames } from "./constants";
import authController from "./controllers/authController";
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

function init() {
  router
    .use(ScreensPathnames.login, LoginScreen)
    .use(ScreensPathnames.register, RegisterScreen)
    .use(ScreensPathnames.messenger, MainScreen)
    .use(ScreensPathnames.settings, SettingsScreen)
    .use(ScreensPathnames.screen500, Screen500)
    .use("*", Screen404)
    .start();

  authController.ensureInSystem();
}

init();
