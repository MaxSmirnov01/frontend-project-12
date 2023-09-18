/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { type: null, modalIsOpen: false, channelId: null },
  reducers: {
    hideModal: (state, { payload }) => {
      const { type, modalIsOpen, channelId } = payload;
      state.modalIsOpen = modalIsOpen;
      state.type = type;
      state.channelId = channelId;
    },
    showModal: (state, { payload }) => {
      const { type, modalIsOpen, channelId } = payload;
      state.modalIsOpen = modalIsOpen;
      state.type = type;
      state.channelId = channelId;
    },
  },
});

export const { hideModal, showModal } = modalSlice.actions;
export default modalSlice.reducer;
