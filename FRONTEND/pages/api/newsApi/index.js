const NEWS_API_KEY = process.env.NEWS_API_KEY;

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(NEWS_API_KEY);

export default async function handler(req, res) {
  const { geo, category } = req.query;
  const response = await newsapi.v2.topHeadlines({
    category: category,
    country: geo,
  });
  res.status(200).json(response);
}
