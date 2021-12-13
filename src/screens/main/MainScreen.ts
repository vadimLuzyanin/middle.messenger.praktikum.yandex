import { Button, renderModal } from "../../components";
import tmpl from "./main.hbs";
import * as cn from "./main.module.scss";
import Component from "../../component";
import { pushPathname } from "../../index";

type InnerProps = {
  btnAuth: Button;
  btnRegister: Button;
  btnSettings: Button;
  btn404: Button;
  btn500: Button;
  btnModal: Button;
};

export default class MainScreen extends Component<{}, {}, InnerProps> {
  cn = cn;

  constructor() {
    super(tmpl);

    this.innerProps.btnAuth = new Button({
      text: "Потестить страницу логина",
      type: "primary",
      onClick: () => {
        pushPathname("/login");
      },
    });
    this.innerProps.btnRegister = new Button({
      text: "Потестить страницу регистрации",
      type: "secondary",
      onClick: () => {
        pushPathname("/register");
      },
    });
    this.innerProps.btnSettings = new Button({
      text: "Потестить страницу настроек",
      type: "primary",
      onClick: () => {
        pushPathname("/settings");
      },
    });
    this.innerProps.btn404 = new Button({
      text: "Потестить страницу 404",
      type: "warn",
      onClick: () => {
        pushPathname("/404");
      },
    });
    this.innerProps.btn500 = new Button({
      text: "Потестить страницу 500",
      type: "warn",
      onClick: () => {
        pushPathname("/500");
      },
    });
    this.innerProps.btnModal = new Button({
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
