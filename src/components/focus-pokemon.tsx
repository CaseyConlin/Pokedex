import { styled } from "../stitches.config";
import { PokeType } from "./UI/PokeType";
import { FocusContainer } from "./UI/FocusContainer";

interface FocusPokemonProps {
  close: () => void;
  pokemon: FocusPokemon;
}

const ImageContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "70%",
  justifyContent: "center",
  alignItems: "center",
  padding: "$3",
});

const Image = styled("img", {
  display: "flex",
  width: "60%",
  marginBottom: "20px",
  justifyContent: "center",
  alignContent: "center",
  backgroundColor: "#ffffff",
  borderRadius: "50%",
});

const PhysicalAttributesContainer = styled("div", {
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
  textTransform: "capitalize",
});

const Ability = styled("div", {
  padding: "2px",
  fontWeight: "500",
  fontSize: "18px",
  textTransform: "capitalize",
});

const DataContainer = styled("div", {
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

const ButtonContainer = styled("div", {
  position: "absolute",
  top: "55px",
  right: "25px",

  "@tablet": { top: "15px", right: "15px" },
});

const CloseButton = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  backgroundColor: "#ec243b",
  color: "#fff",
  fontWeight: "600",
  borderRadius: "100%",
  padding: "7px",
  width: "30px",
  height: "30px",
  textAlign: "center",
  border: "0",

  "&:hover": {
    opacity: "80%",
  },
});
const NameContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "$1",
  textAlign: "left",
  fontSize: "25px",
  fontWeight: "900",
  textTransform: "capitalize",
});

const TypeContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "center",
  padding: "$1",
  paddingBottom: "$1",
});

const DescriptionContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "$1",
  textAlign: "left",
  fontSize: "18px",
});

const StatsContainer = styled("div", {
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
  textTransform: "capitalize",
});

const Bar = styled("div", {
  height: "6px",
  backgroundColor: "#d2ebf7",
  width: "80%",
  position: "relative",
  borderRadius: "15px",
  marginBottom: "10px",
  textTransform: "capitalize",
  "&:after": {
    width: "$$widthStat",
    height: "100%",
    position: "absolute",
    background: "#03b706",
    content: "''",
    borderRadius: "15px",
    transition: "width 10s",
  },
});

export const FocusPokemon = ({ close, pokemon }: FocusPokemonProps) => {
  let pokeTypes: any = [];
  if (pokemon.types) {
    pokeTypes = pokemon.types.map((type) => {
      return (
        <PokeType key={pokemon.name + type} typeColor={type}>
          {type}
        </PokeType>
      );
    });
  }

  return (
    <FocusContainer BackgroundTypeColor={pokemon.types[0]}>
      <ImageContainer>
        <Image src={pokemon.image} alt={pokemon.name} />
        <TypeContainer>{pokeTypes}</TypeContainer>

        <AbilitiesContainer>
          <AbilityHeading>
            {pokemon.abilities.length === 1 ? "Ability" : "Abilities"}
          </AbilityHeading>
          {pokemon.abilities.map((ability) => (
            <Ability>{ability}</Ability>
          ))}
        </AbilitiesContainer>
      </ImageContainer>

      <DataContainer>
        <ButtonContainer>
          <CloseButton onClick={close}>X</CloseButton>
        </ButtonContainer>
        <NameContainer>{pokemon.name}</NameContainer>
        <PhysicalAttributesContainer>
          Height: {pokemon.height} cm &nbsp; | &nbsp; Weight: {pokemon.weight}{" "}
          kg
        </PhysicalAttributesContainer>
        <DescriptionContainer key={"hey"}>
          {pokemon.description[0]}
        </DescriptionContainer>

        <StatsContainer>
          {pokemon.stats.map((stat) => (
            <div>
              {stat.name} {stat.baseStat}
              <Bar css={{ $$widthStat: `${stat.baseStat / 2}%` }} />
            </div>
          ))}
        </StatsContainer>
      </DataContainer>
    </FocusContainer>
  );
};
