import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card.jsx";

const Home = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("https://zoro-api.onrender.com/anime/gogoanime/top-airing")
      .then(r => r.json())
      .then(data => setAnimes(data.results || []))
      .catch(() => setAnimes([
        { id: "one-piece", title: "One Piece", image: "https://via.placeholder.com/200x300?text=OP", totalEpisodes: 1100 },
        { id: "bleach", title: "Bleach", image: "https://via.placeholder.com/200x300?text=Bleach", totalEpisodes: 366 },
        { id: "naruto", title: "Naruto", image: "https://via.placeholder.com/200x300?text=Naruto", totalEpisodes: 720 }
      ]));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">ZORO CLONE</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {animes.map(anime => <Card key={anime.id} anime={anime} />)}
      </div>
    </div>
  );
};

export default Home;
