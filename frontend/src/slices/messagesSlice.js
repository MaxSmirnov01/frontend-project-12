/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { addChannelState, removeChannel } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChannelState, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      })
      .addCase(removeChannel, (state, { payload }) => {
        const channelId = payload.id;
        const filterMessages = state.messages.filter((message) => message.channelId !== channelId);
        state.messages = filterMessages;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
