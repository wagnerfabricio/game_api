import { Request, Response } from "express";
import { charService } from "../services";

class CharController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const newChar = await charService.create(req);
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

  createUserChar = async (req: Request, res: Response): Promise<Response> => {
    const newChar = await charService.createUserChar(req);
    return res.status(201).json(newChar);
  };

  leaderboard = async (req: Request, res: Response): Promise<Response> => {
    const leaderboard = await charService.leaderboard();
    return res.status(200).json(leaderboard);
  };

  upgrade = async (req: Request, res: Response): Promise<Response> => {
    const upgradedChar = await charService.upgradeChar(req);
    return res.status(200).json(upgradedChar);
  };
}

export default new CharController();
