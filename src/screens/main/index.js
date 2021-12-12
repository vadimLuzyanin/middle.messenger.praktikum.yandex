import { makeButton, renderModal } from "../../components";
import { renderToString } from "../../render";
import tmpl from "./main.hbs";
import * as cn from "./main.module.scss";
import { appendChilds, pushPathname, renderScreen } from "../../utils";
import { render404, render500 } from "../errors";
import { renderLogin, renderRegister } from "../auth";
import renderSettings from "../settings";

const btnAuth = makeButton({
  type: "primary",
  text: "Потестить страницу логина",
  onClick: () => {
    renderLogin();
  },
});
const btnRegister = makeButton({
  type: "secondary",
  text: "Потестить страницу регистрации",
  onClick: () => {
    renderRegister();
  },
});
const btnSettings = makeButton({
  text: "Потестить страницу настроек",
  onClick: () => {
    renderSettings();
  },
});
const btn404 = makeButton({
  type: "warn",
  text: "Потестить страницу 404",
  onClick: () => {
    render404();
  },
});
const btn500 = makeButton({
  type: "warn",
  text: "Потестить страницу 500",
  onClick: () => {
    render500();
  },
});
const btnModal = makeButton({
  type: "primary",
  text: "Потестить модалку",
  onClick: () => {
    renderModal({ content: "Текст внутри" });
  },
});

const screen = renderToString({ tmpl, cn });
const renderMain = () => {
  pushPathname("/");
  renderScreen(screen, (root) => {
    const buttonsContainer = root.querySelector(`.${cn.buttons}`);
    appendChilds(buttonsContainer, [
      btnAuth,
      btnRegister,
      btnSettings,
      btn404,
      btn500,
      btnModal,
    ]);
  });
};

export default renderMain;
