/* eslint-disable no-console */
import ChatApi, {
  AddUsersParams,
  CreateChatParams,
  DeleteUsersParams,
  GetChatsParams,
  GetChatUsersParams,
} from "../api/chatApi";
import { chatListReceive, chatUsersReceive } from "../store/actions";
import store from "../store/store";

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
}

export default new ChatsController();
