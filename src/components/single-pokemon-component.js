export const SinglePokemonComponent = ({ name, id, image }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{id}</p>
      <img src={image} alt={name} />
    </div>
  );
};
