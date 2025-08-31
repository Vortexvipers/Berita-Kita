import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { q = "dpr" } = req.query;
  try {
    const url = `https://search.kompas.com/search?q=${encodeURIComponent(q)}`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);
    let result = [];

    $(".article__list").each((i, el) => {
      const title = $(el).find(".article__link").text().trim();
      const url = $(el).find(".article__link").attr("href");
      const thumbnail =
        $(el).find(".article__asset img").attr("data-src") ||
        $(el).find(".article__asset img").attr("src");
      const snippet = $(el).find(".article__lead").text().trim();
      const published_at = $(el).find(".article__date").text().trim();

      result.push({ title, url, thumbnail, snippet, published_at });
    });

    res.status(200).json({ status: true, result });
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
}
