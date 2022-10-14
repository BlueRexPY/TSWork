/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import NotFound from "@/pages/404";
import { renderWithState } from "@/tests/helpers/renderWithState";

it("NotFound - page", () => {
  render(renderWithState(<NotFound />));
  expect(screen.getByRole("wrapper")).toBeInTheDocument();
  expect(screen.getAllByRole("button")[0]).toBeInTheDocument();
  expect(screen.getByRole("image")).toBeInTheDocument();
});
