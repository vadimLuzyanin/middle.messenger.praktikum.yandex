import { Chat } from "../../api/types";
import { chatListReceive } from "../actions";
import { AppAction } from "../types";

export function chats(state: Chat[] = [], action: AppAction) {
  switch (action.type) {
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