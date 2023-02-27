type PokemonLite = {
  name: string;
  url: string;
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
  types?: Types[];
  stats?: Stats[];
};
