import React from "react";
import { Link } from "react-router-dom";

const Card = ({ anime }) => {
  return (
    <Link to={`/watch/${anime.id}`} className="group block relative overflow-hidden rounded-lg shadow-lg">
      <img
        src={anime.image}
        alt={anime.title}
        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 group-hover:translate-y-0 transition">
        <h3 className="font-bold text-lg line-clamp-2">{anime.title}</h3>
        <p className="text-sm opacity-90">Ep {anime.totalEpisodes || "??"}</p>
      </div>
    </Link>
  );
};

export default Card;
