import Component from "../../../component";
import * as cn from "./currentChat.module.scss";
import tmpl from "./currentChat.hbs";
import { MessageCard } from "./MessageCard";
import { MessageInput } from "./MessageInput";
import { Chat } from "../../../api/types";
import { ActionButton } from "./ActionButton";
import addUserIcon from "./assets/addUserIcon.svg";
import removeUserIcon from "./assets/removeUserIcon.svg";
import { renderModal } from "../../../components";
import ActionModal from "./ActionModal/ActionModal";
import { AppState } from "../../../store/reducers";

type Props = {
  chat?: Chat;
};

type InnerProps = {
  messages?: MessageCard[];
  messageInput: MessageInput;
  addUserBtn: ActionButton;
  removeUserBtn: ActionButton;
};

type State = {
  allChatsUsers: AppState["chatUsers"];
  currentChatUsersCount?: number;
};

function mapStoreToState(store: AppState) {
  return {
    allChatsUsers: store.chatUsers,
  };
}

export default class CurrentChat extends Component<Props, State, InnerProps> {
  cn = cn;

  constructor(props: Props) {
    super(tmpl, props, mapStoreToState);
    this.innerProps.messageInput = new MessageInput();
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
      this.setState({
        currentChatUsersCount:
          this.state.allChatsUsers[this.props.chat.id]?.length,
      });
    }
  }
}
