import BaseAPI from "./baseApi";
import HTTP from "./Fetch";
import { BaseResponse, User } from "./types";

type GetUserResponse = User | BaseResponse;

type SearchUsersParams = { login: string };
type SearchUsersResponse = User[] | BaseResponse;

const getUserApiInstance = new HTTP("api/v2/user");

export default class GetUserApi extends BaseAPI {
  getById(id: number) {
    return getUserApiInstance.get<GetUserResponse>(`/${id}`);
  }

  searchUsers(params: SearchUsersParams) {
    return getUserApiInstance.post<SearchUsersResponse>("/user/search", {
      data: params,
    });
  }
}
