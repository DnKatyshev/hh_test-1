import { data } from "../data";

class DataService {
    
  getPaginatedData(chunk: number, limit: number) {
    const startIndex = (chunk - 1) * limit;
    return data.slice(startIndex, startIndex + limit);
  }

  async searchByNumber(number: string, chunk: number, limit: number) {
    const query = number.trim();
    const filtered = data.filter((item) =>
      item.number.toString().startsWith(query)
    );
  
    const startIndex = (chunk - 1) * limit;
    return filtered.slice(startIndex, startIndex + limit);
  }
  
}

export default new DataService();
