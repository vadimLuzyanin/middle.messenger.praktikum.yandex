import Component from "../../../component";
import { Message } from "../types";
import * as cn from "./messageCard.module.scss";
import tmpl from "./messageCard.hbs";

type Props = {
  message: Message;
};

type InnerProps = Message;

export default class MessageCard extends Component<Props, {}, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.innerProps = { ...this.props.message };
  }
}
