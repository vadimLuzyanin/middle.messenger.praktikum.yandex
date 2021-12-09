import { Button, renderModal } from "../../components";
import tmpl from "./main.hbs";
import * as cn from "./main.module.scss";
import Component from "../../component";
import { pushPathname } from "../../index";

type Props = {
  btnAuth: Button;
  btnRegister: Button;
  btnSettings: Button;
  btn404: Button;
  btn500: Button;
  btnModal: Button;
};

export default class MainScreen extends Component<Props> {
  cn = cn;

  constructor() {
    super(tmpl);

    this.props.btnAuth = new Button({
      text: "Потестить страницу логина",
      type: "primary",
      onClick: () => {
        pushPathname("/login");
      },
    });
    this.props.btnRegister = new Button({
      text: "Потестить страницу регистрации",
      type: "secondary",
      onClick: () => {
        pushPathname("/register");
      },
    });
    this.props.btnSettings = new Button({
      text: "Потестить страницу настроек",
      type: "primary",
      onClick: () => {
        pushPathname("/settings");
      },
    });
    this.props.btn404 = new Button({
      text: "Потестить страницу 404",
      type: "warn",
      onClick: () => {
        pushPathname("/404");
      },
    });
    this.props.btn500 = new Button({
      text: "Потестить страницу 500",
      type: "warn",
      onClick: () => {
        pushPathname("/500");
      },
    });
    this.props.btnModal = new Button({
      text: "Потестить модалку",
      type: "primary",
      onClick: (e) => {
        renderModal(
          new Button({ text: "Кнопка внутри модалки", type: "primary" }),
          e as MouseEvent
        );
      },
    });
  }
}
