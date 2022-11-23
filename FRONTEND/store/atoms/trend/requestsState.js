import { atom } from "recoil";

export const requestsState = atom({
  key: "requestsState",
  default: new Array(),
});
