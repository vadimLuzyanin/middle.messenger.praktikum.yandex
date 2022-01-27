import tmpl from "./main.hbs";
import * as cn from "./main.module.scss";
import Component from "../../component";
import { Chat } from "../../api";
import { AppState } from "../../store";
import { CurrentChat } from "./CurrentChat";
import { ChatsList } from "./ChatsList";

type State = {
  chats: Chat[];
  currentChatId: number | null;
  isLoggedIn: boolean;
};

type InnerProps = {
  chatsList: ChatsList;
  currentChat: CurrentChat;
};

function mapStoreToState(store: AppState): Partial<State> {
  return {
    chats: store.chats,
    isLoggedIn: store.isLoggedIn,
  };
}
export default class MainScreen extends Component<{}, State, InnerProps> {
  cn = cn;

  constructor() {
    super(tmpl, {}, mapStoreToState);

    this.innerProps.chatsList = new ChatsList({
      onSelect: (id: number) => {
        this.setState((prev) => ({ ...prev, currentChatId: id }));
      },
      chats: this.state.chats,
    });

    this.innerProps.currentChat = new CurrentChat({
      chat: this.state.chats.find(
        (chat) => chat.id === this.state.currentChatId
      ),
    });
  }

  componentDidUpdate() {
    this.innerProps.currentChat.outerProps.chat = this.state.chats.find(
      (chat) => chat.id === this.state.currentChatId
    );
    this.innerProps.chatsList.outerProps.chats = this.state.chats;
  }
}
