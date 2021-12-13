export interface Chat {
  avatar: string;
  messageAuthor: string;
  messageContent: string;
  notify?: number;
  lastUpdated: string;
  content: ChatContent[];
  id: number;
}

export interface ChatContent {
  date: string;
  messages: Message[];
}

export interface Message {
  type: "received" | "sent";
  time: string;
  text: string;
  status?: "readed";
}
