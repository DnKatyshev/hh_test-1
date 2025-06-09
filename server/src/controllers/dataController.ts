import { Request, Response } from "express";
import dataService from "../services/dataService";

class DataController {

  async getData(req: Request, res: Response) {
    try {
      const chunk = parseInt(req.query.chunk as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const data = await dataService.getPaginatedData(chunk, limit);
      
      res.status(200).json(data);
    } 
    
    catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

    
  async searchByNumber(req: Request, res: Response) {
    try {
      const number = req.query.number as string;

      const data = await dataService.searchByNumber(number);

      res.status(200).json(data);
    } 
    
    catch (error) {
      res.status(500).json({ message: "Search error", error });
    }
  }
}

export default new DataController();
