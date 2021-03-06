import { Button, Input, Popup } from "../../../components";
import Component from "../../../component";
import validations from "../../../validations";
import tmpl from "./editPassword.hbs";
import cn from "../settings.module.scss";
import { extractFormValues, getIsFormInvalid } from "../../../utils";
import { userSettingsController } from "../../../controllers";

type InnerProps = {
  oldPasswordInput: Input;
  newPasswordInput: Input;
  newPasswordAgainInput: Input;
  saveButton: Button;
  incorrectPopup: Popup;
};

type Props = {
  onSaveClick: () => void;
};

type State = {
  formValues: {
    oldPassword: { value: string; notValid: boolean };
    newPassword: { value: string; notValid: boolean };
    newPasswordAgain: { value: string; notValid: boolean };
  };
  disableSubmit: boolean;
};

export default class EditPassword extends Component<Props, State, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.setState({
      formValues: {
        oldPassword: { value: "", notValid: true },
        newPassword: { value: "", notValid: true },
        newPasswordAgain: { value: "", notValid: true },
      },
      disableSubmit: true,
    });

    this.innerProps.oldPasswordInput = new Input({
      placeholder: "Старый пароль",
      name: "oldPassword",
      type: "password",
      validation: validations.password,
      value: this.state.formValues.oldPassword.value,
      handleInput: () => {
        const { value, notValid } = this.props.oldPasswordInput.state;
        this.setFormValue("oldPassword", value, notValid);
        this.props.oldPasswordInput.focus();
      },
    });
    this.innerProps.newPasswordInput = new Input({
      placeholder: "Новый пароль",
      name: "newPassword",
      type: "password",
      validation: validations.password,
      value: this.state.formValues.newPassword.value,
      handleInput: () => {
        const { value, notValid } = this.props.newPasswordInput.state;
        this.setFormValue("newPassword", value, notValid);
        this.props.newPasswordInput.focus();
      },
    });
    this.innerProps.newPasswordAgainInput = new Input({
      placeholder: "Повторите новый пароль",
      name: "newPassword",
      type: "password",
      validation: validations.passwordAgain,
      value: this.state.formValues.newPasswordAgain.value,

      getIsNotValid: (value: string) => {
        return value !== this.state.formValues.newPassword.value;
      },

      handleInput: () => {
        const { value, notValid } = this.props.newPasswordAgainInput.state;
        this.setFormValue("newPasswordAgain", value, notValid);
        this.props.newPasswordAgainInput.focus();
      },
    });

    this.innerProps.incorrectPopup = new Popup({
      rootElement: document.documentElement,
      text: "Неверный пароль",
      indent: 15,
      hidden: true,
      warn: true,
    });

    this.innerProps.saveButton = new Button({
      text: "Сохранить",
      type: "primary",
      name: "save",
      getDisabled: () => !!this.state.disableSubmit,
      onClick: () => {
        if (!getIsFormInvalid(this.state.formValues)) {
          userSettingsController
            .changePassword(extractFormValues(this.state.formValues))
            .then((res) => {
              if (res === true) {
                this.props.onSaveClick();
              } else {
                this.renderIncorrectPopup();
              }
            });
        }
      },
    });
  }

  renderIncorrectPopup() {
    this.props.incorrectPopup.outerProps.rootElement =
      this.props.saveButton.element!;
    this.props.incorrectPopup.show();
    setTimeout(() => {
      this.props.incorrectPopup.hide();
    }, 5000);
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
