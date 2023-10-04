import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import requests from '../requests.js';
import useLocalStorage from '../hooks/useLocalStorage';
import { addChannelState } from '../slices/channelsSlice.js';
import routes from '../routes.js';

const getData = () => async (dispatch) => {
  const { token } = JSON.parse(useLocalStorage('getItem'));
  const { t } = useTranslation();
  const navigate = useNavigate();

  try {
    const response = await axios.get(requests.getData(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addChannelState(response.data));
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      navigate(routes.loginPath());
      return;
    }
    toast.error(`${t('PopUpAlerts.mainPage')}`, {
      icon: '😿',
    });
  }
};

export default getData;
