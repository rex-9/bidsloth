import axios from "axios";

import config from "./config";

let token: string;

if (typeof window !== "undefined") {
  // Perform localStorage action
  token = localStorage.getItem("accessToken");
}

const Axios = axios.create({
  baseURL: config.api_base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

if (typeof window !== "undefined") {
  // Perform localStorage action
  const toks = localStorage.getItem("accessToken");
  if (toks) {
    Axios.interceptors.request.use(async (req) => {
      // @ts-ignore
      req.headers.Authorization = `Bearer ${toks}`;
      return req;
    });
  }
}

export default Axios;
