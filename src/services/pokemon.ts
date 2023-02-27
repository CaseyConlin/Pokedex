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

const baseUrl = "https://pokeapi.co/api/v2";

export const getPokemonList = async (
  offset: number
): Promise<PokemonLite[]> => {
  const response = await fetch(`${baseUrl}/pokemon?limit=20&offset=${offset}`);
  const data: PokeApiResults = await response.json();
  return data.results;
};

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`${baseUrl}/pokemon/${name.toLowerCase()}`);
  if (response.status === 404) {
    throw Error(
      "Shoot, that Pokemon's not in the Pokedex, please enter a valid Pokemon."
    );
  }
  const data = await response.json();

  return { name: data.name, id: data.id, image: data.sprites.front_default };
};

export const getPokemonByUrl = async (url: string): Promise<Pokemon> => {
  const response = await fetch(url);
  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    image: data.sprites.front_default,
    types: data.types.map((type: any) => type.type.name),
    stats: data.stats.map((stat: any) => ({
      baseStat: stat.base_stat,
      effort: stat.effort,
      name: stat.stat.name,
    })),
  };
};
