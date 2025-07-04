"use client";
import api from "@/api/api";

class RequestService {
  async getRequest(page: number, size: number, search?: string) {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("size", size.toString());
    if (search) {
      queryParams.append("search", search);
    }
    const response = await api.get(`/Request?${queryParams.toString()}`);
    return response.data;
  }

  async updateRequestStatus(id: string, status: string) {
    const response = await api.patch(`/Request/${id}/status`, { status });
    return response.data;
  }

  async deleteRequest(id: string) {
    const response = await api.delete(`/Request/${id}`);
    return response.data;
  }

  async getRequestById(id: string) {
    const response = await api.get(`/Request/${id}`);
    return response.data;
  }

  async createRequest(childId: string, doctorId: string, message: string) {
    const response = await api.post("/Request", {
      childId,
      doctorId,
      message,
    });
    return response.data;
  }

  async getRequestByMemberId(id: string) {
    const response = await api.get(`/Request/member/${id}`);
    return response.data;
  }

  async getRequestByDoctorId(id: string) {
    const response = await api.get(`/Request/doctor/${id}`);
    return response.data;
  }
}

export default new RequestService();
