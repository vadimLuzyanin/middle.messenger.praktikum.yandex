import { Button, Input } from "../../components";
import tmpl from "./login.hbs";
import * as cn from "./auth.module.scss";
import validations from "../../validations";
import Component from "../../component";
import { extractFormValues, getIsFormInvalid } from "../../utils";
import { gotoRoute } from "../../router";
import { ScreensPathnames } from "../../constants";
import { authController } from "../../controllers";
import { AppState } from "../../store";

type InnerProps = {
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
  authError?: string;
};

function mapStoreToState(store: AppState) {
  return {
    authError: store.authError,
  };
}

export default class LoginScreen extends Component<{}, State, InnerProps> {
  cn = cn;

  constructor() {
    super(tmpl, {}, mapStoreToState);

    this.setState({
      formValues: {
        login: { value: "", notValid: true },
        password: { value: "", notValid: true },
      },
      disableSubmit: true,
    });

    this.innerProps.loginBtn = new Button({
      text: "Войти",
      type: "primary",
      getDisabled: () => !!this.state.disableSubmit,
      onClick: () => {
        if (!getIsFormInvalid(this.state.formValues)) {
          const params = extractFormValues(this.state.formValues);
          authController
            .login(params)
            .then(() => this.setState({ authError: "" }));
        }
      },
    });
    this.innerProps.registerBtn = new Button({
      text: "Нет аккаунта?",
      type: "secondary",
      onClick: () => {
        gotoRoute(ScreensPathnames.Register);
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
  }

  componentDidUpdate(_: InnerProps, prevState: State) {
    if (this.state.authError && !prevState.authError) {
      this.props.loginInput.setState({
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
