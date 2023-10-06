export interface Chat {
  Id: string;
  LastUpdatedAt: string;
  Members: MemberOfChat[];
}

export interface MemberOfChat {
  Id: string;
  Username: string;
  Avatar: string;
}

export interface Message {
  Id: string;
  Message: string;
  Time: string;
  User: MemberOfChat;
}

export interface RequestCreateNewChat {
  members: string[];
  chatMessage: {
    userName: string;
    message: string;
  };
}
