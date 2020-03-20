import React from "react";
import "jest-canvas-mock";

import { render, unmountComponentAtNode } from "react-dom";
import { act as domACT } from "react-dom/test-utils";
import { Router, BrowserRouter } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// Check snapshot of the component while rendering!
it("renders Navbar component and validate its snapshot", () => {
  domACT(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
      container
    );
  });
  expect(container).toMatchSnapshot();
});
