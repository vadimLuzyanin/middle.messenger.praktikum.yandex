import {
  AddUsersParams,
  ChatApi,
  CreateChatParams,
  DeleteUsersParams,
  GetChatsParams,
  GetChatTokenParams,
  GetChatUsersParams,
} from "../api";
import { store, chatListReceive, chatUsersReceive } from "../store";
import { errorInController } from "../store/actions/errors";
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
      store.dispatch(
        errorInController({
          error: e as Error,
          message: "Произошла ошибка при получении списка чатов",
        })
      );
    }
  }

  async addUsers(params: AddUsersParams) {
    try {
      await chatsApi.addUsers(params);
      await this.fetchChats();
    } catch (e) {
      store.dispatch(
        errorInController({
          error: e as Error,
          message: "Произошла ошибка при добавлении пользователей в чат",
        })
      );
    }
  }

  async deleteUsers(params: DeleteUsersParams) {
    try {
      await chatsApi.deleteUsers(params);
      await this.fetchChats();
    } catch (e) {
      store.dispatch(
        errorInController({
          error: e as Error,
          message: "Произошла ошибка при удалении пользователей из чата",
        })
      );
    }
  }

  async createChat(params: CreateChatParams) {
    try {
      await chatsApi.createChat(params);
      await this.fetchChats();
      await WSController.requestOldMessagesAndSubscribeToNew();
    } catch (e) {
      store.dispatch(
        errorInController({
          error: e as Error,
          message: "Произошла ошибка при создании чата",
        })
      );
    }
  }

  async getChatUsers(params: GetChatUsersParams) {
    try {
      const users = await chatsApi.getChatUsers(params);
      store.dispatch(chatUsersReceive({ users, chatId: params.id }));
    } catch (e) {
      store.dispatch(
        errorInController({
          error: e as Error,
          message: "Произошла ошибка при получении списка пользователей чата",
        })
      );
    }
  }

  async getChatToken(params: GetChatTokenParams) {
    try {
      const { token } = await chatsApi.getChatToken(params);
      return token;
    } catch (e) {
      store.dispatch(
        errorInController({
          error: e as Error,
        })
      );
      return null;
    }
  }
}

export default new ChatsController();
