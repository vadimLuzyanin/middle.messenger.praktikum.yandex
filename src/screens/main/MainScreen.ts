import tmpl from "./main.hbs";
import * as cn from "./main.module.scss";
import Component from "../../component";
import ChatsList from "./ChatsList/ChatsList";
import CurrentChat from "./CurrentChat/CurrentChat";
import { Chat } from "./types";

const chatsFixture: Chat[] = [
  {
    id: 0,
    avatar: "",
    messageAuthor: "Андрей",
    messageContent: "Вы: Круто!",
    notify: 2,
    lastUpdated: "Пт",
    content: [
      {
        date: "19 июня",
        messages: [
          {
            type: "received",
            time: "11:56",
            text:
              "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
          },
          { type: "sent", time: "12:00", text: "Круто!", status: "readed" },
        ],
      },
    ],
  },
  {
    id: 0,
    avatar: "",
    messageAuthor: "Илья",
    messageContent:
      "Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!",
    notify: 0,
    lastUpdated: "15:12",
    content: [
      {
        date: "20 июня",
        messages: [
          {
            type: "received",
            time: "11:56",
            text:
              "Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!",
          },
          {
            type: "sent",
            time: "12:00",
            text: "Интересно!",
            status: "readed",
          },
        ],
      },
    ],
  },
];

const multiChatFixture = [
  ...chatsFixture,
  ...chatsFixture,
  ...chatsFixture,
  ...chatsFixture,
  ...chatsFixture,
  ...chatsFixture,
  ...chatsFixture,
  ...chatsFixture,
  ...chatsFixture,
  ...chatsFixture,
].map((chat, index) => ({ ...chat, id: index }));

type State = {
  chats: Chat[];
  currentChatId: number | null;
};

type InnerProps = {
  chatsList: ChatsList;
  currentChat: CurrentChat;
};
export default class MainScreen extends Component<{}, State, InnerProps> {
  cn = cn;

  constructor() {
    super(tmpl);

    this.state = { chats: multiChatFixture, currentChatId: null };

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
  }
}
