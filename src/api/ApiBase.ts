import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Client = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export { Client };
