import Component from "../../component";
import { InputValidation } from "../../types";
import tmpl from "./input.hbs";
import * as cn from "./input.module.scss";

type Props = {
  placeholder: string;
  handleInput?: (e: Event & { target: HTMLInputElement }) => void;
  handleFocus?: (e: FocusEvent) => void;
  handleBlur?: (e: FocusEvent) => void;
  type?: string;
  name?: string;
  validation?: InputValidation;
  value?: string;
  getIsNotValid?: (value: string) => boolean;
};

type State = {
  notValid: boolean;
  value: string;
  fixPlaceholder: boolean;
  errorMessage: string;
  selectionRange: { selectionStart: number; selectionEnd: number };
};

export default class Input extends Component<Props, State> {
  eventTargetSelector = "input";

  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    const { errorMessage } = this.props.validation || { errorMessage: "" };

    this.state = {
      notValid: false,
      value: this.props.value || "",
      fixPlaceholder: false,
      errorMessage,
      selectionRange: {
        selectionStart: this.props.value?.length || 1,
        selectionEnd: this.props.value?.length || 1,
      },
    };

    this.innerProps.onInput = (e) => {
      const selectionStart =
        this.getInputElement()?.selectionStart || e.target.value.length;
      const selectionEnd =
        this.getInputElement()?.selectionEnd || e.target.value.length;
      const fixPlaceholder =
        e.target.value.length === 0 && document.activeElement === e.target;

      this.setState((prev) => ({
        ...prev,
        value: e.target.value,
        fixPlaceholder,
        selectionRange: {
          selectionStart,
          selectionEnd,
        },
      }));

      this.focus();

      if (this.props.handleInput) {
        this.props.handleInput(e);
        this.focus();
      }
    };

    this.innerProps.onFocus = (e) => {
      const notValid = this.getNotValid();

      this.setState((prev) => ({
        ...prev,
        notValid,
        errorMessage,
      }));
      this.getInputElement()?.focus();

      if (this.props.handleFocus) {
        this.props.handleFocus(e);
      }
    };

    this.innerProps.onBlur = (e) => {
      this.getPlaceholderElement()?.classList.remove(cn.fixPlaceholder);

      const notValid = this.getNotValid();

      this.setState((prev) => ({
        ...prev,
        notValid,
        errorMessage,
      }));

      if (this.props.handleBlur) {
        this.props.handleBlur(e);
      }
    };
  }

  focus() {
    const input = this.getInputElement();
    if (input) {
      input.focus();
      const { selectionStart, selectionEnd } = this.state.selectionRange;
      const savedType = input.type;
      input.type = "text";
      input.setSelectionRange(selectionStart, selectionEnd);
      input.type = savedType
    }
  }

  componentDidUpdate() {
    const inputElement = this.getInputElement();
    if (inputElement) {
      inputElement.value = this.state.value;
    }
  }

  getInputElement() {
    const root = this.element;
    return root?.querySelector("input");
  }

  getNotValid() {
    const { regexp } = this.props.validation || { regexp: null };
    const { getIsNotValid } = this.props;

    if (getIsNotValid) {
      return getIsNotValid(this.state.value);
    }
    return !!regexp && !regexp.test(this.state.value);
  }

  getPlaceholderElement() {
    return this.element?.querySelector(`.${cn.placeholder}`);
  }
}
