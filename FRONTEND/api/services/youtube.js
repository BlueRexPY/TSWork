import axios from "axios";

const FRONT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const api = FRONT_URL + "/api";

export const GetYoutube = (geo = "ua") => {
  return axios.get(api + "/youtubeTrendsApi/?geo=" + geo);
};
