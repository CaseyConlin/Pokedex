/**
 * Smart component that controls all
 * state and data fetching until we
 * need to break it out and push state
 * down.
 */
import { useEffect, useState } from "react";
import { getPokemonList } from "./services/pokemon";
import "./app.css";
import { SinglePokemonForm } from "./components/single-pokemon-form";
import { SinglePokemonComponentFetchContainer } from "./components/single-pokemon/container";
import { styled } from "./stitches.config";
import { Container } from "./components/UI/Container";
import { Button } from "./components/UI/Button";
import { Pagination } from "./components/pagination";
import { FocusPokemon } from "./components/focus-pokemon";
import { getFocusPokemonByUrl } from "./services/pokemon";

const ItemList = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  columnGap: "2%",
  padding: "2%",
  maxWidth: "1140px",
});

const PokeModal = styled("div", {
  position: "fixed",
  left: "50%",
  top: "50%",
  width: "50%",
  maxWidth: "1140px",
  backgroundColor: "$black500",
  transform: "translate(-50%, -50%)",
  borderRadius: "$3",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  overflow: "hidden",
  zIndex: "10",
});

export const App = () => {
  const [items, setItems] = useState<PokemonLite[]>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const [pokemonCount, setPokemonCount] = useState<number | undefined>(0);
  const [focusOpen, setFocusOpen] = useState<boolean>(false);
  const [focusPokemon, setFocusPokemon] = useState<any>();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Fetch once the page loads
    // but only the first time.
    getPokemonList(offset).then((data) => {
      setItems(data.results);
      setPokemonCount(data.count);
    });
  }, [offset]);

  const searchValueChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(e.target.value);
  };

  //Fetch and set FocusPokemon in modal.
  const focusPokemonClickHandler = (name: string) => {
    getFocusPokemonByUrl(name).then((data) => {
      setFocusPokemon(data);
      if (!focusOpen) setFocusOpen(true);
    });
  };

  //Search for one pokemon.
  const singlePokemonClickHandler = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (searchValue) {
      setError(undefined);
      getFocusPokemonByUrl(searchValue).then((data) => {
        setFocusPokemon(data);
        if (!focusOpen) setFocusOpen(true);
      });
    }
  };

  //Pagnination
  const limit = 20; //In case we want to introduce user ability to limit results per page in the future.

  const previousHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOffset(offset - limit);
  };

  const nextHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOffset(offset + limit);
  };

  const pageSelectHandler = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOffset(limit * (page - 1));
  };

  return (
    <div>
      <div className="App">
        <Container align="center" size="lg">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}>Search</button>
          {isSearchOpen ? (
            <Container align="center" size="sm">
              <SinglePokemonForm
                value={searchValue}
                change={searchValueChangeHandler}
                click={singlePokemonClickHandler}
              />
              {error ? <p>{error}</p> : ""}
            </Container>
          ) : (
            ""
          )}
          {focusOpen ? (
            <PokeModal>
              <FocusPokemon
                key={"focus" + focusPokemon.id}
                pokemon={focusPokemon}
                close={() => {
                  setFocusOpen(!focusOpen);
                }}
              />
            </PokeModal>
          ) : (
            ""
          )}

          <Container fd="row" align="center" gap="smCol">
            <Button
              bg="primary"
              border="none"
              size="lg"
              id="prev"
              onClick={previousHandler}
            >
              Previous
            </Button>
            <Button
              bg="primary"
              border="none"
              size="lg"
              name="next"
              id="next"
              onClick={nextHandler}
            >
              Next
            </Button>
          </Container>
          <ItemList>
            {items.map((item) => {
              return (
                <SinglePokemonComponentFetchContainer
                  key={item.name}
                  focus={focusPokemonClickHandler}
                  {...item}
                />
              );
            })}
          </ItemList>
          <div
            style={{
              display: "flex",
              width: "80%",
              gap: "5px",
              marginBottom: "200px",
            }}
          >
            <Pagination
              nextHandler={nextHandler}
              previousHandler={previousHandler}
              pageSelectHandler={pageSelectHandler}
              offset={offset}
              pokemonCount={pokemonCount}
              limit={limit}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};
