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
  { title: "404", description: "Не туда попали" }
);

const render404 = () => {
  pushPathname("/404");
  renderScreen(screen, (root) => {
    const description = root.querySelector(`.${cn.description}`);
    description.insertAdjacentElement("afterend", backBtn);
  });
};

export default render404;
