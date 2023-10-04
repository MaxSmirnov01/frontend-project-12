import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import EmojiPicker from 'emoji-picker-react';
import cn from 'classnames';
import useSocket from '../hooks/useSocket';
import filterProfanity from '../filter';
import useLocalStorage from '../hooks/useLocalStorage';

const Messages = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { username } = JSON.parse(useLocalStorage('getItem'));
  const input = useRef(null);
  const socket = useSocket();
  const { t } = useTranslation();

  const messages = useSelector((state) => state.messages.messages);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  const channelName = useSelector((state) => {
    const { channels } = state.channels;
    return channels.find((channel) => channel.id === channelId);
  });

  const messagesFilteredById = messages.filter((message) => message.channelId === channelId);

  useEffect(() => input.current.focus());

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }) => {
      formik.setSubmitting(true);
      const message = filterProfanity(body);

      try {
        socket.emit('newMessage', { body: message, channelId, username }, (response) => {
          console.log(response.status, 'сообщение добавлено');
        });
        formik.resetForm();
        setIsButtonDisabled(true);
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  const handleCustomChange = (e) => {
    const { value } = e.target;
    if (value) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{channelName && `# ${channelName.name}`}</b>
          </p>
          <span className="text-muted">{t('Messages.count', { count: messagesFilteredById.length })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesFilteredById.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              {`: ${message.body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={({ emoji }) => {
                formik.setFieldValue('body', `${formik.values.body} ${emoji}`);
                setShowEmojiPicker(!showEmojiPicker);
              }}
            />
          )}
          <Form noValidate className="py-0 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup className={cn({ 'has-validation': isButtonDisabled })}>
              <Button type="button" variant="outline-light" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                🙂
              </Button>
              <Form.Control
                name="body"
                aria-label="Новое сообщение"
                placeholder={t('Messages.enterMessage')}
                className="border-0 p-2 ps-2"
                ref={input}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleCustomChange(e);
                }}
                value={formik.values.body}
              />
              <Button
                type="submit"
                className="btn-group-vertical"
                variant="outline-primary"
                disabled={isButtonDisabled}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path fillRule="evenodd" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                </svg>
                <span className="visually-hidden">{t('Messages.submit')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
