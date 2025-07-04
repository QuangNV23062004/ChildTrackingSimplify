import api from "@/api/api";

class UserService {
  async getUsers(page: number, size: number) {
    try {
      const response = await api.get(`/User?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      const response = await api.post("/User", {
        name,
        email,
        password,
        role,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const response = await api.delete(`/User/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
