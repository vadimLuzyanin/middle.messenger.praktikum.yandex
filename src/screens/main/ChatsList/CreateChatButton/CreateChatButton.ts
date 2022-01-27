import Component from "../../../../component";
import { BlockProps } from "../../../../types";
import tmpl from "./profileButton.hbs";
import cn from "./profileButton.module.scss";

type Props = BlockProps;

export default class CreateChatButton extends Component<Props> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);
  }
}
