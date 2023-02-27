import { styled } from "../../stitches.config";

export const PokeType = styled("span", {
  // base styles
  display: "inline-block",

  borderRadius: "$3",
  color: "$black500",

  textAlign: "center",

  paddingLeft: "10px",
  paddingRight: "10px",
  marginRight: "5px",

  variants: {
    typeColor: {
      normal: {
        backgroundColor: "lightgrey",
        color: "black",
      },
      poison: {
        backgroundColor: "#b97fc9",
        color: "$white500",
      },
      grass: {
        backgroundColor: "#9bcc50",
        color: "$white500",
      },
      fire: {
        backgroundColor: "#fd7d24",
        color: "$white500",
      },
      flying: {
        backgroundColor: "#3dc7ef",
        color: "$white500",
      },
      water: {
        backgroundColor: "#4592c4",
        color: "$white500",
      },
      bug: {
        backgroundColor: "#729f3f",
        color: "$white500",
      },
      electric: {
        backgroundColor: "#eed535",
        color: "black",
      },
      ground: {
        backgroundColor: "#ab9842",
        color: "$white500",
      },
      fairy: {
        backgroundColor: "#fdb9e9",
        color: "black",
      },
      fighting: {
        backgroundColor: "#d56723",
        color: "$white500",
      },
      psychic: {
        backgroundColor: "#f366b9",
        color: "$white500",
      },
      rock: {
        backgroundColor: "gray",
        color: "$white500",
      },
      steel: {
        backgroundColor: "#9eb7b8",
        color: "$white500",
      },
      ice: {
        backgroundColor: "#51c4e7",
        color: "$white500",
      },
      ghost: {
        backgroundColor: "#7b62a3",
        color: "$white500",
      },
      dragon: {
        backgroundColor: "#f16e57",
        color: "$white500",
      },
      dark: {
        backgroundColor: "black",
        color: "$white500",
      },
    },
    size: {
      sm: {
        fontSize: "13px",
        height: "25px",
        paddingRight: "10px",
        paddingLeft: "10px",
      },
      md: {
        fontSize: "14px",
        height: "25px",
        paddingRight: "12px",
        paddingLeft: "12px",
      },
      lg: {
        fontSize: "16px",
        height: "35px",
        paddingLeft: "15px",
        paddingRight: "15px",
        marginTop: "12px",
      },
    },
    bg: {
      primary: {
        backgroundColor: "$pokemonBlue",
        "&:hover": {
          backgroundColor: "#64b5f6",
        },
      },
      secondary: {
        backgroundColor: "#009688",
        "&:hover": {
          backgroundColor: "#4db6ac",
        },
      },
      danger: {
        backgroundColor: "#f44336",
        "&:hover": {
          backgroundColor: "#ef9a9a",
        },
      },
      success: {
        backgroundColor: "#4caf50",
        color: "white",
        "&:hover": {
          backgroundColor: "#a5d6a7",
        },
      },
    },
  },
});
