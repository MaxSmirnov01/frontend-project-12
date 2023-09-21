import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { hideModal } from '../slices/modalSlice';
import { setCurrentChannel, selectChannelNames } from '../slices/channelsSlice';
import useSocket from '../hooks/useSocket';

const AddModal = () => {
  const dispatch = useDispatch();
  const input = useRef(null);
  const socket = useSocket();
  const { t } = useTranslation();

  const modalIsOpen = useSelector((state) => state.modal.modalIsOpen);
  const channelNames = useSelector(selectChannelNames);

  useEffect(() => input.current.focus(), []);

  const handleClose = () => dispatch(hideModal({ type: 'add', modalIsOpen: false, channelId: null }));

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, `${t('ValidationErrors.addModal.name')}`)
      .max(20, `${t('ValidationErrors.addModal.name')}`)
      .notOneOf(channelNames, `${t('ValidationErrors.addModal.unique')}`),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: ({ name }) => {
      formik.setSubmitting(true);
      try {
        socket.emit('newChannel', { name }, (response) => {
          const { data, status } = response;
          console.log(status, 'канал добавлен');
          dispatch(setCurrentChannel({ currentChannelId: data.id }));
          handleClose();
        });
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  return (
    <Modal show={modalIsOpen} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Modals.addModal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              ref={input}
              value={formik.values.name}
              onChange={formik.handleChange}
              id="name"
              className="mb-2"
              isInvalid={!!formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                {t('Modals.addModal.cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('Modals.addModal.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const RemoveModal = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { t } = useTranslation();

  const { modalIsOpen, channelId } = useSelector((state) => state.modal);

  const handleClose = () => dispatch(hideModal({ type: 'remove', modalIsOpen: false, channelId }));

  return (
    <Modal show={modalIsOpen} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Modals.removeModal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('Modals.removeModal.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>
            {t('Modals.removeModal.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              socket.emit('removeChannel', { id: channelId }, (response) => {
                console.log(response.status, 'канал удален');
                handleClose();
              })
            }
          >
            {t('Modals.removeModal.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const RenameModal = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const input = useRef(null);
  const { t } = useTranslation();

  useEffect(() => input.current.select(), []);

  const { modalIsOpen, channelId } = useSelector((state) => state.modal);
  const channelNames = useSelector(selectChannelNames);

  const handleClose = () => dispatch(hideModal({ type: 'rename', modalIsOpen: false, channelId }));

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, `${t('ValidationErrors.renameModal.name')}`)
      .max(20, `${t('ValidationErrors.renameModal.name')}`)
      .notOneOf(channelNames, `${t('ValidationErrors.renameModal.unique')}`),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: ({ name }) => {
      formik.setSubmitting(true);
      try {
        socket.emit('renameChannel', { id: channelId, name, removable: true }, (response) => {
          console.log(response.status, 'канал переименован');
          handleClose();
        });
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  return (
    <Modal show={modalIsOpen} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Modals.renameModal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              ref={input}
              value={formik.values.name}
              onChange={formik.handleChange}
              id="name"
              className="mb-2"
              isInvalid={!!formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                {t('Modals.renameModal.cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('Modals.renameModal.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const modals = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
};

export default (modalName) => modals[modalName];
