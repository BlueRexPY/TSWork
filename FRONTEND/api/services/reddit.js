import axios from "axios";

const api = "https://www.reddit.com";

export const GetReddit = async (subreddit = "") => {
  return await axios.get(
    `${api}${subreddit === "" ? "" : "/r/" + subreddit}/hot.json`
  );
};
