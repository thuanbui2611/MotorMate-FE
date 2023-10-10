import { createSlice } from "@reduxjs/toolkit";
import { Chat, ChatMetaData, ChatPagination, Message } from "../../app/models/Chat";
import { MetaData } from "../../app/models/Pagination";

interface ChatState {
  listChat: Chat[];
  listMessage: Message[];
  pagination: ChatPagination;
  metaData: ChatMetaData[];
}

export function initMetaData()
{
  return {
    chatId: "",
    metaData: {
      totalItemCount: 0,
      totalPageCount: 0,
      pageSize: 10,
      currentPage: 1,
    }
  }
  
}

const initialState: ChatState = {
  listChat: [],
  listMessage: [],
  pagination: {
    pageNumber: 1,
    pageSize: 10,
  },
  metaData: []
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
    // setPageNumber: (state, action) => {
    //   state.pagination.pageNumber = action.payload;
    // },
    setMetaDataMessage: (state, action) => {
      const {chatId} = action.payload;
      const index = state.metaData?.findIndex((i) => i.chatId === chatId)
      if(index && index !== -1)
      {
        state.metaData![index].metaData = action.payload;
      } else {
        state.metaData.push(action.payload);
        const result = state.metaData;
      }
    },
    setPageNumber: (state, action) => {
      debugger;
      const {chatId, pageNumber} = action.payload;
      const index = state.metaData?.findIndex(i => i.chatId === chatId);
      if(index !== -1){
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
  resetListMessage,
  setMetaDataMessage
} = ChatSlice.actions;
export default ChatSlice.reducer;
