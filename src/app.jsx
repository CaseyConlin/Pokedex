/**
 * Smart component that controls all
 * state and data fetching until we
 * need to break it out and push state
 * down.
 */
import { useEffect, useState } from "react";
import { PokemonList } from "./components/pokemon-list/pokemon-list";
import { getPokemon } from "./services/pokemon";
import "./app.css";

export const App = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Fetch once the page loads
    // but only the first time.
    getPokemon().then(setItems);
  }, []);

  return (
    <div className="App">
      <PokemonList items={items} />
    </div>
  );
};
