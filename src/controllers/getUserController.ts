/* eslint-disable no-console */
import { ErrorResponse, GetUserApi, SearchUsersParams } from "../api";

const getUserApi = new GetUserApi();

class GetUserController {
  async searchUsers(params: SearchUsersParams) {
    try {
      const result = await getUserApi.searchUsers(params);
      return result;
    } catch (e) {
      return (e as ErrorResponse).reason;
    }
  }
}

export default new GetUserController();
