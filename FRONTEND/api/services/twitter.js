import axios from "axios";

const FRONT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

const api = FRONT_URL + "/api";

export const GetTwitter = (geo = "1") => {
  return axios.get(api + "/twitterTrendsApi/?geo=" + geo);
};
