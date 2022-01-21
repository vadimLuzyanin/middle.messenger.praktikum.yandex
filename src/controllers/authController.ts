/* eslint-disable no-console */
import { AuthApi, ErrorResponse, LoginParams, RegisterParams } from "../api";
import { store, currentUserReceive, loginError, logout } from "../store";
import chatsController from "./chatsController";

const authApi = new AuthApi();

class AuthController {
  async login(params: LoginParams) {
    try {
      await authApi.login(params);
      const userData = await authApi.getUser();

      store.dispatch(currentUserReceive(userData));
      await chatsController.fetchChats();
    } catch (e) {
      store.dispatch(loginError((e as ErrorResponse).reason));
    }
  }

  async register(params: RegisterParams) {
    try {
      await authApi.register(params);
      const userData = await authApi.getUser();

      store.dispatch(currentUserReceive(userData));
      await chatsController.fetchChats();
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
      store.dispatch(logout(null));
    } catch (e) {
      console.log(e);
    }
  }

  async ensureInSystem() {
    try {
      const userData = await authApi.getUser();
      store.dispatch(currentUserReceive(userData));
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
