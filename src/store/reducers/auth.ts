import { User } from "../../api/types";
import { combineReducers } from "../../storeLib/storeLib";
import { currentUserReceive, logout } from "../actions/auth";
import { AppAction } from "../types";

type UserState = User | null;

function user(state: UserState = null, action: AppAction) {
  switch (action.type) {
    case currentUserReceive.type: {
      return action.payload;
    }
    case logout.type: {
      return null;
    }
    default: {
      return state;
    }
  }
}

type LoggedInState = boolean;

function isLoggedIn(state: LoggedInState = false, action: AppAction) {
  switch (action.type) {
    case currentUserReceive.type: {
      return true;
    }
    case logout.type: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export type AuthState = {
  user: UserState;
  isLoggedIn: LoggedInState;
};

const result = combineReducers<AuthState, Pick<AppAction, "type">["type"]>({
  user,
  isLoggedIn,
});

export const authReducer = result.reducer;
export const authIniitalState = result.initialState;
