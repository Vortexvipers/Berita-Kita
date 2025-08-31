import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/api/kompasNews")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <div className="p-5 font-sans">
      <h1 className="text-3xl font-bold mb-4">📰 Berita Kita</h1>
      <Link href="/search" className="text-blue-600 underline">Cari Berita 🔍</Link>
      <div className="grid gap-4 mt-5">
        {news.map((item, i) => (
          <a
            key={i}
            href={`/api/kompasDetail?url=${encodeURIComponent(item.link)}`}
            className="border rounded-xl p-3 shadow hover:bg-gray-100"
          >
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
          </a>
        ))}
      </div>
    </div>
  );
              }
