import React from "react";
import { Link } from "react-router-dom";

const Card = ({ anime }) => {
  if (!anime || !anime.id) {
    return (
      <div className="w-full h-64 bg-gray-800 rounded-lg animate-pulse shadow-lg"></div>
    );
  }

  return (
    <Link to={`/watch/${anime.id}`} className="block group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800">
      <img
        src={anime.image || 'https://via.placeholder.com/200x300/4a5568/ffffff?text=Anime'}
        alt={anime.title || 'Anime Poster'}
        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300/4a5568/ffffff?text=No+Image'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-bold text-lg line-clamp-2">{anime.title}</h3>
        <p className="text-sm opacity-90">Ep {anime.totalEpisodes || "?"}</p>
      </div>
    </Link>
  );
};

export default Card;
