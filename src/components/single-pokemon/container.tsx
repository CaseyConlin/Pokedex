import { useEffect, useRef, useState, RefObject, Fragment } from "react";
import { getPokemonByUrl } from "../../services/pokemon";
import { SinglePokemonComponent } from "./single-pokemon";
import { styled } from "../../stitches.config";

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

const Button = styled("button", {
  height: 200,
  background: "$white",
  border: "1px #ccc solid",
  padding: "24px",
  borderRadius: "24px",
  marginBottom: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",

  "&:hover": {
    background: "$silver",
  },
});

const DefinitionList = styled("dl", {
  margin: 0,
  padding: 0,
  textAlign: "left",
  listStyle: "none",
});

const DefinitionTitle = styled("dt", {
  margin: 0,
  padding: 0,
  textAlign: "left",
  listStyle: "none",
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
      <Button ref={ref} disabled>
        <div>
          <p>Loading {name}...</p>
        </div>
      </Button>
    );
  }

  return (
    <Button ref={ref} onClick={() => setShowBack(!showBack)}>
      {showBack ? (
        <div>
          <div>{pokemon.name}</div>
          <DefinitionList>
            {pokemon.stats?.map((stat) => (
              <Fragment key={stat.name}>
                <DefinitionTitle>{stat.name}</DefinitionTitle>
                <dd>
                  {stat.baseStat} {stat.effort}
                </dd>
              </Fragment>
            ))}
          </DefinitionList>
        </div>
      ) : (
        <SinglePokemonComponent {...pokemon} />
      )}
    </Button>
  );
};
