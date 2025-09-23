import { client } from "../config/request";
import { setStorage } from "../store/local-storage";
interface LoginResponse {
  accessToken: string;
  refresh_token: string;
}

export async function login(username: string, password: string) {
  const { data } = await client.post<LoginResponse>("/admin/signin", {
    username,
    password,
  });
  setStorage("access_token", data.accessToken);
  setStorage("refresh_token", data.refresh_token);
  return data;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
}
