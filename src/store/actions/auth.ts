import { User } from "../../api/types";
import { createAction } from "../../storeLib/storeLib";

export const logout = createAction("LOGOUT", () => null);
export const currentUserReceive = createAction(
  "USER_RECEIVE",
  (user: User) => user
);
export const loginError = createAction(
  "LOGIN_ERROR",
  (message: string) => message
);

export const registerError = createAction(
  "REGISTER_ERROR",
  (message: string) => message
);

export type AuthAction =
  | ReturnType<typeof logout>
  | ReturnType<typeof currentUserReceive>
  | ReturnType<typeof loginError>
  | ReturnType<typeof registerError>;
