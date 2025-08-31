/**
✨ Fitur: Kompas ( Search Berita )
📝 Creator: Rijalganzz
🔥 Sumber Ch 1: https://whatsapp.com/channel/0029Vb6ru1s2Jl87BaI4RJ1H
🔥 Sumber Ch 2: https://whatsapp.com/channel/0029Vb69G8eE50UgA7ZlyV1Q
**/

import axios from "axios"

export default async function handler(req, res) {
  try {
    // ambil query dari request → default "dpr"
    const { q = "dpr" } = req.query

    // ambil data dari API pihak ketiga (api-furina)
    const { data } = await axios.get(`https://api-furina.vercel.app/berita/kompas?q=${encodeURIComponent(q)}`)

    if (!data?.status || !data.result?.length) {
      return res.status(404).json({ status: false, message: "Berita tidak ditemukan" })
    }

    // format response API
    let result = data.result.map((v, i) => ({
      no: i + 1,
      title: v.title,
      published_at: v.published_at,
      url: v.url,
      thumbnail: v.thumbnail
    }))

    res.status(200).json({
      status: true,
      source: "Berita Kompas",
      creator: "Rijalganzz",
      total: result.length,
      result
    })

  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal mengambil data berita",
      error: err.message
    })
  }
}
