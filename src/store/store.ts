import { createStore } from "../storeLib/storeLib";
import { appInitialState, appReducer, AppState } from "./reducers";
import { AppAction } from "./types";

const store = createStore<AppState, Pick<AppAction, "type">["type"]>(
  appReducer,
  appInitialState
);

export default store;
