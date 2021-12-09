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
    };

    this.props.onInput = (e) => {
      const fixPlaceholder =
        e.target.value.length === 0 && document.activeElement === e.target;

      this.setState((prev) => ({
        ...prev,
        value: e.target.value,
        fixPlaceholder,
      }));

      this.focus();

      if (this.props.handleInput) {
        this.props.handleInput(e);
      }
    };

    this.props.onFocus = (e) => {
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

    this.props.onBlur = (e) => {
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
    this.getInputElement()?.focus();
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
