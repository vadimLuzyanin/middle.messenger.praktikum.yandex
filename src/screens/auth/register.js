import renderMain from "../main";
import { makeButton, makeInput } from "../../components";
import { renderToString } from "../../render";
import tmpl from "./auth.hbs";
import * as cn from "./auth.module.scss";
import { appendChilds, pushPathname, renderScreen } from "../../utils";
import { renderLogin } from ".";

const emailInput = makeInput({
  placeholder: "Почта",
  type: "email",
  name: "email",
});
const loginInput = makeInput({
  placeholder: "Логин",
  type: "text",
  name: "login",
});
const firstNameInput = makeInput({
  placeholder: "Имя",
  type: "text",
  name: "first_name",
});
const secondNameInput = makeInput({
  placeholder: "Фамилия",
  type: "text",
  name: "second_name",
});
const phoneInput = makeInput({
  placeholder: "Телефон",
  type: "tel",
  name: "phone",
});
const passwordInput = makeInput({
  placeholder: "Пароль",
  type: "password",
  name: "password",
});
const passwordAgainInput = makeInput({
  placeholder: "Пароль (ещё раз)",
  type: "password",
  name: "password",
});

const registerBtn = makeButton({
  type: "primary",
  text: "Зарегистрироваться",
  onClick: () => {
    renderMain();
  },
});
const loginBtn = makeButton({
  text: "Войти",
  type: "secondary",
  onClick: () => {
    renderLogin();
  },
});

const screen = renderToString({ tmpl, cn }, { title: "Регистрация" });
const renderRegister = () => {
  pushPathname("/register");
  renderScreen(screen, (root) => {
    const inputs = root.querySelector(`.${cn.inputs}`);
    const buttons = root.querySelector(`.${cn.buttons}`);

    appendChilds(inputs, [
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      passwordAgainInput,
    ]);
    appendChilds(buttons, [registerBtn, loginBtn]);
  });
};

export default renderRegister;
