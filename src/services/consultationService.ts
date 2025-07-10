import api from "@/api/api";

class ConsultationService {
  async getConsultations(page: number, size: number) {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("size", size.toString());
    const response = await api.get(`/Consultation?${queryParams.toString()}`);
    return response.data;
  }

  async getConsultationById(id: string) {
    const response = await api.get(`/Consultation/${id}`);
    return response.data;
  }

  async updateConsultationStatus(id: string, status: string) {
    const response = await api.patch(`/Consultation/${id}/status`, { status });
    return response.data;
  }

  async getConsultationsByMemberId(memberId: string) {
    const response = await api.get(`/Consultation/member/${memberId}`);
    return response.data;
  }

  async getConsultationsByDoctorId(doctorId: string) {
    const response = await api.get(`/Consultation/doctor/${doctorId}`);
    return response.data;
  }

  async rateConsultation(id: string, rating: number) {
    const response = await api.patch(`/Consultation/${id}/rating`, { rating });
    return response.data;
  }
}

export default new ConsultationService();
