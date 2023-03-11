import { styled } from "../stitches.config";
interface PaginationProps {
  // pages: number[];
  nextHandler: () => void;
  previousHanlder: () => void;
  pageSelectHandler: (page: number) => void;
  pokemonCount: number | undefined;
  offset: number;
  limit: number;
}

const PaginatinContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "$1",
  columnGap: "10px",
});
const NavigationButton = styled("button", {
  width: "30px",
  backgroundColor: "$blue",
  color: "$white500",
  borderRadius: "$3",
  border: "0px",
  textAlign: "center",
  fontSize: "16px",
  padding: "5px",

  "&:hover": {
    backgroundColor: "#066bbe",
  },
  "&:disabled": {
    backgroundColor: "#64b5f6",
  },
});

const PageButton = styled("button", {
  width: "35px",
  backgroundColor: "$blue",
  color: "$white500",
  borderRadius: "$3",
  border: "0px",
  textAlign: "center",
  fontSize: "16px",
  paddingTop: "5px",
  paddingBottom: "5px",

  "&:hover": {
    backgroundColor: "#066bbe",
  },
  "&:disabled": {
    backgroundColor: "#64b5f6",
  },
});

export const Pagination = ({
  offset,
  limit,
  pokemonCount,
  nextHandler,
  previousHanlder,
  pageSelectHandler,
}: PaginationProps) => {
  const pageCount = pokemonCount ? Math.ceil(pokemonCount / limit) : "";
  const pages = [...new Array(pageCount)].map((e, i) => i + 1);
  const pageInView = Math.round((offset + limit) / limit);

  const setRangeList = () => {
    let range = 3;
    let mql = window.matchMedia("(min-width: 900px)").matches;
    mql ? (range = 15) : (range = 3);

    if (pageInView < range) {
      const pageRange: any = pages.slice(0, range);
      return pageRange.concat("...", pages.length);
    } else if (pageInView > pages.length - range) {
      const pageRange: any = pages.slice(pages.length - range, pages.length);
      pageRange.unshift(1, "...");
      return pageRange;
    } else {
      const pageRange: any = pages.slice(
        Math.floor(pageInView - range / 2),
        Math.floor(pageInView + range / 2)
      );
      pageRange.unshift(1, "...");
      pageRange.push("...", pages.length);
      return pageRange;
    }
  };
  const rangeList = setRangeList();

  return (
    <PaginatinContainer>
      <NavigationButton disabled={offset === 0} onClick={previousHanlder}>
        {"<"}
      </NavigationButton>

      {rangeList.map((page: any, index: any) => {
        return (
          <PageButton
            key={`${page}_${index}`}
            disabled={page === "..."}
            style={{
              backgroundColor: page === pageInView ? "#ec243b" : "",
            }}
            onClick={() => {
              pageSelectHandler(page);
            }}
          >
            {page}
          </PageButton>
        );
      })}
      <NavigationButton
        disabled={pageInView === pages.length}
        onClick={nextHandler}
      >
        {">"}
      </NavigationButton>
    </PaginatinContainer>
  );
};
