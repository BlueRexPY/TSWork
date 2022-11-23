import axios from "axios";

const FRONT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

const api = FRONT_URL + "/api";

export const GetRss = (url = "https://www.reddit.com/.rss") => {
  return axios.post(api + "/rssApi/", { url });
};
