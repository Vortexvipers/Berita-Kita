import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchNews = async () => {
    const res = await fetch(`/api/kompas?q=${query}`);
    const data = await res.json();
    setResults(data.result);
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">🔍 Cari Berita</h1>
      <input
        type="text"
        placeholder="Cari berita..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-2/3"
      />
      <button onClick={searchNews} className="ml-2 bg-blue-600 text-white px-3 py-2 rounded">
        Cari
      </button>

      <div className="mt-5">
        {results.map((v, i) => (
          <a
            key={i}
            href={`/api/kompasDetail?url=${encodeURIComponent(v.url)}`}
            className="block border-b py-3"
          >
            <h2 className="text-lg font-semibold">{v.title}</h2>
            <p className="text-sm text-gray-600">{v.published_at}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
