import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      silver: "#efefef",
      gray500: "lightgray",
    },
  },
  media: {
    tablet: "(min-width: 720px)",
    desktop: "(min-width: 1200px)",
  },
});
