import { Button, Input } from "../../components";
import tmpl from "./register.hbs";
import * as cn from "./auth.module.scss";
import validations from "../../validations";
import Component from "../../component";
import { pushPathname } from "../../index";

type Props = {
  loginBtn: Button;
  registerBtn: Button;
  emailInput: Input;
  loginInput: Input;
  firstNameInput: Input;
  secondNameInput: Input;
  phoneInput: Input;
  passwordInput: Input;
  passwordAgainInput: Input;
};

type State = {
  formValues: {
    email: { value: string; notValid: boolean };
    login: { value: string; notValid: boolean };
    first_name: { value: string; notValid: boolean };
    second_name: { value: string; notValid: boolean };
    phone: { value: string; notValid: boolean };
    password: { value: string; notValid: boolean };
    password_again: { value: string; notValid: boolean };
  };
  disableSubmit: boolean;
};

export default class RegisterScreen extends Component<Props, State> {
  cn = cn;

  constructor() {
    super(tmpl);

    this.state = {
      formValues: {
        email: { value: "", notValid: true },
        login: { value: "", notValid: true },
        first_name: { value: "", notValid: true },
        second_name: { value: "", notValid: true },
        phone: { value: "", notValid: true },
        password: { value: "", notValid: true },
        password_again: { value: "", notValid: true },
      },
      disableSubmit: true,
    };

    this.props.loginBtn = new Button({
      text: "Войти",
      type: "secondary",
      onClick: () => {
        pushPathname("/login");
      },
    });
    this.props.registerBtn = new Button({
      text: "Зарегистрироваться",
      type: "primary",
      getDisabled: () => !!this.state.disableSubmit,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(this.state.formValues);
        pushPathname("/");
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
    this.props.emailInput = new Input({
      placeholder: "Почта",
      type: "email",
      name: "email",
      validation: validations.email,
      value: this.state.formValues.email.value,
      handleInput: () => {
        const { value, notValid } = this.props.emailInput.state;
        this.setFormValue("email", value, notValid);
        this.props.emailInput.focus();
      },
    });
    this.props.firstNameInput = new Input({
      placeholder: "Имя",
      type: "text",
      name: "first_name",
      validation: validations.firstName,
      value: this.state.formValues.first_name.value,
      handleInput: () => {
        const { value, notValid } = this.props.firstNameInput.state;
        this.setFormValue("first_name", value, notValid);
        this.props.firstNameInput.focus();
      },
    });
    this.props.secondNameInput = new Input({
      placeholder: "Фамилия",
      type: "text",
      name: "second_name",
      validation: validations.secondName,
      value: this.state.formValues.second_name.value,
      handleInput: () => {
        const { value, notValid } = this.props.secondNameInput.state;
        this.setFormValue("second_name", value, notValid);
        this.props.secondNameInput.focus();
      },
    });
    this.props.phoneInput = new Input({
      placeholder: "Телефон",
      type: "tel",
      name: "phone",
      validation: validations.phone,
      value: this.state.formValues.phone.value,
      handleInput: () => {
        const { value, notValid } = this.props.phoneInput.state;
        this.setFormValue("phone", value, notValid);
        this.props.phoneInput.focus();
      },
    });
    this.props.passwordInput = new Input({
      placeholder: "Пароль",
      type: "password",
      name: "password",
      validation: validations.password,
      value: this.state.formValues.password.value,
      handleInput: () => {
        const { value, notValid } = this.props.passwordInput.state;
        this.setFormValue("password", value, notValid);
        this.props.passwordInput.focus();
      },
    });
    this.props.passwordAgainInput = new Input({
      placeholder: "Пароль (ещё раз)",
      type: "password",
      name: "password",
      validation: validations.passwordAgain,
      value: this.state.formValues.password_again.value,

      getIsNotValid: (value: string) => {
        return value !== this.state.formValues.password.value;
      },

      handleInput: () => {
        const { value, notValid } = this.props.passwordAgainInput.state;
        this.setFormValue("password_again", value, notValid);
        this.props.passwordAgainInput.focus();
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
    this.setState((prev) => ({
      ...prev,
      disableSubmit: this.getSendDisabled(),
    }));
  }
}
