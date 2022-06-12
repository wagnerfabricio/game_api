import { Request, Response } from "express";
import { attackService } from "../services";

class AttackController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const newAttack = await attackService.create(req);
    return res.status(201).json(newAttack);
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const attacks = await attackService.getAll();
    return res.status(200).json(attacks);
  };
}

export default new AttackController();
