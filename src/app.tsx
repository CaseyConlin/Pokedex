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

const ItemList = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  columnGap: "12px",
});

const Item = styled("div", {
  flex: "0 0 100%",

  "@desktop": {
    flex: "0 120px 120px",
    color: "red",
  },
});

export const App = () => {
  const [items, setItems] = useState<PokemonLite[]>([]);
  const [searchValue, setSearchValue] = useState("Pikachu");
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

  const searchValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  //Search for one pokemon
  //and return basic results
  //or return basic error if search term not found.
  const singlePokemonClickHandler = (e: Event) => {
    e.preventDefault();
    setSinglePokemon({ name: "", id: "", image: "" });
    setError(undefined);
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
        <SinglePokemonForm
          value={searchValue}
          change={searchValueChangeHandler}
          click={singlePokemonClickHandler}
        />

        {singlePokemon ? <SinglePokemonComponent {...singlePokemon} /> : ""}
        {error ? <p>{error}</p> : ""}
        <button id="prev" onClick={offsetHandler}>
          Previous
        </button>
        <button id="next" onClick={offsetHandler}>
          Next
        </button>
        <ItemList>
          {items.map((item) => {
            return (
              <Item key={item.name}>
                <SinglePokemonComponentFetchContainer {...item} />
              </Item>
            );
          })}
        </ItemList>
      </div>
    </div>
  );
};
