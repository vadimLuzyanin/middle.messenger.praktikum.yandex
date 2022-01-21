import HTTP from "./Fetch";
import { BaseResponse, Chat, User } from "./types";

export type GetChatsParams = {
  offset?: number;
  limit?: number;
  title?: string;
};

type GetChatsResponse = Chat[];

export type CreateChatParams = {
  title: string;
};

type CreateChatResponse = BaseResponse;

export type AddUsersParams = {
  users: number[];
  chatId: number;
};

type AddUsersResponse = BaseResponse;

export type DeleteUsersParams = {
  users: number[];
  chatId: number;
};

type DeleteUsersResponse = BaseResponse;

export type GetChatUsersParams = {
  id: number;
  offset?: string;
  limit?: number;
  name?: string;
  email?: string;
};

type GetChatUsersResponse = User[];

export type GetChatTokenParams = {
  id: number;
};

type GetChatTokenResponse = {
  token: string;
};

export type GetOldMessagesCountParams = {
  id: number;
};

type GetOldMessagesCountResponse = {
  unread_count: number;
};

const chatAPIInstance = new HTTP("api/v2/chats");

export class ChatApi {
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

  getChatUsers(params: GetChatUsersParams) {
    const { id, ...rest } = params;
    return chatAPIInstance.get<GetChatUsersResponse>(`/${id}/users`, {
      data: rest,
    });
  }

  getChatToken(params: GetChatTokenParams) {
    const { id } = params;
    return chatAPIInstance.post<GetChatTokenResponse>(`/token/${id}`);
  }

  getOldMessagesCount(params: GetOldMessagesCountParams) {
    const { id } = params;
    return chatAPIInstance.get<GetOldMessagesCountResponse>(`/new/${id}`);
  }
}
