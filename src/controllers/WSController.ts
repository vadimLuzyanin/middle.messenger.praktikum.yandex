import { ChatMessage } from "../api";
import { store } from "../store";
import { oldMessagesReceive, newMessagesReceive } from "../store/actions";
// eslint-disable-next-line import/no-cycle
import authController from "./authController";
// eslint-disable-next-line import/no-cycle
import chatsController from "./chatsController";

type ConnectParams = {
  token: string;
  chatId: number;
};

const keepAliveMessage = JSON.stringify({
  type: "ping",
});

class WSController {
  userId: number = 0;

  sockets: { [key: string]: WebSocket } = {};

  setUserId(userId: number) {
    this.userId = userId;
  }

  connect(params: ConnectParams) {
    return new Promise((resolve) => {
      const { chatId, token } = params;
      const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${this.userId}/${chatId}/${token}`
      );
      this.sockets[chatId] = socket;

      socket.addEventListener("open", () => {
        socket.send(keepAliveMessage);

        setInterval(() => {
          socket.send(keepAliveMessage);
        }, 10000);
        resolve(true);
      });
    });
  }

  subscribe(chatId: number, fn: (event: MessageEvent) => void) {
    this.sockets[chatId]?.addEventListener("message", (event) => {
      fn(event);
    });
  }

  sendMessagesRequest(page: number, chatId: number) {
    const request = JSON.stringify({ content: `${page}`, type: "get old" });
    this.sockets[chatId]?.send(request);
  }

  sendMessage(content: string, chatId: number) {
    const request = JSON.stringify({ content, type: "message" });
    this.sockets[chatId]?.send(request);
  }

  subscribeToMessages(
    chatId: number,
    fn: (message: ChatMessage | ChatMessage[]) => void
  ) {
    this.subscribe(chatId, (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "message") {
        fn(message as ChatMessage);
      } else if (Array.isArray(message) && message[0]?.type === "message") {
        fn(message as ChatMessage[]);
      }
    });
  }

  async requestOldMessagesAndSubscribeToNew() {
    const user = await authController.getUser();
    if (!user) {
      return;
    }
    this.setUserId(user.id);

    await chatsController.fetchChats();
    const chatsIds = store.getState().chats.map((c) => c.id);
    const alreadyConnected = Object.keys(this.sockets);
    const notConnected = chatsIds.filter(
      (id) => !alreadyConnected.includes(`${id}`)
    );
    const chatIdsWithTokens = await Promise.all(
      notConnected.map(async (id) => {
        const token = await chatsController.getChatToken({ id });
        if (token) {
          await this.connect({ chatId: id, token });
          return id;
        }
        return null;
      })
    );

    chatIdsWithTokens.forEach((id) => {
      if (!id) {
        return;
      }
      this.subscribeToMessages(id, (message) => {
        if (Array.isArray(message)) {
          store.dispatch(oldMessagesReceive({ messages: message, chatId: id }));
        } else {
          store.dispatch(newMessagesReceive({ message, chatId: id }));
        }
      });
    });
    const counts = notConnected.map((id) => ({ id, count: 100 })); // непонятно что тут можно сделать
    counts.forEach(({ id, count }) => {
      let current = 0;
      while (current < count) {
        const request = JSON.stringify({
          content: `${current}`,
          type: "get old",
        });
        const socket = this.sockets[id];
        socket?.send(request);
        current += 20;
      }
    });
  }
}

export default new WSController();
