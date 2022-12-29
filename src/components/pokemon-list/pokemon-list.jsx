/**
 * Simple component that has no state
 * and just renders things.
 */
export const PokemonList = ({ items }) => {
  return items.map((item) => (
    <p key={item.key}>
      name: {item.name}
      <br />
      url: {item.url}
      <br />
      <img src={item.front_image} alt={item.name} />
    </p>
  ));
};
