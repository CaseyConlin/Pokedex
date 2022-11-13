/**
 * This file helps separate the API call
 * from the React application so we can
 * create a data type that we control
 * instead of relying on the API to never
 * change.
 */

export const getPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  return data.results.map((result) => ({
    name: result.name,
    url: result.url,
  }));
};
