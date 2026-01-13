import { Card, Descriptions, Button, Spin, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PokeData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    pokeFetch();
  }, [id]);

  const pokeFetch = async () => {
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await respuesta.json(); // FALTABA ESTA LÍNEA
      setPokemon(data);
    } catch (error) {
      console.error("Error cargando los pokemons ", error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading || !pokemon ? ( 
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
            Volver
          </Button>

          <Card title={pokemon.name.toUpperCase()} bordered={false}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                style={{ width: '200px' }}
              />
            </div>

            <Descriptions title="Información Técnica" bordered column={1}>
              <Descriptions.Item label="Número Pokedex">#{pokemon.id}</Descriptions.Item>
              <Descriptions.Item label="Altura">{pokemon.height / 10} m</Descriptions.Item>
              <Descriptions.Item label="Peso">{pokemon.weight / 10} kg</Descriptions.Item>
              <Descriptions.Item label="Habilidades">
                {pokemon.abilities.map(a => (
                  <Tag color="blue" key={a.ability.name}>{a.ability.name}</Tag>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Tipos">
                {pokemon.types.map(t => (
                  <Tag color="green" key={t.type.name}>{t.type.name}</Tag>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      )}
    </>
  )
}

export default PokeData;