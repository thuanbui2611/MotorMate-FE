import { MetaData } from "./Pagination";

export interface Chat {
  id: string;
  members: MemberOfChat[];
  latestMessage: Message;
}

export interface Message {
  id: string;
  chatId: string;
  message: string;
  time: string;
  user: MemberOfChat;
}
export interface MemberOfChat {
  id: string;
  username: string;
  avatar: string;
}
export interface RequestCreateNewChat {
  members: string[];
  chatMessage: {
    userName: string;
    message: string;
  };
}

export interface ChatPagination {
  pageNumber: number;
  pageSize: number;
}

export interface ChatMetaData{
  chatId: string;
  metaData: MetaData;
}
