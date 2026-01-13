import { Card, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokeFavoritesContext } from '../context/PokeContextFavorites';

const { Meta } = Card;

const PokeCard = ({ pokemon }) => {

  const { favorites, addFavorite, removeFavorite } = useContext(PokeFavoritesContext);
  const navigate = useNavigate();

  const isPokeFavorite = favorites.some(fav => fav.id === pokemon.id);

  const changeState = (e) => {
    e.stopPropagation();
    if (isPokeFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  }

  return (
    <Card
      hoverable
      style={{ width: 200, margin: '10px', textAlign: 'center' }}
      cover={
        <img
          alt={pokemon.name}
          src={pokemon.sprites.other['official-artwork'].front_default}
          style={{ padding: '20px' }}
        />
      }
      onClick={() => navigate(`/poke-data/${pokemon.id}`)}
    >
      <Meta
        title={`${pokemon.name.toUpperCase()} #${pokemon.id}`}
        description={`Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}`}
      />
      <Button
        type="text"
        icon={isPokeFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
        onClick={changeState}
        style={{ marginTop: '10px' }}
      >
        {isPokeFavorite ? 'Quitar' : 'Favorito'}
      </Button>
    </Card>
  );
}

export default PokeCard;