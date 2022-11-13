/**
 * Simple component that has no state
 * and just renders things.
 */
export const PokemonList = ({ items }) => {
  return items.map((item) => (
    <p>
      name: {item.name}
      <br />
      url: {item.url}
    </p>
  ));
};
