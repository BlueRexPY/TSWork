import axios from "axios";

const FRONT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

const api = FRONT_URL + "/api";

export const GetNews = (geo = "us", category = "business") => {
  return axios.get(`${api}/newsApi/?geo=${geo}&category=${category}`);
};
