/**
 * This file helps separate the API call
 * from the React application so we can
 * create a data type that we control
 * instead of relying on the API to never
 * change.
 */
export const getPokemon = async () => {
  let stats: Pokemon[] = [];
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();

  for (const result of data.results) {
    const response2 = await fetch(result.url);
    const data2 = await response2.json();
    const pokemonStats = {
      key: data2.id,
      name: data2.species.name,
      url: data2.species.url,
      front_image: data2.sprites.front_default,
    };
    stats.push(pokemonStats);
  }
  return stats;
};
