import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`, { mode: 'cors' })
      .then(r => {
        if (!r.ok) throw new Error('Anime not found');
        return r.json();
      })
      .then(data => {
        setAnime(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-3xl">Loading...</div>;
  if (!anime) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-2xl">Anime not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link to="/home" className="text-blue-400 mb-6 inline-block text-xl hover:underline">← Back to Home</Link>
      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
        <img 
          src={anime.image} 
          alt={anime.title} 
          className="w-80 h-96 object-cover rounded-xl shadow-2xl" 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=Anime+Poster'; }}
        />
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">{anime.title}</h1>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">{anime.description || "No description available."}</p>
          <div className="flex gap-4 mb-8">
            <span className="bg-blue-600 px-4 py-2 rounded text-sm">Status: {anime.status}</span>
            <span className="bg-green-600 px-4 py-2 rounded text-sm">Eps: {anime.totalEpisodes}</span>
          </div>
          <h2 className="text-3xl font-bold mb-6">Episodes</h2>
          <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-4">
            {anime.episodes?.map(ep => (
              <button
                key={ep.id}
                className="bg-gray-800 hover:bg-blue-600 text-white py-4 px-2 rounded-lg cursor-pointer font-bold text-lg transition-colors"
                onClick={() => alert(`Play Episode ${ep.number}`)}  // Temp button action
              >
                Ep {ep.number}
              </button>
            )) || <p className="col-span-full text-center text-gray-400">No episodes loaded.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
