import api, { login, logout } from "@/api/api";

class AuthService {
  async login(email: string, password: string) {
    try {
      const token = await login(email, password);
      if (token) {
        const userDataResponse = await api.get("/Auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userDataResponse.data;
        if (typeof window !== "undefined") {
          localStorage.setItem("user_data", JSON.stringify(userData));
        }

        return userData.role;
      }
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await logout();
      if (typeof window !== "undefined") {
        localStorage.removeItem("user_data");
        window.location.href = "/login";
      }
    } catch (error) {
      throw error;
    }
  }

  async signup(name: string, email: string, password: string) {
    try {
      const response = await api.post("/Auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        window.location.href = "/login";
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
