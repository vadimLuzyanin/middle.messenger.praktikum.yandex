import Component from "../../component";
import { Button } from "../../components";
import tmpl from "./error.hbs";
import * as cn from "./error.module.scss";
import { gotoRoute } from "../../router";
import { ScreensPathnames } from "../../constants";

type InnerProps = {
  backBtn: Button;
  title: string;
  description: string;
};

export default class Screen500 extends Component<{}, {}, InnerProps> {
  cn = cn;

  constructor() {
    super(tmpl);

    this.innerProps.backBtn = new Button({
      text: "Назад к чатам",
      type: "secondary",
      onClick: () => {
        gotoRoute(ScreensPathnames.Messenger);
      },
    });

    this.innerProps.title = "500";
    this.innerProps.description = "Мы уже фиксим";
  }
}
