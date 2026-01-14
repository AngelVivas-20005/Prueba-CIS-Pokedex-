import { Row, Spin } from 'antd';
import { useState, useEffect } from 'react';
import PokeCard from '../components/PokeCard';
import { PokeCall } from '../services/PokeCall';

function PokeHome() {

  const [pagePokemons, setPagePokemons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    pokeFetch(currentIndex);
  }, [currentIndex]);

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

  const lastPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    };
  };

  const nextPage = () => {
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
    <div className="max-w-7xl mx-auto px-4 py-8">

      {isLoading ? (
        <div className="flex justify-center items-center min-h-400">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col gap-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {pagePokemons && pagePokemons.map((pokemon) => (
              <PokeCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-8 mb-12">
            <button
              onClick={lastPage}
              disabled={currentIndex === 0 || isLoading}
              className="px-4 py-2 bg-white border rounded-lg text-sm font-semibold disabled:opacity-10 transition-colors text-slate-600 hover:bg-red-100"
            >
              Anterior
            </button>

            <div className="flex gap-1">
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentIndex(page)}
                  disabled={isLoading}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentIndex === page
                    ? 'bg-red-100 text-red-600 shadow-md shadow-black-200 border border-red-300'
                    : 'text-slate-600 border hover:bg-red-100'
                    }`}
                >
                  {page + 1}
                </button>
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentIndex === 25 || isLoading}
              className="px-4 py-2 bg-white border rounded-lg text-sm font-semibold disabled:opacity-100 transition-colors text-slate-600 hover:bg-red-100"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokeHome;