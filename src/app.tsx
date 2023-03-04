/**
 * Smart component that controls all
 * state and data fetching until we
 * need to break it out and push state
 * down.
 */
import { useEffect, useState } from "react";
import { getPokemonByName, getPokemonList } from "./services/pokemon";
import "./app.css";
import { SinglePokemonForm } from "./components/single-pokemon-form";
import { SinglePokemonComponentFetchContainer } from "./components/single-pokemon/container";
import { SinglePokemonComponent } from "./components/single-pokemon/single-pokemon";
import { styled } from "./stitches.config";
import { Container } from "./components/UI/Container";
import { Button } from "./components/UI/Button";

const ItemList = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  columnGap: "2%",
  padding: "2%",
  maxWidth: "1140px",
});

export const App = () => {
  const [items, setItems] = useState<PokemonLite[]>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>("Pikachu");
  const [singlePokemon, setSinglePokemon] = useState({
    name: "",
    id: "",
    image: "",
  });
  const [error, setError] = useState<string | undefined>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Fetch once the page loads
    // but only the first time.
    getPokemonList(offset).then((items) => setItems(items));
  }, [offset]);

  const searchValueChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(e.target.value);
  };

  //Search for one pokemon
  //and return basic results
  //or return basic error if search term not found.
  const singlePokemonClickHandler = (e: React.MouseEvent): void => {
    e.preventDefault();
    setSinglePokemon({ name: "", id: "", image: "" });
    setError(undefined);
    if (searchValue)
      getPokemonByName(searchValue)
        .then(setSinglePokemon)
        .catch((error: Error) => {
          setError(error.message);
        });
  };

  //Move through pokemon API results by a fixed increment.
  const offsetHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const id: string = e.currentTarget.id;
    if (id === "next") {
      setOffset(offset + 20);
    }
    if (id === "prev") {
      setOffset(offset - 20);
    }
  };

  return (
    <div>
      <div className="App">
        <Container align="center" size="lg">
          <Container align="center" size="sm">
            <SinglePokemonForm
              value={searchValue}
              change={searchValueChangeHandler}
              click={singlePokemonClickHandler}
            />
            {singlePokemon ? <SinglePokemonComponent {...singlePokemon} /> : ""}
            {error ? <p>{error}</p> : ""}
          </Container>
          <Container fd="row" align="center" gap="smCol">
            <Button
              bg="primary"
              border="none"
              size="lg"
              id="prev"
              onClick={offsetHandler}
            >
              Previous
            </Button>
            <Button
              bg="primary"
              border="none"
              size="lg"
              id="next"
              name="next"
              onClick={offsetHandler}
            >
              Next
            </Button>
          </Container>
          <ItemList data-testid="item-list-container">
            {items.map((item) => {
              return (
                <SinglePokemonComponentFetchContainer
                  key={item.name}
                  {...item}
                />
              );
            })}
          </ItemList>
        </Container>
      </div>
    </div>
  );
};
