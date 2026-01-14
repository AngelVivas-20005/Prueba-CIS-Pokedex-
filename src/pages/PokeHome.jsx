import { Spin } from 'antd';
import { useState, useEffect, useContext } from 'react';

import PokeCard from '../components/PokeCard';
import { PokeCall, PokeSearch } from '../services/PokeCall';
import { PokeFavoritesContext } from '../context/PokeContextFavorites';

function PokeHome() {

  const [pagePokemons, setPagePokemons] = useState([]);
  const { currentIndex, setCurrentIndex } = useContext(PokeFavoritesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    pokeFetch(currentIndex);
  }, [currentIndex]);

  const [allPokemons, setAllPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState([]);
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermNumber, setSearchTermNumber] = useState("");

  useEffect(() => {
    allPokemon();
  }, []);

  useEffect(() => {
    if (searchTermName.trim() === "" && searchTermNumber.trim() === "") {
      setIsSearching(false);
      setSearchPokemons([]);
      return;
    }

    try {

      setIsSearching(true)
      let matches = [];

      if (searchTermName !== "") {
        const regex = new RegExp(searchTermName, 'i');
        matches = allPokemons.filter(pokemon => regex.test(pokemon.name));
        console.log("ddddddddd")
      }

      if (searchTermNumber !== "") {
        const regex = new RegExp(searchTermNumber, 'i');

        matches = allPokemons.filter(pokemon => {

          let idStr = String(pokemon.id);
          let idPadded = idStr.padStart(3, '0');

          return regex.test(idStr) || regex.test(idPadded);
        });
        console.log("mmmmmmmmmm")
      }

      setSearchPokemons(matches);
      console.log(matches)
    } catch (e) {
      setSearchPokemons([]);
      setIsSearching(false);
    }
  }, [searchTermName, searchTermNumber, allPokemons]);

  const allPokemon = async () => {

    try {
      const data = await PokeSearch();
      setAllPokemons(data);

    } catch (error) {
      console.error("Error cargando los pokemons ", error);

    } finally {
      setIsLoading(false);
    }
  }

  const pokeFetch = async (id) => {
    setIsLoading(true);
    try {
      const data = await PokeCall(currentIndex);
      setPagePokemons(data);

    } catch (error) {
      console.error("Error cargando los pokemons ", error);

    } finally {
      setIsLoading(false);
    }
  }

  const lastPage = (e) => {
    e.preventDefault();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    };
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentIndex < 25) {
      setCurrentIndex(currentIndex + 1)
    };
  };

  const getPageNumbers = () => {
    const totalPages = 26;
    let start = Math.max(0, currentIndex - 2);
    let end = Math.min(totalPages - 1, start + 4);

    if (end - start < 4) {
      start = Math.max(0, end - 4);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">

      <div className='flex flex-col md:flex-row gap-4 justify-center items-stretch md:items-end mb-10 max-w-2xl sm:w-xl mx-auto'>
        
        <div className='flex flex-col flex-1'>
          <label className='mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider '>Número ID</label>
          <input
            type="text"
            placeholder="Ej: 001"
            value={searchTermNumber}
            onChange={(e) => setSearchTermNumber(e.target.value.replace(/\D/g, ''))}
            className='w-full p-3 md:p-2 text-slate-600 border bg-white rounded-xl border-slate-300 shadow-sm focus:ring-2 focus:ring-red-400 outline-none disabled:opacity-30'
            disabled={searchTermName !== ""}
          />
        </div>

        <div className='flex flex-col flex-1'>
          <label className='mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider'>Nombre</label>
          <input
            type="text"
            placeholder="Ej: Pikachu"
            value={searchTermName}
            onChange={(e) => setSearchTermName(e.target.value)}
            className='w-full p-3 md:p-2 text-slate-600 border bg-white rounded-xl border-slate-300 shadow-sm focus:ring-2 focus:ring-red-400 outline-none disabled:opacity-30'
            disabled={searchTermNumber !== ""}
          />
        </div>
      </div>

      {isLoading && !isSearching ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {isSearching ? (
            <div className="min-h-[60vh]">
              {searchPokemons.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                  {searchPokemons.map((pokemon) => (
                    <PokeCard key={pokemon.id} pokemon={pokemon} />
                  ))}
                </div>
              ) : (
                <div className="text-center mt-20 text-slate-400">
                  <p className="text-xl">No se encontraron coincidencias para tu búsqueda.</p>
                </div>
              )}
            </div>
          ) : (

            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                {pagePokemons && pagePokemons.map((pokemon) => (
                  <PokeCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>

              <div className="fixed bottom-4 left-0 right-0 flex justify-center px-2 z-50">
                <div className="flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-slate-300 shadow-lg max-w-full overflow-x-auto no-scrollbar">

                  <button
                    onClick={lastPage}
                    disabled={currentIndex === 0}
                    className="px-3 sm:px-4 py-2 bg-white border rounded-lg text-sm font-bold disabled:opacity-30 transition-colors text-slate-600 hover:bg-gray-200 flex items-center justify-center"
                  >

                    <span className="sm:hidden">←</span>

                    <span className="hidden sm:block">Anterior</span>
                  </button>

                  <div className="flex gap-1">
                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentIndex(page)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-bold transition-all ${currentIndex === page
                          ? 'bg-red-100 text-red-600 border border-red-300'
                          : 'text-slate-600 border hover:bg-gray-100'
                          }`}
                      >
                        {page + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentIndex === 25}
                    className="px-3 sm:px-4 py-2 bg-white border rounded-lg text-sm font-bold disabled:opacity-30 transition-colors text-slate-600 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <span className="sm:hidden">→</span>
                    <span className="hidden sm:block">Siguiente</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PokeHome;