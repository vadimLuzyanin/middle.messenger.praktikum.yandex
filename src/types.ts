import { ScreensPathnames } from "./constants";
import {
  LoginScreen,
  MainScreen,
  RegisterScreen,
  Screen404,
  Screen500,
  SettingsScreen,
} from "./screens";

export type NativeListenersMap = Partial<{
  [T in keyof HTMLElementEventMap]: (e: HTMLElementEventMap[T]) => void;
}>;

export type ListenersMap = {
  onClick?: (e: MouseEvent) => void;
  onInput?: (e: Event & { target: HTMLInputElement }) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
};
export type BlockProps = ListenersMap;

export type TemplateContext = object;
export type TemplateFn<T> = (context: T) => string;

export type InputValidation = {
  regexp: RegExp;
  errorMessage: string;
};

export type ScreenComponentType =
  | MainScreen
  | LoginScreen
  | RegisterScreen
  | SettingsScreen
  | Screen404
  | Screen500;

export type ScreenComponentClassType = {
  new (): ScreenComponentType;
};

export type ValidRouterPathname = ScreensPathnames | "*";
