import BaseAPI from "./baseApi";
import HTTP from "./Fetch";
import { BaseResponse, Chat } from "./types";

type GetChatsParams = {
  offset?: number;
  limit?: number;
  title?: string;
};

type GetChatsResponse = Chat[] | BaseResponse;

type CreateChatParams = {
  title: string;
};

type CreateChatResponse = BaseResponse;

type AddUsersParams = {
  users: number[];
  chatId: number;
};

type AddUsersResponse = BaseResponse;

type DeleteUsersParams = {
  users: number[];
  chatId: number;
};

type DeleteUsersResponse = BaseResponse;

const chatAPIInstance = new HTTP("api/v2/chats");

export default class ChatApi extends BaseAPI {
  getChats(params?: GetChatsParams) {
    return chatAPIInstance.get<GetChatsResponse>("/", {
      data: params,
    });
  }

  createChat(params: CreateChatParams) {
    return chatAPIInstance.post<CreateChatResponse>("/", { data: params });
  }

  addUsers(params: AddUsersParams) {
    return chatAPIInstance.put<AddUsersResponse>("/users", {
      data: params,
    });
  }

  deleteUsers(params: DeleteUsersParams) {
    return chatAPIInstance.delete<DeleteUsersResponse>("/users", {
      data: params,
    });
  }
}
