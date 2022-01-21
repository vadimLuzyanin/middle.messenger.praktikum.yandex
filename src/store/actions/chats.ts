import { Chat } from "../../api/types";
import { createAction } from "../../storeLib/storeLib";

export const chatListReceive = createAction(
  "CHAT_LIST_RECEIVE",
  (chatList: Chat[]) => chatList
);

export type ChatsAction =
  | ReturnType<typeof chatListReceive>
