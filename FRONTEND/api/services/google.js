import axios from "axios";

const FRONT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

const api = FRONT_URL + "/api";

export const GetGoogle = (geo = "GB", category = "all") => {
  return axios.get(
    api + "/googleTrendsApi/?geo=" + geo + "&category=" + category
  );
};
