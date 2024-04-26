import axios from "axios";
import { GetItem } from "../helpers/localeStorage";

axios.defaults.baseURL = "https://api.realworld.io/api";

axios.interceptors.request.use((config) => {
  const token = GetItem("token");
  const authorization = token ? `Token ${token}` : "";
  config.headers.Authorization = authorization;
  return config;
});

export default axios;
