import env from "react-dotenv";
import axios from "axios";

const api = axios.create({
  baseURL: env.REACT_APP_API_BASE_URL,
  'Content-type': 'application/json',
  Accept: 'application/json',
  // withCredentials: true,
})

export default api;