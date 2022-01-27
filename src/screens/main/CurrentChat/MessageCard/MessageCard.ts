import cn from "./messageCard.module.scss";
import tmpl from "./messageCard.hbs";
import Component from "../../../../component";
import { parseDate } from "../../../../utils";
import { ChatMessage } from "../../../../api";

type Props = {
  message: ChatMessage;
  userId: number;
};

type InnerProps = Omit<ChatMessage, "type" | "time"> & {
  type: "received" | "sent";
  readed: boolean;
  time: string;
  showIcon: boolean;
};

export default class MessageCard extends Component<Props, {}, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);

    this.innerProps = {
      ...this.props.message,
      type:
        this.props.message.user_id === this.props.userId ? "sent" : "received",
      readed: !!this.props.message.is_read,
      time: parseDate(this.props.message.time),
      showIcon: this.props.message.user_id === this.props.userId,
    };
  }
}
