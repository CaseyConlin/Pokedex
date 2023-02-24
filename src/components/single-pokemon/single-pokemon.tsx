import { CardFrontImage } from "../UI/CardFrontImage";
import { Container } from "../UI/Container";

export const SinglePokemonComponent = ({ name, image }: Pokemon) => {
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
          TypeList
        </Container>
      </Container>
    </>
  );
};
