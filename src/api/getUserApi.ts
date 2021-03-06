import HTTP from "./Fetch";
import { User } from "./types";

type GetUserResponse = User;

export type SearchUsersParams = { login: string };
type SearchUsersResponse = User[];

const getUserApiInstance = new HTTP("api/v2/user");

export class GetUserApi {
  getById(id: number) {
    return getUserApiInstance.get<GetUserResponse>(`/${id}`);
  }

  searchUsers(params: SearchUsersParams) {
    return getUserApiInstance.post<SearchUsersResponse>("/search", {
      data: params,
    });
  }
}
