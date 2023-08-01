/**
 * Smart component that controls all
 * state and data fetching until we
 * need to break it out and push state
 * down.
 */
import { useEffect, useState } from "react";
import { getPokemonList, getPokemonNamesList } from "./services/pokemon";
import "./app.css";
import { SinglePokemonForm } from "./components/single-pokemon-form";
import { SinglePokemonComponentFetchContainer } from "./components/single-pokemon/container";
import { styled } from "./stitches.config";
import { Container } from "./components/UI/Container";
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
  width: "90%",
  backgroundColor: "$black500",
  borderRadius: "$3",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  overflow: "hidden",
  zIndex: "10",

  "@tablet": {
    position: "fixed",
    top: "10%",
    left: "50%",
    width: "55%",
    maxWidth: "410px",
    transform: "translate(-50%, 0%)",
  },

  "@desktop": {
    position: "fixed",
    top: "50%",
    width: "50%",
    maxWidth: "1140px",
    transform: "translate(-50%, -50%)",
  },
});

const SearchIconButton = styled("button", {
  padding: "1px",
  justifyContent: "center",
  alignContent: "center",
  width: "40px",
  height: "40px",
  color: "red",
  backgroundColor: "$$bgColor",
  border: "0",
  lineHeight: "1",
  borderRadius: "24px",
});

const ErrorMessage = styled("div", {
  backgroundColor: "$dangerBackground",
  color: "$white500",
  borderRadius: "15px",
  padding: "10px",
  marginTop: "10px",
});
export const App = () => {
  const [items, setItems] = useState<PokemonLite[]>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const [pokemonCount, setPokemonCount] = useState<number | undefined>(0);
  const [focusOpen, setFocusOpen] = useState<boolean>(false);
  const [focusPokemon, setFocusPokemon] = useState<any>();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [typeAheadNames, setTypeAheadNames] = useState<string[]>();
  const [matches, setMatches] = useState<string[]>();
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

  const matchHandler = (match: string) => {
    if (typeAheadNames) {
      const matches = typeAheadNames.filter((name) => {
        return name.includes(match.toLowerCase());
      });
      setMatches(matches);
    }
  };

  const searchValueChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setError(undefined);
    setSearchValue(e.target.value);
    if (e.target.value.length > 2) {
      matchHandler(e.target.value);
    } else {
      if (e.target.value.length <= 2) setMatches([]);
    }
  };

  const typeAheadClickHandler = (match: string) => {
    setFocusOpen(false);
    setSearchValue(match);
    focusPokemonClickHandler(match);
    setMatches([]);
  };

  //Fetch and set FocusPokemon in modal.
  const focusPokemonClickHandler = (name: string) => {
    setError(undefined);
    getFocusPokemonByUrl(name.toLowerCase()).then((data) => {
      setFocusPokemon(data);
      if (!focusOpen) setFocusOpen(true);
    });
  };

  const openSearchForm = () => {
    setFocusOpen(false);
    setError(undefined);
    setMatches([]);
    setSearchValue("");
    setIsSearchOpen(!isSearchOpen);
    getPokemonNamesList().then((data) => setTypeAheadNames(data));
  };

  //Search for one pokemon.
  const singlePokemonClickHandler = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (searchValue) {
      setError(undefined);
      getFocusPokemonByUrl(searchValue.toLowerCase())
        .then((data) => {
          setFocusPokemon(data);
          if (!focusOpen) setFocusOpen(true);
        })
        .catch((error) => {
          setMatches([]);
          setError(error.message);
        });
      setMatches([]);
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
          <SearchIconButton
            css={{ $$bgColor: `${isSearchOpen ? "" : "red"}` }}
            onClick={openSearchForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={isSearchOpen ? "red" : "white"}
              width="20px"
              height="20px"
            >
              {isSearchOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              )}
            </svg>
          </SearchIconButton>
          {isSearchOpen ? (
            <Container
              align="center"
              size="sm"
              onFocus={() => setFocusOpen(false)}
            >
              <SinglePokemonForm
                value={searchValue}
                change={searchValueChangeHandler}
                searchClick={singlePokemonClickHandler}
                matches={matches}
                typeAheadClick={typeAheadClickHandler}
              />

              {error ? <ErrorMessage>{error}</ErrorMessage> : ""}
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
