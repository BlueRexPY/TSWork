import axios from "axios";

const API_KEY = process.env.YOUTUBE_KEY;

export default async function handler(req, res) {
  const { geo = "ua" } = req.query;
  const api = "https://youtube.googleapis.com/youtube/v3/";

  const response = await axios.get(
    `${api}videos?part=snippet&chart=mostPopular&maxHeight=20&maxResults=20&maxWidth=20&regionCode=${geo}&key=${API_KEY}`
  );
  res.status(200).json(response.data);
}
