import { User } from "../../api";
import { createAction } from "../../storeLib";

type ChatUsersReceivePayload = {
  chatId: number;
  users: User[];
};

export const chatUsersReceive = createAction(
  "CHAT_USERS_RECEIVE",
  (payload: ChatUsersReceivePayload) => payload
);

export type ChatUsersAction = ReturnType<typeof chatUsersReceive>;
