/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages = payload;
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
