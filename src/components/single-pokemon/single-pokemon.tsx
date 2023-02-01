export const SinglePokemonComponent = ({ name, image }: Pokemon) => {
  return (
    <div>
      <p>{name}</p>
      <img src={image} alt={name} />
    </div>
  );
};
