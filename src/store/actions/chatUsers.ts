import { User } from "../../api/types";
import { createAction } from "../../storeLib/storeLib";

type ChatUsersReceivePayload = {
  chatId: number;
  users: User[];
};

export const chatUsersReceive = createAction(
  "CHAT_USERS_RECEIVE",
  (payload: ChatUsersReceivePayload) => payload
);

export type ChatUsersAction = ReturnType<typeof chatUsersReceive>;
