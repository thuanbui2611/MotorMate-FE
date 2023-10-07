export interface Chat {
  id: string;
  lastUpdatedAt: string;
  members: MemberOfChat[];
}

export interface MemberOfChat {
  id: string;
  username: string;
  avatar: string;
}

export interface Message {
  id: string;
  message: string;
  time: string;
  user: MemberOfChat;
}

export interface RequestCreateNewChat {
  members: string[];
  chatMessage: {
    userName: string;
    message: string;
  };
}
