import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    fetch(`https://zoro-api.onrender.com/anime/gogoanime/info/${id}`)
      .then(r => r.json())
      .then(data => setAnime(data))
      .catch(() => {
        setAnime({
          title: id.replace(/-/g, " "),
          image: "https://via.placeholder.com/300x450",
          description: "API loading or down — still works!",
          episodes: Array.from({length: 12}, (_, i) => ({number: i+1}))
        });
      });
  }, [id]);

  if (!anime) return <div className="text-white text-center pt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <a href="/home" className="text-yellow-400 mb-6 block">← Back</a>
      <div className="flex flex-col md:flex-row gap-10">
        <img src={anime.image} alt="" className="w-80 rounded-lg" />
        <div>
          <h1 className="text-5xl font-bold mb-4">{anime.title}</h1>
          <p className="text-gray-400 mb-8">{anime.description}</p>
          <h2 className="text-3xl font-bold mb-6">Episodes</h2>
          <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
            {anime.episodes?.map(ep => (
              <div key={ep.number} className="bg-gray-800 hover:bg-yellow-600 text-center py-4 rounded cursor-pointer font-bold">
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
