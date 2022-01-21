import { Chat } from "../../api";
import { chatListReceive, newMessagesReceive } from "../actions";
// eslint-disable-next-line import/no-cycle
import store from "../store";
import { AppAction } from "../types";

export function chats(state: Chat[] = [], action: AppAction) {
  switch (action.type) {
    case newMessagesReceive.type: {
      const { chatId, message } = action.payload;
      const updatedChat = state.find(({ id }) => id === chatId)!;
      const updatedChatIdx = state.findIndex(({ id }) => id === chatId)!;
      const { content, user_id, time, id } = message;
      const user = store
        .getState()
        .chatUsers[chatId]?.find(({ id }) => id === user_id)!;
      const newLastMessage = {
        content,
        time,
        user,
        id,
      };

      if (newLastMessage.user.avatar) {
        newLastMessage.user.avatar = `https://ya-praktikum.tech/api/v2/resources${newLastMessage.user.avatar}`;
      }

      updatedChat.last_message = newLastMessage;
      const result = [...state];
      result[updatedChatIdx] = updatedChat;
      return result;
    }
    case chatListReceive.type: {
      const chats = action.payload;
      const chatsWithAvatars: Chat[] = chats.map((c) => {
        const { last_message, ...rest } = c;
        if (last_message?.user.avatar) {
          last_message.user.avatar = `https://ya-praktikum.tech/api/v2/resources${last_message.user.avatar}`;
        }
        return { ...rest, last_message };
      });
      return chatsWithAvatars;
    }
    default: {
      return state;
    }
  }
}

export type ChatsState = {
  chats: Chat[];
};
