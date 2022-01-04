import { Button, renderModal } from "../../../components";
import Component from "../../../component";
import tmpl from "./viewSettings.hbs";
import * as cn from "../settings.module.scss";
import { LogoutModalContent } from "./LogoutModalContent";
import { gotoRoute } from "../../../router";
import { ScreensPathnames } from "../../../constants";

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

type State = {
  name: string;
  fields: { name: string; value: string }[];
};

export default class ViewSettings extends Component<Props, State, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

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
        this.props.logoutModalContent.remove();
      },
      onLogoutClick: () => {
        gotoRoute(ScreensPathnames.login);
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

    this.state = {
      name: "Иван",
      fields: [
        {
          name: "Почта",
          value: "pochta@yandex.ru",
        },
        {
          name: "Логин",
          value: "ivanivanov",
        },
        {
          name: "Имя",
          value: "Иван",
        },
        {
          name: "Фамилия",
          value: "Иванов",
        },
        {
          name: "Имя в чате",
          value: "Иван",
        },
        {
          name: "Телефон",
          value: "+7 (909) 967 30 30",
        },
      ],
    };
  }
}
