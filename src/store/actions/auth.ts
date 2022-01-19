import { User } from "../../api/types";
import { createAction } from "../../storeLib/storeLib";

export const logout = createAction("STORE/LOGOUT", () => null);
export const currentUserReceive = createAction(
  "USER_RECEIVE",
  (user: User) => user
);

export type AuthAction =
  | ReturnType<typeof logout>
  | ReturnType<typeof currentUserReceive>
