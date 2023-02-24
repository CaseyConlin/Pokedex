import { styled } from "@stitches/react";

export const Image = styled("img", {
  display: "block",
  width: "$1",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
  margin: "0 auto",
  variants: {
    size: {
      sm: {
        width: "50%",
        height: "50%",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "0 auto",
      },
      lg: {
        width: "100%",
        height: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "0 auto",
      },
    },
  },
});
