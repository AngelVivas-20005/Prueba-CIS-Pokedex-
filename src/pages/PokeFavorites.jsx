import { useContext } from 'react';
import { PokeFavoritesContext } from '../context/PokeContextFavorites';
import PokeCard from '../components/PokeCard';
import { Empty } from 'antd';

function PokeFavorites() {
    const { favorites } = useContext(PokeFavoritesContext);

    return (
        <div className='p-4'>
            {favorites.length === 0 ? (
                <Empty description="No tienes pokémon guardados en favoritos" className='p-10'/>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
                    {favorites.map((pokemon) => (
                        <PokeCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default PokeFavorites;