import { styled } from "@stitches/react";

export const Input = styled("input", {
  display: "block",
  margin: "10px auto",
  textAlign: "center",

  variants: {
    size: {
      sm: {
        fontSize: "13px",
        height: "25px",
        paddingRight: "10px",
        paddingLeft: "10px",
      },
      lg: {
        fontSize: "15px",
        height: "35px",
        paddingLeft: "15px",
        paddingRight: "15px",
      },
    },
  },
});
