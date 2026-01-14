import { Card, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
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
        description={
          <div style={{ marginTop: '10px' }}>

              {pokemon.types.map((t) => (
                <img
                  key={t.type.name}
                  src={getTypeIconUrl(t.type.name)}
                  alt={t.type.name}
                  title={t.type.name}
                  style={{
                    width: '50px',
                    filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))'
                  }}
                />
              ))}
          </div>
        }
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