import { createAction } from "../../storeLib";

type Payload = {
  error: Error;
  message?: string;
};

export const errorInController = createAction(
  "ERROR_IN_CONTROLLER",
  (payload: Payload) => payload
);

export type ErrorAction = ReturnType<typeof errorInController>;
