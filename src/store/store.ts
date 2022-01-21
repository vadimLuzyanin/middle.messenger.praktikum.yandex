import { createStore } from "../storeLib/storeLib";
// eslint-disable-next-line import/no-cycle
import { appInitialState, appReducer, AppState } from "./reducers";
import type { AppAction } from "./types";

const store = createStore<AppState, Pick<AppAction, "type">["type"]>(
  appReducer,
  appInitialState
);

export default store;
