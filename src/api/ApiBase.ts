import axios from 'axios';
import io from 'socket.io-client';

const apiUrl = process.env.REACT_APP_API_URL!;

const Client = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const socket = io(apiUrl, {
  extraHeaders: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  autoConnect: false
});

export { Client, socket };
