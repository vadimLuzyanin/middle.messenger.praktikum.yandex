import renderMain from "../main";
import { makeButton, makeInput } from "../../components";
import { renderToString } from "../../render";
import renderRegister from "./register";
import tmpl from "./auth.hbs";
import * as cn from "./auth.module.scss";
import { appendChilds, pushPathname, renderScreen } from "../../utils";

const loginInput = makeInput({
  placeholder: "Логин",
  type: "text",
  name: "login",
});
const passwordInput = makeInput({
  placeholder: "Пароль",
  type: "password",
  name: "password",
});
const loginBtn = makeButton({
  type: "primary",
  text: "Войти",
  onClick: () => {
    renderMain();
  },
});
const registerBtn = makeButton({
  type: "secondary",
  text: "Нет аккаунта?",
  onClick: () => {
    renderRegister();
  },
});

const screen = renderToString({ tmpl, cn }, { title: "Вход" });
const renderAuth = () => {
  pushPathname("/auth");
  renderScreen(screen, (root) => {
    const inputs = root.querySelector(`.${cn.inputs}`);
    const buttons = root.querySelector(`.${cn.buttons}`);

    appendChilds(inputs, [loginInput, passwordInput]);
    appendChilds(buttons, [loginBtn, registerBtn]);
  });
};

export default renderAuth;
