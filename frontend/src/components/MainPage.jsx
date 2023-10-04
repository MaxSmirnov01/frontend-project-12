import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import getModal from './Modal.jsx';
// import { addChannelState } from '../slices/channelsSlice.js';
// import useLocalStorage from '../hooks/useLocalStorage';
// import requests from '../requests.js';
import getData from '../api/getData.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const { type, modalIsOpen } = useSelector((state) => state.modal);
  const Modal = getModal(type);
  // const { token } = JSON.parse(useLocalStorage('getItem'));
  // const { t } = useTranslation();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
      {modalIsOpen && <Modal />}
    </div>
  );
};

export default MainPage;
