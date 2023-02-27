import { styled } from "@stitches/react";

export const PokemonCard = styled("button", {
  border: "1px lightblue ",

  backgroundColor: "$white500",
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  width: "250px",
  height: "250px",
  margin: "$1",
  fontSize: ".85rem",
  boxShadow: "-5px 5px 5px 2px lightblue",
  transition: "all .3s ease-in-out",
  "&:hover": {
    scale: "120%",
    transitionDelay: "2000ms",
    transition: "all .4s ease-in-out",
  },
});
