import {
  AuthAction,
  ChatsAction,
  ChatUsersAction,
  MessagesAction,
  PathnameAction,
} from "./actions";

export type AppAction =
  | AuthAction
  | ChatsAction
  | ChatUsersAction
  | PathnameAction
  | MessagesAction
  | { type: "@@INIT" };
