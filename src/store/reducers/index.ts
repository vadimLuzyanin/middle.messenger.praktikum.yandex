import { combineReducers } from "../../storeLib/storeLib";
import { AppAction } from "../types";
import { authError, isLoggedIn, user, AuthState } from "./auth";
import { chats, ChatsState } from "./chats";
import { chatUsers, ChatUsersState } from "./chatUsers";
import { PathnameState, pathname } from "./pathname";

export type AppState = AuthState & ChatsState & ChatUsersState & PathnameState;

const result = combineReducers<AppState, Pick<AppAction, "type">["type"]>({
  authError,
  isLoggedIn,
  user,
  chats,
  chatUsers,
  pathname,
});

export const appReducer = result.reducer;
export const appInitialState = result.initialState;
