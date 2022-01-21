import { Button, Input } from "../../components";
import tmpl from "./register.hbs";
import * as cn from "./auth.module.scss";
import validations from "../../validations";
import Component from "../../component";
import { extractFormValues, getIsFormInvalid } from "../../utils";
import { gotoRoute } from "../../router";
import { ScreensPathnames } from "../../constants";
import authController from "../../controllers/authController";
import { AppState } from "../../store/reducers";

type InnerProps = {
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
  authError: string;
};

function mapStoreToState(store: AppState) {
  return {
    authError: store.authError,
  };
}

export default class RegisterScreen extends Component<{}, State, InnerProps> {
  cn = cn;

  constructor() {
    super(tmpl, {}, mapStoreToState);

    this.setState({
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
    });

    this.innerProps.loginBtn = new Button({
      text: "Войти",
      type: "secondary",
      onClick: () => {
        gotoRoute(ScreensPathnames.login);
      },
    });
    this.innerProps.registerBtn = new Button({
      text: "Зарегистрироваться",
      type: "primary",
      getDisabled: () => !!this.state.disableSubmit,
      onClick: () => {
        if (!getIsFormInvalid(this.state.formValues)) {
          const params = extractFormValues(this.state.formValues);
          authController.register(params).then(() => {
            this.setState({ authError: "" });
          });
        }
      },
    });
    this.innerProps.loginInput = new Input({
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
    this.innerProps.passwordInput = new Input({
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
    this.innerProps.emailInput = new Input({
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
    this.innerProps.firstNameInput = new Input({
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
    this.innerProps.secondNameInput = new Input({
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
    this.innerProps.phoneInput = new Input({
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
    this.innerProps.passwordInput = new Input({
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
    this.innerProps.passwordAgainInput = new Input({
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

  componentDidUpdate(_: InnerProps, prevState: State) {
    if (this.state.authError && !prevState.authError) {
      this.props.emailInput.setState({
        errorMessage: this.state.authError,
        notValid: true,
      });
    }
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
      disableSubmit: getIsFormInvalid(prev.formValues),
    }));
  }
}
