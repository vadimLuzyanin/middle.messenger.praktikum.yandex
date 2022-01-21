import { pushPathname } from "../../index";
import Component from "../../component";
import { Button } from "../../components";
import tmpl from "./error.hbs";
import * as cn from "./error.module.scss";

type Props = {
  title: string;
  description: string;
};

type InnerProps = {
  backBtn: Button;
};

export default class ErrorPage extends Component<Props, {}, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.innerProps.backBtn = new Button({
      text: "Назад к чатам",
      type: "secondary",
      onClick: () => {
        pushPathname("/");
      },
    });
  }
}
