import { styled } from "@stitches/react";
import { PokeType } from "./UI/PokeType";
import { FocusContainer } from "./UI/FocusContainer";

interface FocusPokemonProps {
  close: () => void;
  pokemon: FocusPokemon;
}

//need FLAVORTEXT type, stats, , weight, height, name, sprite
export const FocusPokemon = ({ close, pokemon }: FocusPokemonProps) => {
  const CloseButton = styled("button", {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    top: "15px",
    right: "15px",
    backgroundColor: "#ec243b",
    color: "#fff",
    fontWeight: "600",
    borderRadius: "100%",
    padding: "7px",
    width: "30px",
    height: "30px",
    textAlign: "center",
    border: "0",
    content: "x",
    "&:hover": {
      opacity: "80%",
    },
  });

  const ImageContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    padding: "$3",
  });

  const FocusImage = styled("img", {
    display: "flex",
    width: "60%",
    marginBottom: "20px",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
  });

  const FocusPhysicalAttributesContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
    padding: "$1",
    fontSize: "16px",
  });

  const AbilitiesContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
    padding: "$1",
    paddingTop: "25px",
    marginTop: "15px",
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "800",
    borderTop: "5px white solid",
  });

  const AbilityHeading = styled("div", {
    marginBottom: "5px",
  });

  const Ability = styled("div", {
    padding: "2px",
    fontWeight: "500",
    fontSize: "18px",
  });

  const FocusDataContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    width: "100%",
    justifyItems: "start",
    alignItems: "start",
    margin: "0",
    border: "0",
    padding: "$3",
    backgroundColor: "#fff",
    textAlign: "left",
    fontSize: "20px",
    color: "$black500",
  });

  const FocusNameContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    padding: "$1",
    textAlign: "left",
    fontSize: "25px",
  });

  const FocusTypeContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    padding: "$1",
    paddingBottom: "$1",
  });

  const FocusDescriptionContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    padding: "$1",
    textAlign: "left",
    fontSize: "18px",
  });
  const FocusStatsContainer = styled("div", {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    columnGap: "20%",
    flexWrap: "wrap",
    padding: "$1",
    paddingBottom: "2px",
    marginTop: "$2",
    marginBottom: "$2",
    fontWeight: "300",
    fontSize: "16px",
  });

  const Bar = styled("div", {
    height: "6px",
    backgroundColor: "#d2ebf7",
    width: "80%",
    position: "relative",
    borderRadius: "15px",
    marginBottom: "10px",
    "&:after": {
      width: "$$widthStat",
      height: "100%",
      position: "absolute",
      background: "#03b706",
      content: "''",
      borderRadius: "15px",
    },
  });

  let pokeTypes: any = [];
  if (pokemon.types) {
    pokeTypes = pokemon.types.map((type) => {
      return (
        <PokeType key={pokemon.name + type} typeColor={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </PokeType>
      );
    });
  }

  return (
    <FocusContainer BackgroundTypeColor={pokemon.types[0]}>
      <ImageContainer>
        <FocusImage src={pokemon.image} alt={pokemon.name} />
        <FocusTypeContainer>{pokeTypes}</FocusTypeContainer>

        <AbilitiesContainer>
          <AbilityHeading>
            {" "}
            {pokemon.abilities.length === 1 ? "Ability" : "Abilities"}
          </AbilityHeading>
          {pokemon.abilities.map((ability) => (
            <Ability>
              {ability.charAt(0).toUpperCase() + ability.slice(1)}
            </Ability>
          ))}
        </AbilitiesContainer>
      </ImageContainer>

      <FocusDataContainer>
        <CloseButton onClick={close}>X</CloseButton>
        <FocusNameContainer>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </FocusNameContainer>
        <FocusPhysicalAttributesContainer>
          Height: {pokemon.height} Weight: {pokemon.weight}
        </FocusPhysicalAttributesContainer>
        <FocusDescriptionContainer key={"hey"}>
          {pokemon.description[0]}
        </FocusDescriptionContainer>

        <FocusStatsContainer>
          {pokemon.stats.map((stat) => (
            <div>
              {stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}{" "}
              {stat.baseStat}
              {/* {formatTextToCapitalizeWithTrace(item.stat.name)} {item.base_stat}
            <Bar size={item.base_stat} /> */}
              <Bar css={{ $$widthStat: `${stat.baseStat / 2}%` }} />
            </div>
          ))}
        </FocusStatsContainer>
      </FocusDataContainer>
    </FocusContainer>
  );
};
