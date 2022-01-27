import { ChatMessage } from "../../api";
import { createAction } from "../../storeLib";

type OldMessagesReceivedPayload = {
  messages: ChatMessage[];
  chatId: number;
};

type NewMessagesReceivedPayload = {
  message: ChatMessage;
  chatId: number;
};

export const oldMessagesReceive = createAction(
  "OLD_MESSAGES_RECEIVE",
  (payload: OldMessagesReceivedPayload) => payload
);

export const newMessagesReceive = createAction(
  "NEW_MESSAGES_RECEIVE",
  (payload: NewMessagesReceivedPayload) => payload
);

export type MessagesAction =
  | ReturnType<typeof oldMessagesReceive>
  | ReturnType<typeof newMessagesReceive>;
