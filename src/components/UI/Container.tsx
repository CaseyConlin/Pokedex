import { styled } from "@stitches/react";

export const Container = styled("div", {
  // base styles
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "$1",
  backgroundColor: "$white500",

  variants: {
    fd: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },
    backgroundColor: {
      black: {
        backgroundColor: "$black500",
      },
      gray: {
        backgroundColor: "$gray300",
      },
      yellow: {
        backgroundColor: "$pokemonYellow",
      },
      blue: {
        backgroundColor: "$blue",
      },
    },

    fontSize: {
      sm: { fontSize: "14px" },
      md: { fontSize: "16px" },
      lg: { fontSize: "20px" },
      xl: { fontSize: "26px" },
    },

    color: {
      white: {
        color: "$white500",
        fontWeight: "700",
      },
    },

    size: {
      sm: {
        width: "20%",
      },
      lg: {
        width: "100%",
      },
    },

    alignContent: {
      center: {
        alignContent: "center",
      },
      start: {
        alignContent: "flex-start",
      },
      end: {
        alignContent: "flex-end",
      },
    },
    align: {
      center: {
        alignItems: "center",
      },
      left: {
        alignItems: "flex-start",
      },
      right: {
        alignItems: "flex-end",
      },
    },
    justify: {
      center: {
        justifyContent: "center",
      },
      start: {
        justifyContent: "flex-start",
      },
      end: {
        justifyContent: "flex-end",
      },
    },
    boderRadius: {
      medium: { borderRadius: "5%" },
      large: { borderRadius: "25%" },
    },
    gap: {
      smCol: {
        columnGap: "10px",
      },
      smRow: {
        rowGap: "10px",
      },
      mdCol: {
        columnGap: "15px",
      },
      mdRow: {
        rowGap: "15px",
      },
      lgCol: {
        columnGap: "25px",
      },
      lgRow: {
        rowGap: "25px",
      },
    },
  },
});
