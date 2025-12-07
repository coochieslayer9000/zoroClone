import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card.jsx";

const Home = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("https://zoro-api.onrender.com/anime/gogoanime/top-airing")
      .then(r => r.json())
      .then(data => setAnimes(data.results || []))
      .catch(() => {
        // fallback if API down
        setAnimes([
          { id: "one-piece", title: "One Piece", image: "https://i.imgur.com/8v3z4pP.jpg", totalEpisodes: 1100 },
          { id: "bleach", title: "Bleach", image: "https://i.imgur.com/7b8K9jD.jpg", totalEpisodes: 366 }
        ]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-center mb-8 text-yellow-400">ZORO CLONE</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {animes.map(anime => (
          <Card key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Home;
