import { renderErrorModal } from "../../components";
import { errorInController } from "../actions";
import { AppAction } from "../types";

type Errors = Error[];

export function errors(state: Errors = [], action: AppAction) {
  switch (action.type) {
    case errorInController.type: {
      const { error, message = "Произошла непредвиденная ошибка" } =
        action.payload;

      renderErrorModal(message);
      // eslint-disable-next-line no-console
      console.log("error", error);
      return [...state, error];
    }
    default: {
      return state;
    }
  }
}

export type ErrorsState = {
  errors: Errors;
};
