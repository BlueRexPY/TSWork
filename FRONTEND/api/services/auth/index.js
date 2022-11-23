import axios from "axios";
import Cookies from "js-cookie";
import AuthService from "./AuthService";

export const API_URl = process.env.NEXT_PUBLIC_BACKEND_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URl,
});

$api.interceptors.request.use(
  (reqConfig) => {
    const token = Cookies.get("token");
    if (token)
      reqConfig.headers = {
        ...reqConfig.headers,
        authorization: `Bearer ${token}`,
      };
    return reqConfig;
  },
  (error) => error
);

$api.interceptors.response.use(
  (data) => data,
  (error) => {
    const reqConfig = Object.assign({}, error.config);
    if (error?.response?.status === 401 && !reqConfig?.retried) {
      return new Promise((resolve, reject) => {
        reqConfig.retried = true;
        AuthService.refresh().then((result) => {
          Cookies.set("token", result?.data.token);
          resolve($api.request(reqConfig));
        });
      });
    }
    return Promise.reject(error);
  }
);

export default $api;
