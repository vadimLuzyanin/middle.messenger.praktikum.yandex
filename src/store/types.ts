import {
  AuthAction,
  ChatsAction,
  ChatUsersAction,
  MessagesAction,
  PathnameAction,
} from "./actions";
import { ErrorAction } from "./actions/errors";

export type AppAction =
  | AuthAction
  | ChatsAction
  | ChatUsersAction
  | PathnameAction
  | MessagesAction
  | ErrorAction
  | { type: "@@INIT" };
