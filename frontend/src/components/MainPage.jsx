import React from 'react';
import { useSelector } from 'react-redux';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import getModal from './Modal.jsx';

const MainPage = () => {
  const { type, modalIsOpen } = useSelector((state) => state.modal);
  const Modal = getModal(type);

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
