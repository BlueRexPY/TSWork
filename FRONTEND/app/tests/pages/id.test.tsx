/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import VacancySelected from "@/pages/[id]";
import { Simulate } from "react-dom/test-utils";
import { renderWithState } from "@/tests/helpers/renderWithState";

describe("ID - page", () => {
  it("ID - search", () => {
    render(renderWithState(<VacancySelected id={"search"} />));
    expect(screen.getAllByRole("skeleton")[0]).toBeInTheDocument();
    expect(screen.getByRole("toGetStart")).toBeInTheDocument();

    setTimeout(() => {
      expect(screen.getByRole("vacancyInfo")).toBeInTheDocument();
      expect(screen.getByRole("vacancyList")).toBeInTheDocument();
      expect(screen.getAllByRole("vacancyItem")[0]).toBeInTheDocument();
    }, 3000);
  });

  it("ID - 631ff10fbe34a93cf285ccae", () => {
    render(
      renderWithState(<VacancySelected id={"631ff10fbe34a93cf285ccae"} />)
    );
    setTimeout(() => {
      expect(screen.getByRole("vacancyInfo")).toBeInTheDocument();
      expect(screen.getByRole("vacancyList")).toBeInTheDocument();
      expect(screen.getAllByRole("vacancyItem")[0]).toBeInTheDocument();
    }, 3000);
  });

  it("ID - search + click", () => {
    render(renderWithState(<VacancySelected id={"search"} />));
    setTimeout(() => {
      Simulate.click(screen.getAllByRole("vacancyItem")[0]);
    }, 3000);
    setTimeout(() => {
      expect(screen.getByRole("vacancyInfo")).toBeInTheDocument();
      expect(screen.getByRole("vacancyList")).toBeInTheDocument();
      expect(screen.getAllByRole("vacancyItem")[0]).toBeInTheDocument();
    }, 3000);
  });
});
