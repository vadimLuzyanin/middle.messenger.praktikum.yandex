import { User } from "../../api/types";
import {
  currentUserReceive,
  loginError,
  logout,
  registerError,
} from "../actions/auth";
import { AppAction } from "../types";

type UserState = User | null;

export function user(state: UserState = null, action: AppAction) {
  switch (action.type) {
    case currentUserReceive.type: {
      const user = action.payload;
      if (user.avatar) {
        user.avatar = `https://ya-praktikum.tech/api/v2/resources${user.avatar}`;
      }
      return user;
    }
    case logout.type: {
      return null;
    }
    default: {
      return state;
    }
  }
}

export function authError(state: string = "", action: AppAction) {
  switch (action.type) {
    case loginError.type:
    case registerError.type: {
      return action.payload;
    }
    case currentUserReceive.type: {
      return "";
    }
    default: {
      return state;
    }
  }
}

type LoggedInState = boolean;

export function isLoggedIn(state: LoggedInState = false, action: AppAction) {
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
  authError: string;
};