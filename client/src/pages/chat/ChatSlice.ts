import { createSlice } from "@reduxjs/toolkit";
import {
  Chat,
  ChatMetaData,
  ChatPagination,
  Message,
} from "../../app/models/Chat";
import { MetaData } from "../../app/models/Pagination";

type PreviousPageNum = {
  chatId: string;
  pageNumber: number;
};

interface ChatState {
  listChat: Chat[];
  listMessage: Message[];
  pagination: ChatPagination;
  metaData: ChatMetaData[];
  previousPageNumRequest: PreviousPageNum[];
}

export function initMetaData() {
  return {
    chatId: "",
    metaData: {
      totalItemCount: 0,
      totalPageCount: 0,
      pageSize: 10,
      currentPage: 1,
    },
  };
}

const initialState: ChatState = {
  listChat: [],
  listMessage: [],
  pagination: {
    pageNumber: 1,
    pageSize: 10,
  },
  metaData: [],
  previousPageNumRequest: [],
};

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addListChat: (state, action) => {
      state.listChat.push(action.payload);
    },
    loadListChat: (state, action) => {
      state.listChat = action.payload;
    },
    addListMessage: (state, action) => {
      state.listMessage.push(action.payload);
    },
    loadListMessage: (state, action) => {
      state.listMessage = [...action.payload, ...state.listMessage];
    },
    resetListMessage: (state) => {
      state.listMessage = [];
      state.pagination.pageNumber = 1;
    },
    setMetaDataMessage: (state, action) => {
      debugger;
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

      //create prev request pageNumber
      const indexPreviousPageNum = state.previousPageNumRequest.findIndex(
        (i) => i.chatId === data.chatId
      );
      if (indexPreviousPageNum === -1) {
        state.previousPageNumRequest.push({
          chatId: data.chatId,
          pageNumber: data.metaData.currentPage,
        });
      } else {
        state.previousPageNumRequest[indexPreviousPageNum].pageNumber =
          data.metaData.currentPage;
      }
    },
    setPageNumber: (state, action) => {
      debugger;
      const { chatId, pageNumber } = action.payload;
      const index = state.metaData?.findIndex((i) => i.chatId === chatId);
      if (index !== -1) {
        state.metaData![index].metaData.currentPage = pageNumber;
      }
      //set prev request pageNumber
      // const indexPreviousPageNum = state.previousPageNumRequest.findIndex(
      //   (i) => i.chatId === chatId
      // );
      // if (indexPreviousPageNum !== -1) {
      //   state.previousPageNumRequest[indexPreviousPageNum].pageNumber =
      //     pageNumber - 1;
      // }
    },
  },
});

export const {
  addListChat,
  loadListChat,
  addListMessage,
  loadListMessage,
  setPageNumber,
  resetListMessage,
  setMetaDataMessage,
} = ChatSlice.actions;
export default ChatSlice.reducer;
