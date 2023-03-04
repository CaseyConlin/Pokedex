import { render, screen } from "@testing-library/react";
import { mockIntersectionObserver } from "jsdom-testing-mocks";
import { App } from "./app";
import { SinglePokemonComponentFetchContainer } from "./components/single-pokemon/container";

// src/setupTests.js
import { server } from "./mocks/server.js";
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

const mockObserver = mockIntersectionObserver();

test("renders app", async () => {
  render(<App />);
  expect(await screen.findByText(/bulbasaur/)).toBeInTheDocument();

  render(<SinglePokemonComponentFetchContainer />);
  mockObserver.enterNode(screen.getByTestId(/pokemon-observer-bulbasaur/));
  expect(await screen.findByText(/Bulbasaur/)).toBeInTheDocument();
  expect(screen.queryByText(/Loading bulbasaur/)).toBeNull();
});
