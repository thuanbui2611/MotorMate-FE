import { createSlice } from "@reduxjs/toolkit";
import { Chat, ChatPagination, Message } from "../../app/models/Chat";
import { MetaData } from "../../app/models/Pagination";

interface ChatState {
  listChat: Chat[];
  listMessage: Message[];
  pagination: ChatPagination;
}

const initialState: ChatState = {
  listChat: [],
  listMessage: [],
  pagination: {
    pageNumber: 1,
    pageSize: 10,
  },
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
    // loadPreviousListMessage: (state, action) => {
    //   state.listMessage = [...action.payload, ...state.listMessage];
    // },
    setPageNumber: (state, action) => {
      state.pagination.pageNumber = action.payload;
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
} = ChatSlice.actions;
export default ChatSlice.reducer;
