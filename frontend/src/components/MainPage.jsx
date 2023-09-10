import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addChannelState } from '../slices/channelsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const request = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch(addChannelState(response.data));
      } catch (error) {
        console.log(error);
      }
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
