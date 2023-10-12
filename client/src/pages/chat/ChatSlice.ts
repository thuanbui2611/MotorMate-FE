import { createSlice } from "@reduxjs/toolkit";
import {
  Chat,
  ChatMetaData,
  ChatPagination,
  Message,
} from "../../app/models/Chat";
import { MetaData } from "../../app/models/Pagination";
import { esES } from "@mui/x-date-pickers";
import { HubConnection } from "@microsoft/signalr";

type PreviousPageNum = {
  chatId: string;
  pageNumber: number;
};

type ActiveHub = {
  chatId: string;
  connection: HubConnection;
};

interface ChatState {
  listChat: Chat[];
  listMessage: Message[];
  metaData: ChatMetaData[];
}

const initialState: ChatState = {
  listChat: [],
  listMessage: [],
  metaData: [],
};

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addListChat: (state, action) => {
      debugger;
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
      state.listMessage.push(action.payload);
      // state.listMessage = [...state.listMessage, action.payload];
    },
    loadListMessage: (state, action) => {
      //Check duplicate message id in listMessage then remove it, then add the updated action.payload to listMessage
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
} = ChatSlice.actions;
export default ChatSlice.reducer;
