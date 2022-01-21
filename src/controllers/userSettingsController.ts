/* eslint-disable no-console */
import chatsController from "./chatsController";
import { store, currentUserReceive } from "../store";
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
      console.log(e);
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
      console.log(e);
    }
  }
}

export default new UserSettingsController();
