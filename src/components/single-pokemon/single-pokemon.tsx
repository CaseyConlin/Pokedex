import { CardFrontImage } from "../UI/CardFrontImage";
import { Container } from "../UI/Container";

import { PokeType } from "../UI/PokeType";

export const SinglePokemonComponent = ({ name, image, types }: Pokemon) => {
  let pokeTypes: any = [];
  if (types) {
    pokeTypes = types.map((type) => {
      return (
        // <span key={name + type} className={`poke-type ${type}`}>
        //   {`${type.charAt(0).toUpperCase() + type.slice(1)}`}&nbsp;
        // </span>

        <PokeType key={name + type} typeColor={type}>
          {`${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </PokeType>
      );
    });
  }

  return (
    <>
      <Container align="center" size="lg" fd="column">
        <Container
          backgroundColor="gray"
          align="center"
          size="lg"
          fd="column"
          boderRadius="medium"
        >
          <CardFrontImage src={image} alt={name} />
        </Container>
        <Container size="lg" align="left" fontSize="lg">
          {`${name.charAt(0).toUpperCase() + name.slice(1)} `}
        </Container>
        <Container justify="start" size="lg" fd="row">
          {pokeTypes}
        </Container>
      </Container>
    </>
  );
};
