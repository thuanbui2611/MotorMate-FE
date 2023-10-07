import { createSlice } from "@reduxjs/toolkit";
import { Chat, Message } from "../../app/models/Chat";

interface ChatState {
  listChat: Chat[];
}

const initialState: ChatState = {
  listChat: [],
};

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addListChat: (state, action) => {
      state.listChat.push(action.payload);
    },
    loadListChat: (state, action) => {
      debugger;
      state.listChat = action.payload;
    },
  },
});

export const { addListChat, loadListChat } = ChatSlice.actions;
export default ChatSlice.reducer;
