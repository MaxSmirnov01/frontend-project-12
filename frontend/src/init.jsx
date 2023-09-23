import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import store from './slices/store.js';
import App from './components/App';
import resources from './locales/index.js';
import { SocketContext } from './contexts/index.jsx';
import { addChannel, removeChannel, renameChannel, setCurrentChannel, defaultChannel } from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  const socket = io();

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
    store.dispatch(setCurrentChannel({ currentChannelId: defaultChannel }));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketContext.Provider value={socket}>
          <App />
        </SocketContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
