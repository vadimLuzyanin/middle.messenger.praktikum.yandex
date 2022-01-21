import { combineReducers } from "../../storeLib/storeLib";
import type { AppAction } from "../types";
import { authError, isLoggedIn, user, AuthState } from "./auth";
import { messages, MessagesState } from "./chatMessages";
// eslint-disable-next-line import/no-cycle
import { chats, ChatsState } from "./chats";
import { chatUsers, ChatUsersState } from "./chatUsers";
import { PathnameState, pathname } from "./pathname";

export type AppState = AuthState &
  ChatsState &
  ChatUsersState &
  PathnameState &
  MessagesState;

const result = combineReducers<AppState, Pick<AppAction, "type">["type"]>({
  authError,
  isLoggedIn,
  user,
  chats,
  chatUsers,
  pathname,
  messages,
});

export const appReducer = result.reducer;
export const appInitialState = result.initialState;
