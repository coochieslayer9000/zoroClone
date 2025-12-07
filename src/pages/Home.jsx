import React, { useEffect, useState } from "react";
import Card from "../components/card/Card.jsx";

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch("https://api.consumet.org/anime/gogoanime/top-airing", {
          mode: 'cors',
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
        if (!response.ok) throw new Error('API fetch failed');
        const data = await response.json();
        setAnimes(data.results || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('API down - showing placeholders');
        // Fallback mock data for testing
        setAnimes([
          { id: 'one-piece', title: 'One Piece', image: 'https://via.placeholder.com/200x300?text=One+Piece', totalEpisodes: 1000 },
          { id: 'naruto', title: 'Naruto', image: 'https://via.placeholder.com/200x300?text=Naruto', totalEpisodes: 720 },
          { id: 'jujutsu-kaisen', title: 'Jujutsu Kaisen', image: 'https://via.placeholder.com/200x300?text=JJK', totalEpisodes: 47 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading Zoro Clone...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">ZORO CLONE</h1>
      {error && <p className="text-center text-red-400 mb-4">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {animes.map((anime) => (
          <Card key={anime.id} anime={anime} />
        ))}
      </div>
      {animes.length === 0 && <p className="text-center text-gray-400 mt-8">No anime loaded. Refresh to try again.</p>}
    </div>
  );
};

export default Home;
