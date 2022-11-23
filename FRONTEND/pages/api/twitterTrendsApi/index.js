import axios from "axios";

const TOKEN_TWITTER = process.env.TOKEN_TWITTER;

export default async function handler(req, res) {
  const { geo } = req.query;
  const api = "https://api.twitter.com";

  const config = {
    headers: { Authorization: `Bearer ${TOKEN_TWITTER}` },
  };

  const response = await axios.get(
    `${api}/1.1/trends/place.json?id=${geo}`,
    config
  );
  res.status(200).json(response.data);
}
