import { useContext } from 'react';
import { PokeFavoritesContext } from '../context/PokeContextFavorites';
import PokeCard from '../components/PokeCard';
import { Row, Empty } from 'antd';

function PokeFavorites() {
    const { favorites } = useContext(PokeFavoritesContext); 

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Mis Favoritos</h1>
            {favorites.length === 0 ? (
                <Empty description="No tienes pokémon guardados en favoritos" />
            ) : (
                <Row justify="center">
                    {favorites.map(pokemon => (
                        <PokeCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </Row>
            )}
        </div>
    )
}

export default PokeFavorites;