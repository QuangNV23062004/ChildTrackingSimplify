import api from "@/api/api";

class ChildService {
  async getChildrenByUser(userId: string, page = 1, size = 10, search = "") {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (search) params.append("search", search);
    const response = await api.get(`/Child/user/${userId}?${params.toString()}`);
    return response.data;
  }

  async getChildById(id: string) {
    const response = await api.get(`/Child/${id}`);
    return response.data;
  }

  async createChild(data: any) {
    // Convert enum values to numbers for backend
    const childData = {
      name: data.name || "Unnamed",
      gender: data.gender,
      birthDate: data.birthDate,
      note: data.note || "N/A",
      relationship: data.relationship || "Parent",
      feedingType: this.convertFeedingTypeToNumber(data.feedingType),
      allergies: this.convertAllergiesToNumbers(data.allergies)
    };
    const response = await api.post("/Child", childData);
    return response.data;
  }

  async updateChild(id: string, data: any) {
    // Convert enum values to numbers for backend
    const updateData = {
      name: data.name || "Unnamed",
      gender: data.gender,
      birthDate: data.birthDate,
      note: data.note || "N/A",
      relationship: data.relationship || "Parent",
      feedingType: this.convertFeedingTypeToNumber(data.feedingType),
      allergies: this.convertAllergiesToNumbers(data.allergies)
    };
    
    // Debug: Log the data being sent to API
    console.log("API update data:", updateData);
    
    const response = await api.put(`/Child/${id}`, updateData);
    return response.data;
  }

  async deleteChild(id: string) {
    const response = await api.delete(`/Child/${id}`);
    return response.data;
  }

  private convertFeedingTypeToNumber(feedingType: any): number {
    if (typeof feedingType === 'number') return feedingType;
    if (typeof feedingType === 'string') {
      switch (feedingType) {
        case 'NA': return 0;
        case 'Breastfeeding': return 1;
        case 'FormulaFeeding': return 2;
        case 'SolidFoods': return 3;
        default: return 0;
      }
    }
    return 0; // Default to NA
  }

  private convertAllergiesToNumbers(allergies: any[]): number[] {
    if (!Array.isArray(allergies) || allergies.length === 0) return [0]; // Default to None
    
    return allergies.map(allergy => {
      if (typeof allergy === 'number') return allergy;
      if (typeof allergy === 'string') {
        switch (allergy) {
          case 'None': return 0;
          case 'NA': return 1;
          case 'DrugAllergy': return 2;
          case 'FoodAllergy': return 3;
          case 'LatexAllergy': return 4;
          case 'MoldAllergy': return 5;
          case 'PetAllergy': return 6;
          case 'PollenAllergy': return 7;
          default: return 0;
        }
      }
      return 0; // Default to None
    });
  }
}

export default new ChildService(); 