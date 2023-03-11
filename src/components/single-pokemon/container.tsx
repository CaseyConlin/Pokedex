import { useEffect, useRef, useState, RefObject } from "react";
import { getPokemonByUrl } from "../../services/pokemon";
import { SinglePokemonComponent } from "./single-pokemon";
import { PokemonCard } from "../UI/PokemonCard";

const useFetchPokemonOnLoad = (
  ref: RefObject<HTMLButtonElement>,
  url: string
) => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    if (pokemon || !ref.current) return;
    const refCurrent = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      // If pokemon not set and Button is on page, load Pokemon.
      if (!pokemon && entry.isIntersecting)
        getPokemonByUrl(url).then(setPokemon);
    });
    if (refCurrent) observer.observe(refCurrent);
    return () => observer.unobserve(refCurrent);
  }, [pokemon, url, ref]);

  return pokemon;
};

export const SinglePokemonComponentFetchContainer = ({
  name,
  url,
  focus,
}: {
  name: string;
  url: string;
  focus: (name: string) => void;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const pokemon = useFetchPokemonOnLoad(ref, url);

  if (!pokemon) {
    return (
      <PokemonCard ref={ref} disabled>
        <div>
          <p>Loading {name}...</p>
        </div>
      </PokemonCard>
    );
  }

  return (
    <PokemonCard ref={ref} onClick={() => focus(name)}>
      <SinglePokemonComponent {...pokemon} />
    </PokemonCard>
  );
};
