import { Request, Response } from "express";
import { charService } from "../services";

class CharController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const newChar = await charService.createFullChar(req);
    return res.status(201).json(newChar);
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const chars = await charService.getAll();
    return res.status(200).json(chars);
  };

  retrieve = async (req: Request, res: Response): Promise<Response> => {
    const foundChar = await charService.retrieve(req);
    return res.status(200).json(foundChar);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const updatedChar = await charService.update(req);
    return res.status(200).json(updatedChar);
  };
}

export default new CharController();
