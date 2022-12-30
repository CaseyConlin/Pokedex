/**
 * This file helps separate the API call
 * from the React application so we can
 * create a data type that we control
 * instead of relying on the API to never
 * change.
 */

type PokeApiResults = {
  results: { name: string; url: string }[];
};

type PokeApiPokemon = {
  id: string;
  species: { name: string; url: string };
  sprites: { front_default: string };
};

export const getPokemon = async () => {
  let stats: Pokemon[] = [];
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data: PokeApiResults = await response.json();

  for (const result of data.results) {
    const response2 = await fetch(result.url);
    const data2: PokeApiPokemon = await response2.json();
    const pokemonStats: Pokemon = {
      key: data2.id,
      name: data2.species.name,
      url: data2.species.url,
      front_image: data2.sprites.front_default,
    };
    stats.push(pokemonStats);
  }
  return stats;
};
