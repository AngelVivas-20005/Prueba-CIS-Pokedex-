import { useState, useEffect, useContext } from 'react';
import { PokeFavoritesContext } from '../context/PokeContextFavorites';
import PokeCard from '../components/PokeCard';
import PaginationBar from '../components/PaginationBar';

function PokeFavorites() {
  const { favorites } = useContext(PokeFavoritesContext);
  const [pagePokemons, setPagePokemons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setPagePokemons(favorites.slice((currentIndex * 12), ((currentIndex * 12) + 12)))
  },[currentIndex, favorites]);


  return (
    <div className='p-4'>
      {favorites.length === 0 ? (
        <Empty description="No tienes pokémon guardados en favoritos" className='p-10' />
      ) : (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
          {pagePokemons.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))}

          <PaginationBar
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            totalPages={Math.ceil(favorites.length / 10)}
          />

        </div>
      )}
    </div>
  )
}

export default PokeFavorites;