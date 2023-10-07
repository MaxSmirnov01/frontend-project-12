import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import getModal from '../modals.js';
import getData from '../api/getData.js';
import routes from '../routes.js';
import useLocalStorage from '../hooks/useLocalStorage.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { type, modalIsOpen } = useSelector((state) => state.modal);
  const Modal = getModal(type);
  const { token } = JSON.parse(useLocalStorage('getItem'));

  useEffect(() => {
    try {
      dispatch(getData(token));
    } catch (error) {
      if (error.response.status === 401) {
        navigate(routes.loginPath());
        return;
      }
      toast.error(`${t('PopUpAlerts.mainPage')}`, {
        icon: '😿',
      });
    }
  }, [dispatch, navigate, t, token]);

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
