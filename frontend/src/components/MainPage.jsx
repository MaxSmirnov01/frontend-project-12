import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const request = async () => {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      dispatch(addChannel(response.data.channels));
      dispatch(addMessage(response.data.messages));
    };
    request();
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default MainPage;
