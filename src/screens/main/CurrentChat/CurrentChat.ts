import Component from "../../../component";
import * as cn from "./currentChat.module.scss";
import tmpl from "./currentChat.hbs";
import { MessageCard } from "./MessageCard";
import { MessageInput } from "./MessageInput";
import { Chat } from "../../../api";
import { ActionButton } from "./ActionButton";
import addUserIcon from "./assets/addUserIcon.svg";
import removeUserIcon from "./assets/removeUserIcon.svg";
import { renderModal } from "../../../components";
import { ActionModal } from "./ActionModal";
import { AppState } from "../../../store";

type Props = {
  chat?: Chat;
};

type InnerProps = {
  messageInput: MessageInput;
  addUserBtn: ActionButton;
  removeUserBtn: ActionButton;
  messageComponents?: MessageCard[];
  avatar?: string;
};

type State = {
  allChatsUsers: AppState["chatUsers"];
  allChatsMessages: AppState["messages"];
  currentChatUsersCount?: number;
  userId: number;
};

function mapStoreToState(store: AppState) {
  return {
    allChatsUsers: store.chatUsers,
    allChatsMessages: store.messages,
    userId: store.user?.id,
  };
}

export default class CurrentChat extends Component<Props, State, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props, mapStoreToState);

    this.innerProps.addUserBtn = new ActionButton({
      text: "Добавить пользователя",
      icon: addUserIcon,
      onClick: (e) => {
        renderModal(
          new ActionModal({ type: "add", chatId: this.props.chat!.id }),
          e as MouseEvent
        );
      },
    });
    this.innerProps.removeUserBtn = new ActionButton({
      text: "Удалить пользователя",
      icon: removeUserIcon,
      onClick: (e) => {
        renderModal(
          new ActionModal({ type: "remove", chatId: this.props.chat!.id }),
          e as MouseEvent
        );
      },
    });
    if (this.props.chat) {
      this.setState({
        currentChatUsersCount:
          this.state.allChatsUsers[this.props.chat.id]?.length,
      });
    }
  }

  componentDidUpdate(_: Props) {
    this.render();
    if (this.props.chat) {
      this.innerProps.messageInput = new MessageInput({
        chatId: this.props.chat!.id,
      });
      this.innerProps.avatar =
        this.props.chat.avatar ||
        this.props.chat.last_message?.user.avatar ||
        "";
      const currentChatMessages =
        this.state.allChatsMessages[this.props.chat.id];
      const messageComponents = currentChatMessages?.map((message) => {
        return new MessageCard({ message, userId: this.state.userId });
      });
      this.innerProps.messageComponents = messageComponents;
      this.setState({
        currentChatUsersCount:
          this.state.allChatsUsers[this.props.chat.id]?.length,
      });
      const chatContent = this.element?.querySelector(`.${cn.chatContent}`);
      setTimeout(() => {
        chatContent?.scrollTo({
          top: chatContent.scrollHeight,
        });
      });
    }
  }
}
