import { Row } from 'antd';
import { useState, useEffect } from 'react';
import PokeCard from '../components/PokeCard';
import { PokeSearch } from '../services/PokeCall';

function PokeRegexSearch() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    allPokemon();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchPokemons([]);
      return;
    }

    try {
      const typeOf = isNaN(searchTerm);
      const regex = new RegExp(searchTerm, 'i');
      let matches = [];

      if (typeOf) {
        matches = allPokemons.filter(pokemon => regex.test(pokemon.name)).slice(0, 10);
      } else {
        matches = allPokemons.filter(pokemon => regex.test(pokemon.id)).slice(0, 10);
      }

      setSearchPokemons(matches);
    } catch (e) {
      setSearchPokemons([]);
    }
  }, [searchTerm, allPokemons]);

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


  return (
    <>
      <input
        type="text"
        placeholder="Ej: ^pi... o saur$"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      <Row justify="center">
        {searchPokemons.length > 0 ? (
          searchPokemons.map((pokemon) => (
            <PokeCard key={pokemon.name} pokemon={pokemon} />
          ))
        ) : (
          <p>{searchTerm ? "No se encontraron coincidencias regex." : "Cargando..."}</p>
        )}
      </Row>

    </>
  )
}

export default PokeRegexSearch;