import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);

    const title = $("h1.read__title").text().trim();
    const description = $(".read__content").text().trim();
    const date = $(".read__time").text().trim();

    let videoUrl = $("div.video__wrapper video").attr("src");
    if (!videoUrl) {
      videoUrl = $("div.video__wrapper iframe").attr("src") || null;
    }

    res.json({ title, description, date, videoUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
