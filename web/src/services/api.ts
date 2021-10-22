import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "http://192.168.42.216:4000",
});
