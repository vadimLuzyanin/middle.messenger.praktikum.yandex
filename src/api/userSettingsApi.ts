import HTTP from "./Fetch";
import { BaseResponse, User } from "./types";

export type ChangeProfileParams = Omit<User, "id" | "avatar">;

type ChangeProfileResponse = User;

export type ChangeAvatarParams = FormData;

type ChangeAvatarResponse = User;

export type ChangePasswordParams = {
  oldPassword: string;
  newPassword: string;
};

type ChangePasswordResponse = BaseResponse;

const userSettingsApiInstance = new HTTP("api/v2/user");

export class UserSettingsApi {
  changeProfile(params: ChangeProfileParams) {
    return userSettingsApiInstance.put<ChangeProfileResponse>("/profile", {
      data: params,
    });
  }

  changeAvatar(params: ChangeAvatarParams) {
    return userSettingsApiInstance.put<ChangeAvatarResponse>(
      "/profile/avatar",
      {
        data: params,
      }
    );
  }

  changePassword(params: ChangePasswordParams) {
    return userSettingsApiInstance.put<ChangePasswordResponse>("/password", {
      data: params,
    });
  }
}
