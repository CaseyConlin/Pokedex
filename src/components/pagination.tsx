import { styled } from "../stitches.config";
interface PaginationProps {
  pages: number[];
  nextHandler: () => void;
  previousHanlder: () => void;
  pageSelectHandler: (page: number) => void;
  rangeList: any[];
  pageInView: number;
  offset: number;
  limit: number;
}

export const Pagination = ({
  offset,
  limit,
  pages,
  rangeList,
  pageInView,
  nextHandler,
  previousHanlder,
  pageSelectHandler,
}: PaginationProps) => {
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

  return (
    <PaginatinContainer>
      <NavigationButton disabled={offset === 0} onClick={previousHanlder}>
        {"<"}
      </NavigationButton>

      {rangeList.map((page: any, index) => {
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
