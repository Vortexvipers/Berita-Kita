import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://news.kompas.com/?source=navbar";
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);
    let results = [];

    $(".article__list").each((i, el) => {
      const title = $(el).find(".article__link").text().trim();
      const link = $(el).find(".article__link").attr("href");
      const image =
        $(el).find(".article__asset img").attr("data-src") ||
        $(el).find(".article__asset img").attr("src");

      results.push({ title, link, image });
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
