/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import SkeltonItem from "@/components/vacancie/SkeltonItem";
import SkeletonVacanciesList from "@/components/vacancie/SkeletonVacanciesList";
import SkeletonVacancyInfo from "@/components/vacancie/SkeletonVacancyInfo";
import { renderWithState } from "@/tests/helpers/renderWithState";

describe("Skelton Items", () => {
  it("SkeltonItem", () => {
    render(<SkeltonItem />);
    expect(screen.getByRole("skeleton")).toBeInTheDocument();
  });
  it("SkeletonVacanciesList", () => {
    render(renderWithState(<SkeletonVacanciesList />));
    expect(screen.getAllByRole("skeleton")[0]).toBeInTheDocument();
  });
  it("SkeletonVacancyInfo", () => {
    render(renderWithState(<SkeletonVacancyInfo />));
    expect(screen.getByRole("skeleton")).toBeInTheDocument();
  });
});
