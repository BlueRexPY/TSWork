/**
 * @jest-environment node
 */
import axios from "axios";
import { AuthResponse } from "@/api/models/response/AuthResponse";
import { API_URl } from "@/api/index";
import { setupStore } from "@/store/store";
import authSlice, {
  loginAuth,
  updateAuth,
  logoutAuth,
} from "@/store/reducers/authSlice";
import { IUser } from "@/api/models/IUser";
const store = setupStore();

describe("Auth Service", () => {
  test("login", async () => {
    const response = await axios.post<AuthResponse>(API_URl + "/auth/login", {
      email: "ruslanryscovbluerex@gmail.com",
      password: "password",
    });
    expect(response.data.user).toStrictEqual({
      _id: "631686e91779a88890fa0ffa",
      cv: "https://storage.cloud.google.com/tswork-files/13d82e5b-0991-49e0-94f6-5da0d4872331.pdf",
      email: "ruslanryscovbluerex@gmail.com",
      name: "name",
      surname: "surname",
      number: "+12(31)2332-1231",
      github: "https://github.com/BlueRexPY",
      password: "$2a$05$SDIJySEIrYnP2UfWNtLGFeynJt2nFUy.R6pXvP6Ypx7wGBte4OtuC",
      roles: ["USER"],
      vacancies: [],
      responses: [],
      active: false,
      activationLink: "a312cc6e-a207-45cc-af42-d31b6d671c48",
      __v: 0,
    });
    expect(
      authSlice(store.getState().authReducer, loginAuth(response.data)).auth
    ).toBe(true);
  });
  test("logout", async () => {
    const responseLogin = await axios.post<AuthResponse>(
      API_URl + "/auth/login",
      { email: "ruslanryscovbluerex@gmail.com", password: "password" }
    );
    const responseLogout = await axios.post<boolean>(API_URl + "/auth/logout", {
      refresh: responseLogin.data.refreshToken,
    });
    expect(responseLogout.data).toBe(true);
    expect(authSlice(store.getState().authReducer, logoutAuth()).auth).toBe(
      false
    );
  });
  test("update", async () => {
    const responseUpdate = await axios.post<IUser>(API_URl + "/users/update", {
      name: "name",
      surname: "surname",
      github: "https://github.com/BlueRexPY",
      email: "ruslanryscovbluerex@gmail.com",
      number: "+12(31)2332-1231",
    });
    expect(responseUpdate.data).toStrictEqual({
      _id: "631686e91779a88890fa0ffa",
      cv: "https://storage.cloud.google.com/tswork-files/13d82e5b-0991-49e0-94f6-5da0d4872331.pdf",
      email: "ruslanryscovbluerex@gmail.com",
      name: "name",
      surname: "surname",
      number: "+12(31)2332-1231",
      github: "https://github.com/BlueRexPY",
      password: "$2a$05$SDIJySEIrYnP2UfWNtLGFeynJt2nFUy.R6pXvP6Ypx7wGBte4OtuC",
      roles: ["USER"],
      vacancies: [],
      responses: [],
      active: false,
      activationLink: "a312cc6e-a207-45cc-af42-d31b6d671c48",
      __v: 0,
    });
    expect(
      authSlice(store.getState().authReducer, updateAuth(responseUpdate.data))
        .auth
    ).toBe(true);
  });
});
