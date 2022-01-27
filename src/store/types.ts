import {
  AuthAction,
  ChatsAction,
  ChatUsersAction,
  MessagesAction,
  PathnameAction,
  ErrorAction,
} from "./actions";

export type AppAction =
  | AuthAction
  | ChatsAction
  | ChatUsersAction
  | PathnameAction
  | MessagesAction
  | ErrorAction
  | { type: "@@INIT" };
