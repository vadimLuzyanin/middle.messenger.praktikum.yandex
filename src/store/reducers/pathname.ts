import { pathnameChange } from "../actions/pathname";
import { AppAction } from "../types";

export function pathname(
  state: string = window.location.pathname,
  action: AppAction
) {
  switch (action.type) {
    case pathnameChange.type: {
      const newPathname = action.payload;
      return newPathname;
    }
    default: {
      return state;
    }
  }
}

export type PathnameState = {
  pathname: string;
};
