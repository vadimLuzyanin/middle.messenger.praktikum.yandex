import { Button, Input } from "../../components";
import tmpl from "./login.hbs";
import * as cn from "./auth.module.scss";
import validations from "../../validations";
import Component from "../../component";
import { pushPathname } from "../../index";

type Props = {
  loginBtn: Button;
  registerBtn: Button;
  loginInput: Input;
  passwordInput: Input;
};

type State = {
  formValues: {
    login: { value: string; notValid: boolean };
    password: { value: string; notValid: boolean };
  };
  disableSubmit: boolean;
};

export default class LoginScreen extends Component<Props, State> {
  cn = cn;

  constructor() {
    super(tmpl);

    this.state = {
      formValues: {
        login: { value: "", notValid: true },
        password: { value: "", notValid: true },
      },
      disableSubmit: true,
    };

    this.props.loginBtn = new Button({
      text: "Войти",
      type: "primary",
      getDisabled: () => !!this.state.disableSubmit,
      onClick: () => {
        // eslint-disable-next-line
        console.log(this.state.formValues);
        pushPathname("/");
      },
    });
    this.props.registerBtn = new Button({
      text: "Нет аккаунта?",
      type: "secondary",
      onClick: () => {
        pushPathname("/register");
      },
    });
    this.props.loginInput = new Input({
      type: "text",
      name: "login",
      placeholder: "Логин",
      validation: validations.login,
      value: this.state.formValues.login.value,
      handleInput: () => {
        const { value, notValid } = this.props.loginInput.state;
        this.setFormValue("login", value, notValid);
        this.props.loginInput.focus();
      },
    });
    this.props.passwordInput = new Input({
      type: "password",
      name: "password",
      placeholder: "Пароль",
      validation: validations.password,
      value: this.state.formValues.password.value,
      handleInput: () => {
        const { value, notValid } = this.props.passwordInput.state;
        this.setFormValue("password", value, notValid);
        this.props.passwordInput.focus();
      },
    });
  }

  getSendDisabled() {
    const { formValues } = this.state;
    const disabled = Object.values(formValues)
      .map((i) => i.notValid)
      .some((status) => status === true);
    return disabled;
  }

  setFormValue(
    field: keyof typeof this.state.formValues,
    value: string,
    notValid: boolean
  ) {
    this.setState((prev) => ({
      ...prev,
      formValues: {
        ...prev.formValues,
        [field]: {
          value,
          notValid,
        },
      },
    }));
    this.state.disableSubmit = this.getSendDisabled();
  }
}
