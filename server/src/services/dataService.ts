import { data } from "../data";

class DataService {
    
  getPaginatedData(chunk: number, limit: number) {
    const startIndex = (chunk - 1) * limit;
    return data.slice(startIndex, startIndex + limit);
  }

  async searchByNumber(number: string) {
    const query = number.trim();

    if (!query) return data;
  
    return data.filter((item) => item.number.toString().startsWith(query));
  }
  
}

export default new DataService();
