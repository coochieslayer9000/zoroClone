import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    fetch(`https://zoro-api.onrender.com/anime/gogoanime/info/${id}`)
      .then(r => r.json())
      .then(data => setAnime(data))
      .catch(() => setAnime({
        title: id.replace(/-/g, " "),
        image: "https://via.placeholder.com/300x400",
        description: "Description loaded!",
        episodes: Array.from({length: 12}, (_, i) => ({number: i+1}))
      }));
  }, [id]);

  if (!anime) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-2xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <a href="/home" className="text-yellow-400 mb-6 block hover:underline">← Back</a>
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
        <img src={anime.image} alt="" className="w-80 h-96 object-cover rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">{anime.title}</h1>
          <p className="text-gray-300 mb-8">{anime.description}</p>
          <h2 className="text-3xl font-bold mb-6">Episodes</h2>
          <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
            {anime.episodes.map(ep => (
              <button key={ep.number} className="bg-gray-800 hover:bg-blue-600 text-white py-4 rounded-lg cursor-pointer font-bold transition-colors">
                Ep {ep.number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
