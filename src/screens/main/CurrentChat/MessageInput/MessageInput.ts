import Component from "../../../../component";
import * as cn from "./messageInput.module.scss";
import tmpl from "./messageInput.hbs";
import validations from "../../../../validations";

type State = {
  notValid: boolean;
  value: string;
  selectionRange: {
    selectionStart: number;
    selectionEnd: number;
  };
};
export default class MessageInput extends Component<{}, State> {
  cn = cn;

  eventTargetSelector = "input";

  sendListener?: () => void;

  constructor() {
    super(tmpl);

    this.state = {
      notValid: true,
      value: "",
      selectionRange: {
        selectionStart: 1,
        selectionEnd: 1,
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
    };

    this.innerProps.onFocus = () => {
      const notValid = this.getNotValid();

      this.setState((prev) => ({
        ...prev,
        notValid,
      }));
      this.getInputElement()?.focus();
    };

    this.innerProps.onBlur = () => {
      const notValid = this.getNotValid();

      this.setState((prev) => ({
        ...prev,
        notValid,
      }));
    };
  }

  focus() {
    const input = this.getInputElement();
    if (input) {
      input.focus();
      const { selectionStart, selectionEnd } = this.state.selectionRange;
      input.setSelectionRange(selectionStart, selectionEnd);
    }
  }

  removeListeners() {
    const sendButton = this.getSendButton();
    if (!sendButton) return;
    if (this.sendListener) {
      sendButton.removeEventListener("click", this.sendListener);
    }
  }

  addListeners() {
    const sendButton = this.getSendButton();
    if (!sendButton) return;
    this.sendListener = () => {
      if (!this.getNotValid()) {
        // eslint-disable-next-line no-console
        console.log(this.state.value);
      }
    };
    sendButton.addEventListener("click", this.sendListener);
  }

  componentDidMount() {
    this.removeListeners();
    this.addListeners();
  }

  componentDidUpdate() {
    this.removeListeners();
    this.addListeners();

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
    const { regexp } = validations.message!;
    return !regexp.test(this.state.value);
  }

  getSendButton() {
    return this.element?.querySelector(`.${cn.sendButton}`);
  }

  getAttachButton() {
    return this.element?.querySelector(`.${cn.attachButton}`);
  }
}
