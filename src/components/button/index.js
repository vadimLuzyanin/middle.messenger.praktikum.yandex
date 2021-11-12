import { createElement, renderToString } from "../../render";
import tmpl from "./button.hbs";
import * as cn from "./button.module.scss";

const makeButton = ({ type, leftAlign, text, onClick }) => {
  const str = renderToString({ tmpl, cn }, { type, leftAlign, text });
  const root = createElement(str);

  if (onClick) {
    root.addEventListener("click", (e) => {
      onClick(e);
    });
  }

  return root;
};

export default makeButton;
