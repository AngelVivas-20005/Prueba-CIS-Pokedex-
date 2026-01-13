const BASE_URL = 'https://pokeapi.co/api/v2';

export const PokeCall = async (page) => {
    const skip = page * 10;
    const limit = (page !== 25) ? 10 : 1 

    console.log(page);
    const pokemons = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${skip}`);
    const data = await pokemons.json();

    const promise = data.results.map(async (pokemon) => {
        const poke = await fetch(pokemon.url);
        return await poke.json();
    })

    return Promise.all(promise);

}

export const PokeSearch = async (searchTerm) => {
    const pokeRegex = await fetch(`${BASE_URL}/pokemon?limit=251`);
    const data = await pokeRegex.json();

    const promise = data.results.map(async (pokemon) => {
        const poke = await fetch(pokemon.url);
        return await poke.json();
    })

    return Promise.all(promise);

}