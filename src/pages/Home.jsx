import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://zoro-api.onrender.com/anime/gogoanime/top-airing")
      .then((res) => res.json())
      .then((data) => {
        setAnimes(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAnimes([
          { id: "one-piece", title: "One Piece", image: "https://via.placeholder.com/200x300?text=One+Piece", totalEpisodes: 1000 },
          { id: "naruto", title: "Naruto", image: "https://via.placeholder.com/200x300?text=Naruto", totalEpisodes: 720 },
          { id: "jujutsu-kaisen", title: "Jujutsu Kaisen", image: "https://via.placeholder.com/200x300?text=JJK", totalEpisodes: 47 },
          { id: "demon-slayer", title: "Demon Slayer", image: "https://via.placeholder.com/200x300?text=DS", totalEpisodes: 55 },
          { id: "attack-on-titan", title: "Attack on Titan", image: "https://via.placeholder.com/200x300?text=AOT", totalEpisodes: 89 },
          { id: "death-note", title: "Death Note", image: "https://via.placeholder.com/200x300?text=DN", totalEpisodes: 37 }
        ]);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen text-2xl">Loading Zoro...</div>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">ZORO CLONE 🔥</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {animes.map((anime) => (
          <Card key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Home;
