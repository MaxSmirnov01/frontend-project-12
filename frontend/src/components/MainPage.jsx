import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import getModal from './Modal.jsx';
import { addChannelState } from '../slices/channelsSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const { type, modalIsOpen } = useSelector((state) => state.modal);
  const Modal = getModal(type);
  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(addChannelState(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, [dispatch, token]);

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
