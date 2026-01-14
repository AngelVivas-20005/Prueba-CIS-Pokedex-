import { useState } from 'react'

import { Card, Button } from 'antd';
import { HeartOutlined, HeartFilled, SwapOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokeFavoritesContext } from '../context/PokeContextFavorites';

const { Meta } = Card;

const PokeCard = ({ pokemon }) => {

  const { favorites, addFavorite, removeFavorite } = useContext(PokeFavoritesContext);
  const [showPixel, setShowPixel] = useState(false);
  const navigate = useNavigate();

  const isPokeFavorite = favorites.some(fav => fav.id === pokemon.id);

  const getTypeIconUrl = (typeName) => {
    return `/icons/${typeName.toLowerCase()}.png`;
  };

  const changeState = (e) => {
    e.stopPropagation();
    if (isPokeFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  }

  const toggleImage = (e) => {
    e.stopPropagation();
    setShowPixel(!showPixel);
  }

  return (
    <div
      onClick={() => navigate(`/poke-data/${pokemon.id}`)}
      className="
        relative group cursor-pointer 
        w-full max-w-280 m-4 p-4
        flex flex-col items-center justify-between
        bg-white
        rounded-2xl 
        border border-slate-400 
        shadow-sm hover:shadow-xl
        transition-all duration-300  
        hover:-translate-y-3
        hover:border-red-500
        hover:scale-105"
    >

      <button
        onClick={toggleImage}
        className="absolute top-3 right-3 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors z-10"
        title="Cambiar diseño"
      >
        <SwapOutlined rotate={90} />
      </button>
      <div className="w-28 h-28 mb-4 relative flex items-center justify-center">


        <img
          alt={`${pokemon.name} artwork`}
          src={pokemon.sprites.other['official-artwork'].front_default}
          className={`absolute w-28 transition-opacity duration-500 ease-in-out ${showPixel ? 'opacity-0' : 'opacity-100'
            }`}
        />

        <img
          alt={`${pokemon.name} pixel`}
          src={pokemon.sprites.front_default}
          className={`absolute w-28 rendering-pixelated transition-opacity duration-500 ease-in-out resize-162 ${showPixel ? 'opacity-100' : 'opacity-0'
            }`}
        />
      </div>

      <div className="text-center mb-2">
        <span className="text-xs font-bold text-slate-400 block mb-1">
          #{String(pokemon.id).padStart(3, '0')}
        </span>
        <h3 className="text-xl font-black capitalize text-slate-800">
          {pokemon.name}
        </h3>
      </div>

      <div className="flex justify-center gap-2 w-full mb-4">
        {pokemon.types.map((t) => (
          <div
            key={t.type.name}
            className="flex items-center"
          >
            <img
              src={getTypeIconUrl(t.type.name)}
              alt={t.type.name}
              className="w-16 h-6"
            />
          </div>
        ))}
      </div>

      <button
        onClick={changeState}
        className={`
          w-full py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all
          ${isPokeFavorite
            ? 'bg-red-100 text-red-600 border border-red-300'
            : 'text-slate-600 border hover:bg-gray-200'
          }
        `}
      >
        {isPokeFavorite ? <HeartFilled /> : <HeartOutlined />}
        {isPokeFavorite ? 'Es tu favorito' : 'Añadir a favoritos'}
      </button>

    </div>
  );
}

export default PokeCard;