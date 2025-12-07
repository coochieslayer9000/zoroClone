import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card.jsx";  // .jsx added

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.consumet.org/anime/gogoanime/top-airing", { mode: 'cors' })  // CORS fix
      .then(r => {
        if (!r.ok) throw new Error('Fetch failed');
        return r.json();
      })
      .then(data => {
        setAnimes(data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        // Fallback data if API down
        setAnimes([{ id: 'test', title: 'Test Anime', image: 'https://via.placeholder.com/200x300?text=Anime', totalEpisodes: 12 }]);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-white text-2xl">Loading Zoro Clone...</div></div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">ZORO CLONE</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {animes.map((anime) => (
          <Card key={anime.id} anime={anime} />
        ))}
      </div>
      {animes.length === 0 && <p className="text-center text-gray-400 mt-8">No anime loaded. Check console.</p>}
    </div>
  );
};

export default Home;
