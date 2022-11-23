import $api from "./index";

export default class AuthService {
  static async login(login, password) {
    return $api.post("/auth/login", { login: login, password: password });
  }

  static async registration(login, password) {
    return $api.post("/auth", { login, password });
  }

  static async logout() {
    return $api.post("/auth/logout");
  }

  static async refresh() {
    return $api.post(`/auth/refresh`);
  }
}
