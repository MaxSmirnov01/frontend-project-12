/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: 1 },
  reducers: {
    addChannelState: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      const { currentChannelId } = payload;
      state.currentChannelId = currentChannelId;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      const newState = state.channels.filter((channel) => channel.id !== payload.id);
      state.channels = newState;
    },
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find((item) => item.id === payload.id);
      channel.name = payload.name;
    },
  },
});

const selectChannels = (state) => state.channels;

export const selectChannelNames = createSelector(selectChannels, ({ channels }) => {
  const names = channels.map((channel) => channel.name);
  return names;
});
export const { addChannelState, setCurrentChannel, addChannel, removeChannel, renameChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
