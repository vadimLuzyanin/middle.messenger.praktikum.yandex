import { Button, renderModal } from "../../../components";
import Component from "../../../component";
import tmpl from "./viewSettings.hbs";
import cn from "../settings.module.scss";
import { LogoutModalContent } from "./LogoutModalContent";
import { AppState } from "../../../store";
import { authController } from "../../../controllers";
import { removeModals } from "../../../components/modal";

type InnerProps = {
  changeDataButton: Button;
  changePasswordButton: Button;
  logoutButton: Button;
  saveButton: Button;
  logoutModalContent: LogoutModalContent;
};

type Props = {
  onChangePasswordClick: () => void;
  onChangeDataClick: () => void;
};

type State = {} & Partial<AppState["user"]>;

function mapStoreToState(state: AppState) {
  return { ...state.user };
}

export default class ViewSettings extends Component<Props, State, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props, mapStoreToState);

    this.innerProps.changeDataButton = new Button({
      text: "Изменить данные",
      type: "secondary",
      leftAlign: true,
      onClick: () => {
        this.props.onChangeDataClick();
      },
    });
    this.innerProps.changePasswordButton = new Button({
      text: "Изменить пароль",
      type: "secondary",
      leftAlign: true,
      onClick: () => {
        this.props.onChangePasswordClick();
      },
    });
    this.innerProps.logoutModalContent = new LogoutModalContent({
      onCancelClick: () => {
        removeModals();
      },
      onLogoutClick: () => {
        authController.logout().then(() => {
          removeModals();
        });
      },
    });
    this.innerProps.logoutButton = new Button({
      text: "Выйти",
      type: "warn",
      leftAlign: true,
      onClick: (e) => {
        renderModal(this.props.logoutModalContent, e as MouseEvent);
      },
    });
  }
}
