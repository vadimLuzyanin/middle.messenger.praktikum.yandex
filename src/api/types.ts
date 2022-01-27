export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type BaseResponse = string | ErrorResponse;
export type ErrorResponse = { reason: string };

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: {
    user: User;
    time: string;
    content: string;
  };
};

export type WSMessage = {
  type: string;
};

export type ChatMessage = {
  id: string;
  time: string;
  user_id: number;
  content: string;
  is_read?: boolean;
  type: "message";
};
