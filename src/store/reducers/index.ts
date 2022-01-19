import { combineReducers } from "../../storeLib/storeLib";
import { AppAction } from "../types";
import { authReducer, authIniitalState, AuthState } from "./auth";

export type AppState = { auth: AuthState };

const result = combineReducers<AppState, Pick<AppAction, "type">["type"]>(
  {
    auth: authReducer,
  },
  {
    auth: authIniitalState,
  }
);

export const appReducer = result.reducer;
export const appInitialState = result.initialState;
