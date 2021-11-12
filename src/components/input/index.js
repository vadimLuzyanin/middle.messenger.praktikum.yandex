import tmpl from "./input.hbs";
import * as cn from "./input.module.scss";
import { createElement, renderToString } from "../../render";

const makeInput = ({ placeholder, type, name, onChange }) => {
  const str = renderToString({ tmpl, cn }, { placeholder, type, name });
  const root = createElement(str);
  const inputElement = root.querySelector("input");

  if (onChange) {
    inputElement.addEventListener("input", (e) => {
      onChange(e);
    });
  }

  return root;
};

export default makeInput;
