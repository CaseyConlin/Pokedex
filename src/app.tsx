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
import { Pagination } from "./components/pagination";

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
  const [pokemonCount, setPokemonCount] = useState<number | undefined>(0);

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
    getPokemonList(offset).then((data) => {
      setItems(data.results);
      setPokemonCount(data.count);
    });
  }, [offset]);

  const limit = 20;
  const pageCount = pokemonCount ? Math.ceil(pokemonCount / limit) : "";
  const pages = [...new Array(pageCount)].map((e, i) => i + 1);

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
  const pageInView = Math.round((offset + limit) / limit);

  const setRangeList = () => {
    let range = 3;
    let mql = window.matchMedia("(min-width: 900px)").matches;
    mql ? (range = 15) : (range = 3);

    if (pageInView < range) {
      const pageRange: any = pages.slice(0, range);
      return pageRange.concat("...", pages.length);
    } else if (pageInView > pages.length - range) {
      const pageRange: any = pages.slice(pages.length - range, pages.length);
      pageRange.unshift(1, "...");
      return pageRange;
    } else {
      const pageRange: any = pages.slice(
        Math.floor(pageInView - range / 2),
        Math.floor(pageInView + range / 2)
      );
      pageRange.unshift(1, "...");
      pageRange.push("...", pages.length);
      return pageRange;
    }
  };
  const rangeList = setRangeList();

  const previousHanlder = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOffset(offset - 20);
  };

  const nextHanlder = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOffset(offset + 20);
  };

  const pageSelectHandler = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOffset(limit * (page - 1));
  };

  //Move through pokemon API results by a fixed increment.
  // const offsetHandler = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   const id: string = e.currentTarget.id;
  //   if (id === "next") {
  //     setOffset(offset + 20);
  //   }
  //   if (id === "prev") {
  //     setOffset(offset - 20);
  //   }
  // };

  return (
    <div>
      <div className="App">
        <Container align="center" size="lg">
          {/* <Container align="center" size="sm">
            <SinglePokemonForm
              value={searchValue}
              change={searchValueChangeHandler}
              click={singlePokemonClickHandler}
            />
            {singlePokemon ? <SinglePokemonComponent {...singlePokemon} /> : ""}
            {error ? <p>{error}</p> : ""}
          </Container> */}
          <Container fd="row" align="center" gap="smCol">
            <Button
              bg="primary"
              border="none"
              size="lg"
              id="prev"
              onClick={previousHanlder}
            >
              Previous
            </Button>
            <Button
              bg="primary"
              border="none"
              size="lg"
              name="next"
              id="next"
              onClick={nextHanlder}
            >
              Next
            </Button>
          </Container>
          <ItemList>
            {items.map((item) => {
              return (
                <SinglePokemonComponentFetchContainer
                  key={item.name}
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
              nextHandler={nextHanlder}
              previousHanlder={previousHanlder}
              pageSelectHandler={pageSelectHandler}
              rangeList={rangeList}
              pageInView={pageInView}
              offset={offset}
              pages={pages}
              limit={limit}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};
