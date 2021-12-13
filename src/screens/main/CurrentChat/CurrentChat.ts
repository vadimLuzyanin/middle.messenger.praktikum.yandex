import Component from "../../../component";
import * as cn from "./currentChat.module.scss";
import tmpl from "./currentChat.hbs";
import { Chat } from "../types";
import { MessageCard } from "./MessageCard";
import { MessageInput } from "./MessageInput";

type Props = {
  chat?: Chat;
};

type InnerProps = {
  messages?: MessageCard[];
  messageInput: MessageInput;
};

export default class CurrentChat extends Component<Props, {}, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props);
    this.innerProps.messageInput = new MessageInput();
  }

  componentDidUpdate() {
    this.innerProps.messages = this.props.chat?.content
      .map((c) => c.messages)
      .flat(1)
      .map((message) => new MessageCard({ message }));
    this.render();
  }
}
