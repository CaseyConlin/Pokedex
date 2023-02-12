export const SinglePokemonForm = ({
  value,
  change,
  click,
}: {
  value: string | undefined;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  click: (e: React.MouseEvent) => void;
}) => {
  return (
    <form>
      <label htmlFor="pokemon-search">
        Search Pokemon by Name:
        <input
          type="text"
          id="pokemon-search"
          onChange={change}
          value={value}
        />
      </label>
      <input onClick={click} type="submit" value="Search" />
    </form>
  );
};
