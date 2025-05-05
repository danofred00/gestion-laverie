import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
  withXSRFToken: false,
});

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }

  return config;
});

export default axios;
