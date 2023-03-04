import { useEffect, useRef, useState, RefObject } from "react";
import { getPokemonByUrl } from "../../services/pokemon";
import { SinglePokemonComponent } from "./single-pokemon";
import { styled } from "../../stitches.config";
import { PokemonCard } from "../UI/PokemonCard";
import { Container } from "../UI/Container";

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

const StatContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const StatListTitle = styled("div", {
  textAlign: "center",
  paddingTop: "15px",
  marginBottom: "5px",
  width: "100%",
  fontSize: "16px",
});

const DefinitionList = styled("dl", {
  display: "flex",
  flexFlow: "column",
  justifyContent: "flex-start",
  marginLeft: "0px",
  padding: "0px",
  width: "100%",
  listStyle: "none",
  fontSize: "12px",
});

const DefinitionContainer = styled("div", {
  margin: "5px",
  padding: "0px",
  display: "flex",
  width: "100%",
  justifyContent: "center",
  textAlign: "left",
});

const DefinitionTitle = styled("dt", {
  margin: "0px",
  padding: "0px",
  textAlign: "left",
  justifySelf: "flex-start",
  width: "25%",
  flexGrow: "1",
  listStyle: "none",
});

const DefinitionDescription = styled("dd", {
  margin: "0px",
  padding: "0 20px",
  justifySelf: "flex-end",
  textAlign: "left",
});

export const SinglePokemonComponentFetchContainer = ({
  name,
  url,
}: {
  name: string;
  url: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const pokemon = useFetchPokemonOnLoad(ref, url);
  const [showBack, setShowBack] = useState(false);

  if (!pokemon) {
    return (
      <PokemonCard data-testid={`pokemon-observer-${name}`} ref={ref} disabled>
        <div>
          <p>Loading {name}...</p>
        </div>
      </PokemonCard>
    );
  }

  return (
    <PokemonCard
      data-testid={`pokemon-observer${name}`}
      ref={ref}
      onClick={() => setShowBack(!showBack)}
    >
      {showBack ? (
        <StatContainer>
          <StatListTitle>
            {`${name.charAt(0).toUpperCase() + name.slice(1)} `}
          </StatListTitle>
          <DefinitionList>
            {pokemon.stats?.map((stat) => (
              <DefinitionContainer key={stat.name}>
                <DefinitionTitle>{stat.name}</DefinitionTitle>
                <DefinitionDescription>
                  {stat.baseStat} / {stat.effort}
                </DefinitionDescription>
              </DefinitionContainer>
            ))}
          </DefinitionList>
        </StatContainer>
      ) : (
        <SinglePokemonComponent {...pokemon} />
      )}
    </PokemonCard>
  );
};
