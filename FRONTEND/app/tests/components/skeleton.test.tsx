/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import SkeltonItem from "@/components/vacancy/SkeltonItem";
import SkeletonVacanciesList from "@/components/vacancy/SkeletonVacanciesList";
import SkeletonVacancyInfo from "@/components/vacancy/SkeletonVacancyInfo";
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
