import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';
import './assets/application.scss';
import 'bootstrap';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const socket = io();
  root.render(await init(socket));
};

app();
