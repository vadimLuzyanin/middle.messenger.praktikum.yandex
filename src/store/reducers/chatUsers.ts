import { User } from "../../api/types";
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

// const result = combineReducers<ChatUsersState, Pick<AppAction, "type">["type"]>(
//   {
//     chatUsers,
//   }
// );

// export const chatUsersReducer = result.reducer;
// export const chatUsersIniitalState = result.initialState;
