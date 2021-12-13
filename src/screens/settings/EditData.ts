import { Button, Input } from "../../components";
import Component from "../../component";
import validations from "../../validations";
import tmpl from "./editData.hbs";
import * as cn from "./settings.module.scss";

type InnerProps = {
  emailInput: Input;
  loginInput: Input;
  firstNameInput: Input;
  secondNameInput: Input;
  displayNameInput: Input;
  phoneInput: Input;
  saveButton: Button;
};

type Props = {
  onSaveClick: () => void;
};

type State = {
  formValues: {
    email: { value: string; notValid: boolean };
    login: { value: string; notValid: boolean };
    first_name: { value: string; notValid: boolean };
    second_name: { value: string; notValid: boolean };
    display_name: { value: string; notValid: boolean };
    phone: { value: string; notValid: boolean };
  };
  disableSubmit: boolean;
};

export default class EditData extends Component<Props, State, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.state = {
      formValues: {
        email: { value: "", notValid: true },
        login: { value: "", notValid: true },
        first_name: { value: "", notValid: true },
        second_name: { value: "", notValid: true },
        display_name: { value: "", notValid: true },
        phone: { value: "", notValid: true },
      },
      disableSubmit: true,
    };

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
    this.innerProps.displayNameInput = new Input({
      placeholder: "Имя в чате",
      type: "text",
      name: "display_name",
      value: this.state.formValues.second_name.value,
      handleInput: () => {
        const { value } = this.props.secondNameInput.state;
        this.setFormValue("second_name", value, false);
        this.props.displayNameInput.focus();
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

    this.innerProps.saveButton = new Button({
      text: "Сохранить",
      type: "primary",
      name: "save",
      getDisabled: () => !!this.state.disableSubmit,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(this.state.formValues);
        this.props.onSaveClick();
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
