export interface Chat {
  id: string;
  lastUpdatedAt: string;
  members: MemberOfChat[];
  latestMessage: Message;
}

export interface Message {
  chatId?: string;
  id: string;
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
