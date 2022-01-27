import chatsController from "./chatsController";
import { store, currentUserReceive, errorInController } from "../store";
import {
  ChangeAvatarParams,
  ChangePasswordParams,
  ChangeProfileParams,
  ErrorResponse,
  UserSettingsApi,
} from "../api";

const userSettingsApi = new UserSettingsApi();

class UserSettingsController {
  async changeProfile(params: ChangeProfileParams) {
    try {
      const userData = await userSettingsApi.changeProfile(params);
      store.dispatch(currentUserReceive(userData));
    } catch (e) {
      store.dispatch(
        errorInController({
          error: e as Error,
          message: "Произошла ошибка при изменении настроек пользователя",
        })
      );
    }
  }

  async changePassword(params: ChangePasswordParams) {
    try {
      await userSettingsApi.changePassword(params);
      return true;
    } catch (e) {
      return (e as ErrorResponse).reason;
    }
  }

  async changeAvatar(params: ChangeAvatarParams) {
    try {
      const result = await userSettingsApi.changeAvatar(params);
      store.dispatch(currentUserReceive(result));
      await chatsController.fetchChats();
    } catch (e) {
      store.dispatch(
        errorInController({
          error: e as Error,
          message: "Произошла ошибка при изменении аватара пользователя",
        })
      );
    }
  }
}

export default new UserSettingsController();
