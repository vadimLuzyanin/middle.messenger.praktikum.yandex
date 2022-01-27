import { oldMessagesReceive, newMessagesReceive } from "../actions";
import { ChatMessage } from "../../api";

import { AppAction } from "../types";

type State = { [key: number]: ChatMessage[] };

export function messages(state: State = {}, action: AppAction) {
  switch (action.type) {
    case oldMessagesReceive.type: {
      const { chatId, messages } = action.payload;
      const result = [...(state[chatId] || []), ...messages];
      const sorted = result.sort((a, b) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      });
      return { ...state, [chatId]: sorted };
    }
    case newMessagesReceive.type: {
      const { chatId, message } = action.payload;
      return { ...state, [chatId]: [...(state[chatId] || []), message] };
    }
    default: {
      return state;
    }
  }
}

export type MessagesState = {
  messages: State;
};
