/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import getData from '../api/getData.js';

export const defaultChannel = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: defaultChannel },
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        state.channels = channels;
        state.currentChannelId = currentChannelId;
      })
      .addCase(getData.rejected, ({ error }) => {
        console.log(error);
        const { t } = useTranslation();
        const navigate = useNavigate();
        if (error === 401) {
          navigate(routes.loginPath());
          return;
        }
        toast.error(`${t('PopUpAlerts.mainPage')}`, {
          icon: '😿',
        });
      });
  },
});

const selectChannels = (state) => state.channels;

export const selectChannelNames = createSelector(selectChannels, ({ channels }) => {
  const names = channels.map((channel) => channel.name);
  return names;
});

export const {
  setCurrentChannel, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
