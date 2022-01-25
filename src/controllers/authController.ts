import WSController from "./WSController";
import { AuthApi, ErrorResponse, LoginParams, RegisterParams } from "../api";
import {
  store,
  currentUserReceive,
  loginError,
  logout,
  registerError,
  errorInController,
} from "../store";
import chatsController from "./chatsController";

const authApi = new AuthApi();

class AuthController {
  async login(params: LoginParams) {
    try {
      await authApi.login(params);
      const userData = await authApi.getUser();

      store.dispatch(currentUserReceive(userData));
      await chatsController.fetchChats();
      await WSController.requestOldMessagesAndSubscribeToNew();
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
      await WSController.requestOldMessagesAndSubscribeToNew();
    } catch (e) {
      store.dispatch(registerError((e as ErrorResponse).reason));
    }
  }

  async getUser(dontWarnOnError?: boolean) {
    try {
      const result = await authApi.getUser();
      return result;
    } catch (e) {
      if (!dontWarnOnError) {
        store.dispatch(
          errorInController({
            error: e as Error,
            message: "Произошла ошибка при получении пользователя",
          })
        );
      }
      return null;
    }
  }

  async logout() {
    try {
      await authApi.logout();
      store.dispatch(logout(null));
    } catch (e) {
      store.dispatch(
        errorInController({
          error: e as Error,
          message: "Произошла ошибка при выходе из системы",
        })
      );
    }
  }

  async ensureInSystem() {
    try {
      const userData = await this.getUser(true);
      if (userData) {
        store.dispatch(currentUserReceive(userData));
        return true;
      }
      return false;
    } catch (e) {
      store.dispatch(
        errorInController({
          error: e as Error,
        })
      );
      return false;
    }
  }
}

export default new AuthController();
