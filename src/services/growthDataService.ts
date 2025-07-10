import api from "@/api/api";

class GrowthDataService {
  async getGrowthDataByChild(childId: string, page = 1, size = 10) {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    const response = await api.get(`/GrowthData/child/${childId}?${params.toString()}`);
    return response.data;
  }

  async getGrowthDataById(id: string) {
    const response = await api.get(`/GrowthData/${id}`);
    return response.data;
  }

  async createGrowthData(childId: string, data: any) {
    const response = await api.post(`/GrowthData?childId=${childId}`, data);
    // After creating, trigger velocity calculation and fetch
    const velocity = await this.getGrowthVelocityByChild(childId);
    return { ...response.data, velocity };
  }

  async updateGrowthData(id: string, data: any, childId?: string) {
    const response = await api.put(`/GrowthData/${id}`, data);
    // If childId is provided, trigger velocity calculation and fetch
    let velocity = null;
    if (childId) {
      velocity = await this.getGrowthVelocityByChild(childId);
    }
    return { ...response.data, velocity };
  }

  async deleteGrowthData(id: string) {
    const response = await api.delete(`/GrowthData/${id}`);
    return response.data;
  }

  async getGrowthVelocityByChild(childId: string) {
    const response = await api.get(`/GrowthData/velocity/child/${childId}`);
    return response.data;
  }
}

export default new GrowthDataService(); 