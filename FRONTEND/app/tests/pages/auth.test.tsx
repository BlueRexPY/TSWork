/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { setupStore } from "@/store/store";
import { renderWithState } from "@/tests/helpers/renderWithState";
import Register from "@/pages/auth/register";

const store = setupStore();

describe("Auth - page", () => {
  it("Register", () => {
    render(renderWithState(<Register />));
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Login", () => {
    render(renderWithState(<Register />));
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
