import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Main from "../components/Main";
import userEvent from "@testing-library/user-event";
import store from "../store/store";
import React from "react";
import useAppSelector from "../hooks/useAppSelector";

let component: React.ReactElement = (
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>
);

// beforeEach(()=>{
//     component = (
//         <Provider store={store}>
//           <BrowserRouter>
//             <Main />
//           </BrowserRouter>
//         </Provider>
//       );
// })

describe("renders", () => {

  test("rendered menu", () => {
    render(component);
    let header = document.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  test("open menu", () => {
    render(component);
    const menuBtn = document.querySelector("#fade-button");
    userEvent.click(menuBtn);
    expect(screen.getByText(/show all/i)).toBeInTheDocument();
  });

  test('filters "completed" ', () => {
    render(component);
    const menuBtn = document.querySelector("#fade-button");
    userEvent.click(menuBtn);
    let filter = store.getState().todos.filter;
    expect(filter).toBe("all");
    userEvent.click(screen.getByText(/show completed/i));
    expect(filter).toBeTruthy();
  });

  test('rendered list', () => {
      render(component);
      expect(screen.getByRole('list')).toBeInTheDocument();
  })

  test('rendered button', ()=>{
      render(component)
      expect(screen.getByText(/create a new task/i)).toBeInTheDocument();
  })
});
