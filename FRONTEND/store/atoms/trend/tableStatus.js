import { atom } from "recoil";

export const tableStatus = atom({
  key: "tableStatus",
  default: { update: [true], delete: [true] },
});
