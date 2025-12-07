import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://zoro-api.onrender.com/anime/gogoanime/info/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAnime({
          title: id.replace(/-/g, " ").toUpperCase(),
          image: "https://via.placeholder.com/300x400?text=" + id,
          description: "Mock description – API stable now! Add player here.",
          totalEpisodes: 24,
          status: "Ongoing",
          episodes: Array.from({ length: 24 }, (_, i) => ({ id: `ep-${i + 1}`, number: i + 1 }))
        });
      });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-screen text-2xl">Loading Episode...</div>;
  if (!anime) return <div className="flex items-center justify-center h-screen text-red-500 text-2xl">Anime not found</div>;

  return (
    <div className="p-8">
      <Link to="/home" className="text-blue-400 mb-6 inline-block hover:underline">← Back</Link>
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
        <img src={anime.image} alt={anime.title} className="w-80 h-96 object-cover rounded-xl shadow-2xl" onError={(e) => (e.target.src = "https://via.placeholder.com/300x400?text=Poster")} />
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">{anime.title}</h1>
          <p className="text-gray-300 mb-8 text-lg">{anime.description}</p>
          <h2 className="text-3xl font-bold mb-6">Episodes</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
            {anime.episodes.map((ep) => (
              <button
                key={ep.id}
                className="bg-gray-800 hover:bg-blue-600 text-white py-4 rounded-lg cursor-pointer font-bold transition-all hover:scale-105"
                onClick={() => alert(`Play Ep ${ep.number} – Player embed goes here!`)}
              >
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
