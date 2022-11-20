/**
 * @jest-environment node
 */

import axios from "axios";
import { IVacancy } from "@/api/models/IVacancy";
import { API_URl } from "@/api/index";

describe("Vacancy Service", () => {
  test("getOneById", async () => {
    const response = await axios.get<IVacancy>(
      API_URl + `/vacancies/id/631ff10fbe34a93cf285ccae`
    );
    expect(response.data.createdAt).toBe(1663037711127);
  });
  test("getVacancies", async () => {
    const response = await axios.get<IVacancy[]>(API_URl + `/vacancies/`);
    expect(response.data.length).toBeGreaterThan(1);
  });
});
