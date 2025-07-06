import api from "@/api/api";

class StatisticService {
  async getNewUserStat(value: number, unit: string) {
    const response = await api.get(
      `/Statistic/new-users?value=${value}&unit=${unit}`
    );
    return response;
  }

  async getNewRequestStat(value: number, unit: string) {
    const response = await api.get(
      `/Statistic/new-requests?value=${value}&unit=${unit}`
    );
    return response;
  }
}

export default new StatisticService();
