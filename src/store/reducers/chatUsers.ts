import { User } from "../../api";
import { chatUsersReceive } from "../actions";
import { AppAction } from "../types";

type ChatUsers = { [k: number]: User[] };

export function chatUsers(state: ChatUsers = {}, action: AppAction) {
  switch (action.type) {
    case chatUsersReceive.type: {
      const { chatId, users } = action.payload;
      return { ...state, [chatId]: users };
    }
    default: {
      return state;
    }
  }
}

export type ChatUsersState = {
  chatUsers: ChatUsers;
};
