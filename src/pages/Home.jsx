import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";

const Home = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("https://api.consumet.org/anime/gogoanime/top-airing")
      .then(r => r.json())
      .then(data => setAnimes(data.results || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">ZORO CLONE</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Home;
