import axios from "axios";

const Client = axios.create({
  baseURL: "http://localhost:9090/",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { Client };
