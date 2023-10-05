/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './slices/store.js';
import App from './components/App';
import resources from './locales/index.js';
import { SocketContext } from './contexts/index.jsx';
import { addChannel, removeChannel, renameChannel, setCurrentChannel, defaultChannel } from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  const api = {
    sendMessage: (...arg) =>
      socket.emit('newMessage', ...arg, (response) => {
        console.log(response.status, 'сообщение добавлено');
      }),
    addChannel: (...arg) =>
      socket.emit('newChannel', ...arg, (response) => {
        const { data, status } = response;
        console.log(status, 'канал добавлен');
        store.dispatch(setCurrentChannel({ currentChannelId: data.id }));
      }),

    removeChannel: (...arg) =>
      socket.emit('removeChannel', ...arg, (response) => {
        console.log(response.status, 'канал удален');
      }),

    renameChannel: (...arg) =>
      socket.emit('renameChannel', ...arg, (response) => {
        console.log(response.status, 'канал переименован');
      }),
  };

  socket.on('connect', () => {
    console.log('Подключено к серверу');
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
    const state = store.getState();
    if (state.channels.currentChannelId === payload.id) {
      store.dispatch(setCurrentChannel({ currentChannelId: defaultChannel }));
    }
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketContext.Provider value={api}>
          <App />
        </SocketContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
