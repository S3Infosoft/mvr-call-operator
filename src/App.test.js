import React from "react";
import "jest-canvas-mock";

import { render, unmountComponentAtNode } from "react-dom";
import { act as domACT } from "react-dom/test-utils";
// import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

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

it("renders App component and validate its snapshot", () => {
  // Check snapshot of the component while rendering!
  domACT(() => {
    render(<App />, container);
  });
  expect(container).toMatchSnapshot();
});

// it("Interact with routed page", () => {
//   // Interact with routed page
//   domACT(() => {
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <App />
//       </MemoryRouter>,
//       container
//     )

//     const goHomeLink = document.querySelector('#nav-home');
//     goHomeLink.dispatchEvent(new MouseEvent("click", { bubbles: true }))
//   });
//   expect(container.textContent).toBe('Home');
// })
