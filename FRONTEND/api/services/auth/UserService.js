import $api from "./index";
class UserService {
  static async getRequestsUser(login) {
    return $api.get("/users/requests/" + login);
  }
  static async setRequestsUser(login, requests) {
    return $api.post("/users/requests/", { login, requests });
  }
}
export { UserService };
