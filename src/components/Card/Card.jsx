import React from "react";
import { Link } from "react-router-dom";

const Card = ({ anime }) => {
  return (
    <Link to={`/watch/${anime.id}`} className="group block relative overflow-hidden rounded-lg shadow-2xl">
      <img
        src={anime.image}
        alt={anime.title}
        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
      <div className="absolute bottom-0 p-4 text-white">
        <h3 className="font-bold text-lg line-clamp-2">{anime.title}</h3>
        <p className="text-sm">Ep {anime.totalEpisodes || "?"}</p>
      </div>
    </Link>
  );
};

export default Card;
