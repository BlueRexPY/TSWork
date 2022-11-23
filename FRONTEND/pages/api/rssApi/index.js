let Parser = require("rss-parser");
let parser = new Parser();

export default async function handler(req, res) {
  const { url } = req.body;

  const response = await parser.parseURL(url);
  res.status(200).json(response.items);
}
