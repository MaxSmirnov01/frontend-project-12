/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [] },
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels = payload;
    },
  },
});

export const { addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
