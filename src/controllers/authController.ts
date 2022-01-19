/* eslint-disable no-console */
import AuthApi, { LoginParams, RegisterParams } from "../api/authApi";
import { ScreensPathnames } from "../constants";
import { gotoRoute, router } from "../router";
import { currentUserReceive } from "../store/actions";
import store from "../store/store";

const authApi = new AuthApi();

class AuthController {
  async login(params: LoginParams) {
    try {
      await authApi.login(params);

      const userData = await authApi.getUser();
      store.dispatch(currentUserReceive(userData));
      gotoRoute(ScreensPathnames.messenger);
    } catch (e) {
      console.log(e);
    }
  }

  async register(params: RegisterParams) {
    try {
      await authApi.register(params);
      const userData = await authApi.getUser();

      store.dispatch(currentUserReceive(userData));
      gotoRoute(ScreensPathnames.messenger);
    } catch (e) {
      console.log(e);
    }
  }

  async getUser() {
    try {
      const result = await authApi.getUser();
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async logout() {
    try {
      await authApi.logout();
      router.go(ScreensPathnames.login);
    } catch (e) {
      console.log(e);
    }
  }

  async ensureInSystem() {
    try {
      const userData = await authApi.getUser();
      store.dispatch(currentUserReceive(userData));
      gotoRoute(ScreensPathnames.messenger);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
