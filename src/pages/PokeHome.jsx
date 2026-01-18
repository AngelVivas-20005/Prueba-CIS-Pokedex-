import { Spin } from 'antd';
import { useState, useEffect, useContext } from 'react';

import PokeCard from '../components/PokeCard';
import PaginationBar from '../components/PaginationBar';
import { PokeCall, PokeSearch } from '../services/PokeCall';


function PokeHome() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [pagePokemons, setPagePokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState(0);
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermNumber, setSearchTermNumber] = useState("");
  const [searchPages, setSearchPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    pokeFetch(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    allPokemon();
  }, []);

  useEffect(() => {
    setSearchIndex(0);
  }, [searchTermName, searchTermNumber]);

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
      }

      if (searchTermNumber !== "") {
        const regex = new RegExp(searchTermNumber, 'i');

        matches = allPokemons.filter(pokemon => {

          let idStr = String(pokemon.id);
          let idPadded = idStr.padStart(3, '0');

          return regex.test(idStr) || regex.test(idPadded);
        });

      }
      setSearchPages(matches.length / 10)
      setSearchPokemons(matches.slice(searchIndex * 10, (searchIndex * 10) + 10));

    } catch (e) {
      setSearchPokemons([]);
      setIsSearching(false);
    }
  }, [searchIndex, searchTermName, searchTermNumber, allPokemons]);

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

                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">

                    {searchPokemons.map((pokemon) => (
                      <PokeCard key={pokemon.id} pokemon={pokemon}

                      />
                    ))}
                  </div>

                  <PaginationBar
                    currentIndex={searchIndex}
                    setCurrentIndex={setSearchIndex}
                    totalPages={(Math.ceil(searchPages))}
                  />

                </>
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

              <PaginationBar
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                totalPages={130}
              />

            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PokeHome;