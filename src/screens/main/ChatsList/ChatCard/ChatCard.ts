import { Chat } from "../../../../api";
import Component from "../../../../component";
import { BlockProps } from "../../../../types";
import { parseDate } from "../../../../utils";
import tmpl from "./chatCard.hbs";
import * as cn from "./chatCard.module.scss";

type Props = BlockProps & {
  chat: Chat;
  selected?: boolean;
};

type InnerProps = {
  time: string;
  avatar: string;
};

export default class ChatCard extends Component<Props, {}, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.innerProps.avatar =
      this.props.chat.avatar || this.props.chat.last_message?.user.avatar || "";

    this.innerProps.time = this.props.chat.last_message
      ? parseDate(this.props.chat.last_message.time)
      : "";
  }
}
