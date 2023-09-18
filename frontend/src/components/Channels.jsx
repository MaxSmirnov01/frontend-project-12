import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import cn from 'classnames';
import { setCurrentChannel } from '../slices/channelsSlice';
import { showModal } from '../slices/modalSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleSelectChannel = (id) => {
    dispatch(setCurrentChannel({ currentChannelId: id }));
  };

  const handleAddChannel = () => {
    dispatch(showModal({ type: 'add', modalIsOpen: true, channelId: null }));
  };

  const handleRemoveChannel = (id) => {
    dispatch(showModal({ type: 'remove', modalIsOpen: true, channelId: id }));
  };

  const handleRenameChannel = (id) => {
    dispatch(showModal({ type: 'rename', modalIsOpen: true, channelId: id }));
  };

  const addDefaultChannels = (channel) => (
    <li key={channel.id} className="nav-item w-100">
      <button
        onClick={() => handleSelectChannel(channel.id)}
        type="button"
        className={cn('w-100 rounded-0 text-start btn', {
          'btn-secondary': currentChannelId === channel.id,
        })}
      >
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  );

  const addNewChannels = (channel) => (
    <li key={channel.id} className="nav-item w-100">
      <ButtonGroup className="d-flex">
        <button
          onClick={() => handleSelectChannel(channel.id)}
          type="button"
          className={cn('w-100 rounded-0 text-start btn text-truncate', {
            'btn-secondary': currentChannelId === channel.id,
          })}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
        <DropdownButton
          as={ButtonGroup}
          title=""
          id="bg-nested-dropdown"
          variant={currentChannelId === channel.id ? 'secondary' : null}
          className="flex-grow-0"
        >
          <span className="visually-hidden">Управление каналом</span>
          <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>Переименовать</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </li>
  );

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button onClick={handleAddChannel} type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) =>
          channel.removable === false ? addDefaultChannels(channel) : addNewChannels(channel),
        )}
      </ul>
    </div>
  );
};

export default Channels;
