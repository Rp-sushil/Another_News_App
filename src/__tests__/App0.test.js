import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../components/App";
import data from "../data";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

beforeEach(() => {});

test("full app rendering", () => {
  //   renderWithRouter(<App />);
  //   expect(screen.getByText(/you are home/i)).toBeInTheDocument();
});
