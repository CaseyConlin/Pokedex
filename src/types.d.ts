type PokemonLite = {
  name: string;
  url: string;
  id: string;
};

type PokemonListResults = {
  results: PokemonLite[];
  count: number;
};

type State = {
  name: string;
  baseStat: number;
  effort: number;
};

type Pokemon = {
  id: string;
  name: string;
  image: string;
  description?: string;
  types?: Types[];
  stats?: Stats[];
};

type FocusPokemon = {
  id: string;
  name: string;
  image: string;
  weight: number;
  height: number;
  description: string;
  abilities: Abilities[];
  types: Types[];
  stats: Stats[];
};

declare module "*.svg" {
  const content: any;
  export default content;
}
