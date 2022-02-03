import Component from "../../../../component";
import { BlockProps } from "../../../../types";
import tmpl from "./actionButton.hbs";
import cn from "./actionButton.module.scss";

type Props = BlockProps & {
  text: string;
  icon: string;
};

export default class ActionButton extends Component<Props> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);
  }
}
