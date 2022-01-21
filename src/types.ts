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
