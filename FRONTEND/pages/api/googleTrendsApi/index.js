import googleTrendsApi from "google-trends-api";

export default async function handler(req, res) {
  const { geo, category } = req.query;
  const response = await googleTrendsApi.realTimeTrends({
    geo: geo,
    category: category,
  });
  res.status(200).json(JSON.parse(response));
}
