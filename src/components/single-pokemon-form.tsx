import { styled } from "../stitches.config";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "$white500",
});

const Form = styled("form", {
  display: "flex",
  padding: "1px",
  flexDirection: "column",
  justifyContent: "start",
  alignContent: "center",
});

const InputContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignContent: "end",
  justifyContent: "center",
  marginBottom: "0px",
  marginTop: "10px",
});

const Input = styled("input", {
  padding: "1px",
  justifyContent: "start",
  alignContent: "center",
  border: "1 solid black",
  lineHeight: "1",
  fontSize: "15px",
  height: "30px",
  paddingLeft: "15px",
  paddingRight: "15px",
});

const SearchIconButton = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  width: "30px",
  height: "30px",
  backgroundColor: "$blue",
  border: "0",
  borderRadius: "24px",
  marginLeft: "10px",
  "&:hover": {
    backgroundColor: "#066bbe",
  },
});

const TypeAheadContainer = styled("div", {});

const TypeAheadList = styled("ul", {
  position: "absolute",
  backgroundColor: "$white500",
  textAlign: "left",
  border: "1px solid black",
  padding: "10px",
  marginLeft: "0px",
  marginTop: "0px",
  zIndex: "10",
});

const TypeAheadListItem = styled("li", {
  listStyle: "none",
  textAlign: "left",
  padding: "5px 10px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "$blue",
    color: "$white500",
  },
  "&:active": {
    backgroundColor: "#066bbe",
  },
});

export const SinglePokemonForm = ({
  value,
  matches,
  change,
  searchClick,
  typeAheadClick,
}: {
  value: string | undefined;
  matches: string[] | undefined;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchClick: (e: React.MouseEvent) => void;
  typeAheadClick: (match: string) => void;
}) => {
  return (
    <Container>
      <Form autoComplete="off">
        <label htmlFor="pokemon-search">Search Pokemon by Name:</label>
        <InputContainer>
          <Input
            type="text"
            id="pokemon-search"
            onChange={change}
            value={value}
          />
          <SearchIconButton onClick={searchClick} type="submit" value="Search">
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </SearchIconButton>
        </InputContainer>
        {matches && matches.length !== 0 ? (
          <TypeAheadContainer>
            {" "}
            <TypeAheadList>
              {matches.map((match) => {
                return (
                  <TypeAheadListItem
                    key={`match${match}`}
                    onClick={() => {
                      typeAheadClick(match);
                    }}
                  >
                    {match}
                  </TypeAheadListItem>
                );
              })}
            </TypeAheadList>
          </TypeAheadContainer>
        ) : (
          ""
        )}
      </Form>
    </Container>
  );
};
