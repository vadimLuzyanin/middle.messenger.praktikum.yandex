import { Chat } from "../../api";
import { createAction } from "../../storeLib";

export const chatListReceive = createAction(
  "CHAT_LIST_RECEIVE",
  (chatList: Chat[]) => chatList
);

export type ChatsAction =
  | ReturnType<typeof chatListReceive>
