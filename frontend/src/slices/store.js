import { configureStore } from '@reduxjs/toolkit';
import massagesReduser from './messagesSlice';
import channelsReducer from './channelsSlice';

export default configureStore({
  reducer: {
    messages: massagesReduser,
    channels: channelsReducer,
  },
});
