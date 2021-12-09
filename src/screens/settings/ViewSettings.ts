import { Button } from "../../components";
import Component from "../../component";
import tmpl from "./viewSettings.hbs";
import * as cn from "./settings.module.scss";
import { pushPathname } from "../../index";

type Props = {
  changeDataButton?: Button;
  changePasswordButton?: Button;
  logoutButton?: Button;
  saveButton?: Button;
  onChangePasswordClick: () => void;
  onChangeDataClick: () => void;
};

type State = {
  name: string;
  fields: { name: string; value: string }[];
};

export default class ViewSettings extends Component<Props, State> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.props.changeDataButton = new Button({
      text: "Изменить данные",
      type: "secondary",
      leftAlign: true,
      onClick: () => {
        this.props.onChangeDataClick();
      },
    });
    this.props.changePasswordButton = new Button({
      text: "Изменить пароль",
      type: "secondary",
      leftAlign: true,
      onClick: () => {
        this.props.onChangePasswordClick();
      },
    });
    this.props.logoutButton = new Button({
      text: "Выйти",
      type: "warn",
      leftAlign: true,
      onClick: () => {
        pushPathname("/login");
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
