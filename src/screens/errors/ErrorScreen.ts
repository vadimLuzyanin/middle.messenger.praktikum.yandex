import { pushPathname } from "../../index";
import Component from "../../component";
import { Button } from "../../components";
import tmpl from "./error.hbs";
import * as cn from "./error.module.scss";

type Props = {
  backBtn?: Button;
  title: string;
  description: string;
};

export default class ErrorPage extends Component<Props> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.props.backBtn = new Button({
      text: "Назад к чатам",
      type: "secondary",
      onClick: () => {
        pushPathname("/");
      },
    });
  }
}
