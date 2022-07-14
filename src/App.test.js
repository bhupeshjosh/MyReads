import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
});

it("works fine", () => {
  const books = document.querySelectorAll("div.book");
  books[0].
});
