import BaseAPI from "./baseApi";
import HTTP from "./Fetch";
import { BaseResponse, User } from "./types";

export type RegisterParams = Omit<User, "id" | "avatar" | "display_name"> & {
  password: string;
};

type RegisterResponse =
  | {
      id: 0;
    }
  | BaseResponse;

export type LoginParams = {
  login: string;
  password: string;
};

type LoginResponse = BaseResponse;

type GetUserResponse = User;

type LogoutResponse = BaseResponse;

const authApiInstance = new HTTP("api/v2/auth");

export default class AuthApi extends BaseAPI {
  register(params: RegisterParams) {
    return authApiInstance.post<RegisterResponse>("/signup", { data: params });
  }

  login(params: LoginParams) {
    return authApiInstance.post<LoginResponse>("/signin", { data: params });
  }

  getUser() {
    return authApiInstance.get<GetUserResponse>("/user");
  }

  logout() {
    return authApiInstance.post<LogoutResponse>("/logout");
  }
}
