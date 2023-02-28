import { styled } from "../../stitches.config";

export const Button = styled("button", {
  // base styles
  display: "block",

  borderRadius: "$3",
  color: "$white500",
  margin: "auto",
  textAlign: "center",

  variants: {
    border: {
      none: {
        border: "0",
      },
      sm: {
        border: "1px",
      },
      lg: {
        border: "2px",
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
        width: "100px",
        paddingLeft: "15px",
        paddingRight: "15px",
        marginTop: "12px",
      },
    },
    bg: {
      primary: {
        backgroundColor: "$blue",
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
