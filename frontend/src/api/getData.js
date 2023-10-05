import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import requests from '../requests.js';
import useLocalStorage from '../hooks/useLocalStorage';

const getData = createAsyncThunk('getData', async () => {
  const { token } = JSON.parse(useLocalStorage('getItem'));
  const response = await axios.get(requests.getData(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export default getData;
