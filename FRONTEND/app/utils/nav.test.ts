/**
 * @jest-environment node
 */
import axios from "axios";
import { API_URl } from "@/api/index";
import { setupStore } from "@/store/store";

import navSlice, { setSearch, setActive } from "@/store/reducers/navSlice";

const store = setupStore();

describe("Nav Store", () => {
  test("setActive", async () => {
    expect(navSlice(store.getState().navReducer, setActive(false)).active).toBe(
      false
    );
    expect(navSlice(store.getState().navReducer, setActive(true)).active).toBe(
      true
    );
  });
  test("setSearch", async () => {
    expect(
      navSlice(
        store.getState().navReducer,
        setSearch({
          skill: "Nest.js",
          lvl: "Junior",
          active: false,
        })
      )
    ).toStrictEqual({
      skill: "Nest.js",
      lvl: "Junior",
      active: false,
    });
  });
});
