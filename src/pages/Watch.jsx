import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`)
      .then(r => r.json())
      .then(data => {
        setAnime(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-screen text-3xl text-white">Loading...</div>;
  if (!anime) return <div className="flex items-center justify-center h-screen text-red-500 text-2xl">Anime not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <a href="/home" className="text-blue-400 mb-6 inline-block text-xl">← Back</a>
      <div className="flex flex-col lg:flex-row gap-10">
        <img src={anime.image} alt={anime.title} className="w-80 rounded-xl shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold mb-4">{anime.title}</h1>
          <p className="text-gray-300 mb-8 text-lg">{anime.description || "No description."}</p>
          <h2 className="text-3xl font-bold mb-6">Episodes</h2>
          <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-4">
            {anime.episodes?.map(ep => (
              <div key={ep.id} className="bg-gray-800 hover:bg-blue-600 text-center py-4 rounded-lg cursor-pointer font-bold text-lg">
                {ep.number}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
