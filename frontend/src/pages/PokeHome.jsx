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
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <h1 style={{ textAlign: 'center' }}>
            Pokédex - Primeras dos Generaciones
          </h1>
          <Row justify="center">
            {pagePokemons && pagePokemons.map((pokemon) => (
              <PokeCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </Row>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
   
            <button onClick={lastPage} disabled={currentIndex === 0 || isLoading}>
              Anterior
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                shape="circle"
                type={currentIndex === page ? 'primary' : 'default'}
                onClick={() => setCurrentIndex(page)}
                disabled={isLoading}
              >
                {page + 1}
              </button>
            ))}

            <button onClick={nextPage} disabled={currentIndex === 25 || isLoading}>
              Siguiente
            </button>

          </div>

        </div>


      )}
    </>
  );
}

export default PokeHome;