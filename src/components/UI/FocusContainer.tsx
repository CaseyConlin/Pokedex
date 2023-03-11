import { styled } from "../../stitches.config";

export const FocusContainer = styled("span", {
  // base styles
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "center",
  alignItems: "start",
  textAlign: "center",

  variants: {
    BackgroundTypeColor: {
      normal: {
        backgroundColor: "#EAEAEA",
        color: "black",
      },
      poison: {
        backgroundColor: "#C88ED8",
        color: "$white500",
      },
      grass: {
        backgroundColor: "#a6d3a6",
        color: "$white500",
      },
      fire: {
        backgroundColor: "#FF9C43",
        color: "$white500",
      },
      flying: {
        backgroundColor: "#63EDFF",
        color: "black",
      },
      water: {
        backgroundColor: "#6BB8EA",
        color: "$white500",
      },
      bug: {
        backgroundColor: "#98C565",
        color: "$white500",
      },
      electric: {
        backgroundColor: "#f9ed9a",
        color: "black",
      },
      ground: {
        backgroundColor: "#C2AF59",
        color: "$white500",
      },
      fairy: {
        backgroundColor: "#FFD0FF",
        color: "black",
      },
      fighting: {
        backgroundColor: "#FB8D49",
        color: "$white500",
      },
      psychic: {
        backgroundColor: "#FF8CDF",
        color: "$white500",
      },
      rock: {
        backgroundColor: "#A6A6A6",
        color: "$white500",
      },
      steel: {
        backgroundColor: "#C4DDDE",
        color: "black",
      },
      ice: {
        backgroundColor: "#77EAFF",
        color: "black",
      },
      ghost: {
        backgroundColor: "#B198D9",
        color: "$white500",
      },
      dragon: {
        backgroundColor: "#FF9C85",
        color: "$white500",
      },
      dark: {
        backgroundColor: "#363636",
        color: "$white500",
      },
    },
  },
});
