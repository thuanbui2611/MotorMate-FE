import { createSlice } from "@reduxjs/toolkit";
import { Chat, ChatMetaData, Message } from "../../app/models/Chat";
import { MetaData } from "../../app/models/Pagination";

interface ChatState {
  listChat: Chat[];
  listMessage: Message[];
  isOpenChat: boolean;
  startChatToUser: string | null;
  metaData: ChatMetaData[];
}

const initialState: ChatState = {
  listChat: [],
  listMessage: [],
  metaData: [],
  startChatToUser: null,
  isOpenChat: false,
};

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addListChat: (state, action) => {
      const { id, latestMessage } = action.payload as Chat;
      const isExisted = state.listChat.some((c) => c.id === id);
      if (!isExisted) {
        state.listChat.push(action.payload);
      } else {
        const isConnected = state.listMessage.some((m) => m.chatId === id);
        if (isConnected) {
          state.listMessage.push(latestMessage);
        }
      }
    },
    loadListChat: (state, action) => {
      state.listChat = action.payload;
    },
    addListMessage: (state, action) => {
      debugger;
      state.listMessage.push(action.payload);
      // state.listMessage = [...state.listMessage, action.payload];
    },
    loadListMessage: (state, action) => {
      //Check duplicate message id in listMessage then remove it, then add the updated action.payload to listMessage
      debugger;
      const newListMessage = action.payload as Message[];
      const existedListMessageOfChat = state.listMessage.filter(
        (m) => m.chatId === newListMessage[0].chatId
      );
      //Remove duplicate message id in listMessage
      existedListMessageOfChat.forEach((existedMess) => {
        const index = newListMessage.findIndex((m) => m.id === existedMess.id);
        if (index !== -1) {
          newListMessage.splice(index, 1);
        }
      });

      //Add the updated action.payload to listMessage
      state.listMessage = [...newListMessage, ...state.listMessage];
    },
    deleteListMessageByChatId: (state, action) => {
      const chatId = action.payload as string;
      state.listMessage = state.listMessage.filter((m) => m.chatId !== chatId);
    },
    //
    resetMessOfChat: (state) => {
      //handle reset chat detail after remove connection
      state.listMessage = [];
      state.metaData = [];
    },
    setMetaDataMessage: (state, action) => {
      const data = action.payload as ChatMetaData;
      const metaDataModified: any = {
        chatId: data.chatId,
        metaData: {
          totalItemCount: data.metaData.totalItemCount,
          totalPageCount: data.metaData.totalPageCount,
          pageSize: data.metaData.pageSize,
        },
      };
      const index = state.metaData?.findIndex((i) => i.chatId === data.chatId);
      if (index && index === -1) {
        state.metaData.push(metaDataModified);
      } else {
        state.metaData![index].metaData = {
          totalItemCount: data.metaData.totalItemCount,
          totalPageCount: data.metaData.totalPageCount,
          pageSize: data.metaData.pageSize,
          currentPage: [...state.metaData][index].metaData.currentPage,
        } as MetaData;
      }
    },
    setPageNumber: (state, action) => {
      const { chatId, pageNumber } = action.payload;
      const index = state.metaData?.findIndex((i) => i.chatId === chatId);
      if (index !== -1) {
        state.metaData![index].metaData.currentPage = pageNumber;
      }
    },
    setIsOpenChat: (state, action) => {
      state.isOpenChat = action.payload;
    },
    setStartChatToUser: (state, action) => {
      state.startChatToUser = action.payload;
    },
  },
});

export const {
  addListChat,
  loadListChat,
  addListMessage,
  loadListMessage,
  setPageNumber,
  resetMessOfChat,
  setMetaDataMessage,
  deleteListMessageByChatId,
  setIsOpenChat,
  setStartChatToUser,
} = ChatSlice.actions;
export default ChatSlice.reducer;
