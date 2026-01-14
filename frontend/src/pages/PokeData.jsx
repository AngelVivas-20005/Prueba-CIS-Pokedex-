import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Spin } from 'antd';
import { ArrowLeftOutlined, SwapOutlined, StarFilled } from '@ant-design/icons';

function PokeData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPixel, setShowPixel] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    pokeFetch();
  }, [id]);

  const pokeFetch = async () => {
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await respuesta.json();
      setPokemon(data);
    } catch (error) {
      console.error("Error cargando los pokemons ", error)
    } finally {
      setIsLoading(false);
    }
  }

  const getTypeIconUrl = (typeName) => {
    return `/icons/${typeName.toLowerCase()}.png`;
  };

  const getPokemonImage = () => {
    if (showPixel) {
      return isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;
    } else {
      return isShiny
        ? pokemon.sprites.other['official-artwork'].front_shiny
        : pokemon.sprites.other['official-artwork'].front_default;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 flex flex-col items-center">
      {isLoading || !pokemon ? (
        <div className="flex justify-center items-center h-48">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full max-w-lg justify-items-center">

          <button
            onClick={() => navigate(-1)}
            className="text-slate-600 border hover:bg-gray-200 mt-3 mb-3 flex items-center gap-1 px-2 py-1 border-slate-800 rounded-lg text-sm font-medium transition-all active:translate-y-0.5 active:shadow-none"
          >
            <ArrowLeftOutlined /> Volver
          </button>

          <div className="bg-whiteborder-2 border-slate-800 border-2 rounded-2xl overflow-hidden">

            <div className="px-3 py-2 border-b-2 border-slate-800 flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                {pokemon.name}
              </h1>
              <span className="text-lg font-black text-black opacity-80">
                #{String(pokemon.id).padStart(3, '0')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">

              <div className="relative flex items-center justify-center bg-slate-50 border-b-2 md:border-b-0 md:border-r-2 border-slate-800 p-4 min-h-[250px]">
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => setShowPixel(!showPixel)}
                    className={`p-2 rounded-xl border-2 border-slate-800 transition-all active:shadow-none ${showPixel ? 'bg-red-100 text-red-600 border-red-300' : 'bg-white text-slate-600 hover:bg-gray-200'}`}
                    title="Alternar Pixel Art"
                  >
                    <SwapOutlined rotate={90} />
                  </button>

                  <button
                    onClick={() => setIsShiny(!isShiny)}
                    className={`p-2 rounded-xl border-2 border-slate-800 transition-all active:shadow-none ${isShiny ? 'bg-yellow-200 text-slate-900' : 'bg-white text-slate-800'}`}
                    title="Alternar versión Shiny"
                  >
                    <StarFilled />
                  </button>
                </div>

                {/* Contenedor de imagen responsivo */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                  <img
                    key={getPokemonImage()}
                    src={getPokemonImage()}
                    alt={pokemon.name}
                    className={`
      absolute transition-all duration-300 animate-fade-in drop-shadow-2xl
      ${showPixel
                        ? 'w-44 h-44 rendering-pixelated scale-[1.42]' // Aquí forzamos el tamaño del pixel
                        : 'w-full h-full object-contain scale-100'    // El artwork normal se mantiene igual
                      }
    `}
                  />
                </div>
              </div>

              {/* SECCIÓN DETALLES: Textos más pequeños */}
              <div className="flex flex-col text-sm">

                {/* Info Técnica */}
                <div className="p-2 border-b-2 border-slate-800 rounded-lg" >
                  <h2 className="font-medium mb-3 text-slate-600">Información</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className=" p-1 border border-slate-300 rounded-lg">
                      <span className="block text-[14px] font-medium text-slate-600 ">Altura</span>
                      <span className='font-bold'>{pokemon.height / 10} m</span>
                    </div>
                    <div className="p-2  border border-slate-300 rounded-lg">
                      <span className="block text-[14px] font-medium text-slate-600">Peso</span>
                      <span className="font-bold">{pokemon.weight / 10} kg</span>
                    </div>
                  </div>
                </div>

                {/* Habilidades */}
                <div className="p-2 border-b-2 border-slate-800  bg-white rounded-lg">
                  <h2 className="font-medium mb-3 text-slate-600 justify-content: center ">Habilidades</h2>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {pokemon.abilities.map(a => (
                      <span key={a.ability.name} className="px-2 py-0.5 bg-white border border-slate-300 rounded font-bold capitalize text-[11px]">
                        {a.ability.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2 bg-white ">
                  <h2 className="font-medium mb-1 text-slate-600 justify-content: center ">Tipos</h2>
                  <div className="flex gap-3 items-center justify-center">
                    {pokemon.types.map(t => (
                      <div key={t.type.name} className="flex items-center justify-center gap-2">
                        <img
                          src={getTypeIconUrl(t.type.name)}
                          alt={t.type.name}
                          className="w-18 h-7 object-contain"
                        />

                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="md:col-span-2 p-5 bg-slate-50 border-t-2 border-slate-800">
              <h2 className="font-medium mb-3 text-slate-600 justify-content: center">
                Movimientos que {pokemon.name} puede aprender
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-45 overflow-y-auto pr-2 custom-scrollbar">
                {pokemon.moves.map((m) => (
                  <div
                    key={m.move.name}
                    className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-[10px] font-bold text-slate-800 capitalize hover:-translate-y-1 hover:scale-0.5 hover:border-black transition-all flex items-center justify-center text-center shadow-sm"
                  >
                    {m.move.name.replace('-', ' ')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokeData;