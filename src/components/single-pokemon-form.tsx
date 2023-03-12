import { Button } from "./UI/Button";
import { Container } from "./UI/Container";
import { Input } from "./UI/Input";

export const SinglePokemonForm = ({
  value,
  change,
  click,
}: {
  value: string | undefined;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  click: (e: React.MouseEvent) => void;
}) => {
  return (
    <Container align="center" size="sm">
      <form>
        <label htmlFor="pokemon-search">
          Search Pokemon by Name:
          <Input
            type="text"
            id="pokemon-search"
            onChange={change}
            value={value}
          />
        </label>
        <Button
          bg="primary"
          border="none"
          size="lg"
          onClick={click}
          type="submit"
          value="Search"
        >
          Search
        </Button>
      </form>
    </Container>
  );
};
