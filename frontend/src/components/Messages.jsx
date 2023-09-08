import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';

const Messages = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const input = useRef(null);
  useEffect(() => input.current.focus());

  const messages = useSelector((state) => state.messages.messages);

  const handleCustomChange = (e) => {
    const { value } = e.target;

    if (value.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># general</b>
          </p>
          <span className="text-muted">0 сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((message) => (
            <div className="text-break mb-2">
              <b>admin</b>
              {message}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form noValidate className="py-0 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup className={cn({ 'has-validation': isButtonDisabled })}>
              <Form.Control
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
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
                <span className="visually-hidden">Отправить</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
