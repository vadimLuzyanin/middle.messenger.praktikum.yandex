import { createAction } from "../../storeLib";

export const pathnameChange = createAction(
  "PATHNAME_CHANGE",
  (message: string) => message
);

export type PathnameAction = ReturnType<typeof pathnameChange>;
