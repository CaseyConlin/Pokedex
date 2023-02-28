import { createStitches } from "@stitches/react";
// import type * as Stitches from "@stitches/react";

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
      black500: "hsl(0, 0%, 0%)",
      white500: "hsl(0, 0%, 100%)",
      gray500: "hsl(206,10%,76%)",
      gray300: "hsl(220, 10%, 94%)",
      blue500: "hsl(206,100%,50%)",
      purple500: "hsl(252,78%,60%)",
      green500: "hsl(148,60%,60%)",
      red500: "hsl(352,100%,62%)",
      blue: "#24a0ed",
      pokemonBrightRed: "#FF0000",
      pokemonDarkRed: "#CC0000",
      pokemonYellow: "#FFDE00",
      pokemonGold: "#B3A125",
    },
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "25px",
      5: "40px",
    },
    fontSizes: {
      1: "12px",
      2: "13px",
      3: "15px",
    },
    fonts: {
      untitled: "Untitled Sans, apple-system, sans-serif",
      mono: "Söhne Mono, menlo, monospace",
    },
    radii: {
      1: "5px",
      2: "10px",
      3: "15px",
    },
    borderWidths: {
      1: "1px",
      2: "2px",
      3: "5px",
      4: "none",
    },
    paddings: {
      1: "5px",
      2: "10px",
      3: "15px",
    },
    margins: {
      1: "5px",
      2: "10px",
      3: "15px",
    },
    widths: {
      1: "100%",
      2: "50%",
      3: "25%",
    },
  },

  media: {
    tablet: "(min-width: 720px)",
    desktop: "(min-width: 1200px)",
  },
});
