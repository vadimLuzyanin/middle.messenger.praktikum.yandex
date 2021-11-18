import renderMain from "../main";
import { makeButton } from "../../components";
import { renderToString } from "../../render";
import { pushPathname, renderScreen } from "../../utils";
import tmpl from "./error.hbs";
import * as cn from "./error.module.scss";

const backBtn = makeButton({
  text: "Назад к чатам",
  onClick: () => {
    renderMain();
  },
});

const screen = renderToString(
  { tmpl, cn },
  { title: "500", description: "Мы уже фиксим" }
);

const render500 = () => {
  pushPathname("/500");
  renderScreen(screen, (root) => {
    const description = root.querySelector(`.${cn.description}`);
    description.insertAdjacentElement("afterend", backBtn);
  });
};

export default render500;
