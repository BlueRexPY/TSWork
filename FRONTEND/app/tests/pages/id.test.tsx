/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";
import VacancySelected from "@/pages/[id]";
import { Simulate } from "react-dom/test-utils";

const store = setupStore();

describe("ID - page", () => {
  it("ID - search", () => {
    render(
      <Provider store={store}>
        <VacancySelected id={"search"} />
      </Provider>
    );
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
      <Provider store={store}>
        <VacancySelected id={"631ff10fbe34a93cf285ccae"} />
      </Provider>
    );

    setTimeout(() => {
      expect(screen.getByRole("vacancyInfo")).toBeInTheDocument();
      expect(screen.getByRole("vacancyList")).toBeInTheDocument();
      expect(screen.getAllByRole("vacancyItem")[0]).toBeInTheDocument();
    }, 3000);
  });

  it("ID - search + click", () => {
    render(
      <Provider store={store}>
        <VacancySelected id={"search"} />
      </Provider>
    );

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
