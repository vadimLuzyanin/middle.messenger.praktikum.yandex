import { createElement, renderToString } from "../../render";
import tmpl from "./modal.hbs";
import * as cn from "./modal.module.scss";

const renderModal = ({ content, closeCallback }) => {
  const str = renderToString({ tmpl, cn }, { content });
  const root = createElement(str);
  document.getElementById("app").appendChild(root);

  const innerModal = root.querySelector(`.${cn.modal}`);

  const listener = (e) => {
    if (e.target !== innerModal) {
      if (closeCallback) {
        closeCallback();
      }
      root.removeEventListener("click", listener);
      root.remove();
    }
  };
  root.addEventListener("click", listener);
};

export default renderModal;
