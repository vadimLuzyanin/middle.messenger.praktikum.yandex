/* eslint-disable no-console */
import GetUserApi, { SearchUsersParams } from "../api/getUserApi";
import { ErrorResponse } from "../api/types";

const getUserApi = new GetUserApi();

class GetUserController {
  // eslint-disable-next-line consistent-return
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
