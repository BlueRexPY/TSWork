/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";
import Register from "@/pages/auth/register";

const store = setupStore();

describe("Auth - page", () => {
  it("Register", () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Login", () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
