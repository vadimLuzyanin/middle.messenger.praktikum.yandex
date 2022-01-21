import { AuthAction, ChatsAction, ChatUsersAction } from "./actions";
import { PathnameAction } from "./actions/pathname";

export type AppAction =
  | AuthAction
  | ChatsAction
  | ChatUsersAction
  | PathnameAction
  | { type: "@@INIT" };
