/* eslint-disable no-console */

import {
  AddUsersParams,
  ChatApi,
  CreateChatParams,
  DeleteUsersParams,
  GetChatsParams,
  GetChatTokenParams,
  GetChatUsersParams,
  GetOldMessagesCountParams,
} from "../api";
import { store, chatListReceive, chatUsersReceive } from "../store";
// eslint-disable-next-line import/no-cycle
import WSController from "./WSController";

const chatsApi = new ChatApi();

class ChatsController {
  async fetchChats(params?: GetChatsParams) {
    try {
      const chats = await chatsApi.getChats(params);
      store.dispatch(chatListReceive(chats));
      for (const { id } of chats) {
        // eslint-disable-next-line no-await-in-loop
        await this.getChatUsers({ id, limit: Number.MAX_SAFE_INTEGER });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async addUsers(params: AddUsersParams) {
    try {
      await chatsApi.addUsers(params);
      await this.fetchChats();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUsers(params: DeleteUsersParams) {
    try {
      await chatsApi.deleteUsers(params);
      await this.fetchChats();
    } catch (e) {
      console.log(e);
    }
  }

  async createChat(params: CreateChatParams) {
    try {
      await chatsApi.createChat(params);
      await this.fetchChats();
      await WSController.requestOldMessagesAndSubscribeToNew();
    } catch (e) {
      console.log(e);
    }
  }

  async getChatUsers(params: GetChatUsersParams) {
    try {
      const users = await chatsApi.getChatUsers(params);
      store.dispatch(chatUsersReceive({ users, chatId: params.id }));
    } catch (e) {
      console.log(e);
    }
  }

  async getChatToken(params: GetChatTokenParams) {
    try {
      const { token } = await chatsApi.getChatToken(params);
      return token;
    } catch (e) {
      return null;
    }
  }

  async getOldMessagesCount(params: GetOldMessagesCountParams) {
    try {
      const count = await chatsApi.getOldMessagesCount(params);
      return count;
    } catch (e) {
      console.log(e);
      return { unread_count: 0 };
    }
  }
}

export default new ChatsController();
