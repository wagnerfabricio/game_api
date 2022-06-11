import { Request, Response } from "express";
import { statusService } from "../services";

class StatusController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const status = await statusService.create(req);
    return res.status(201).json(status);
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const statuses = await statusService.getAll();
    return res.status(200).json(statuses);
  };

  retrieve = async (req: Request, res: Response): Promise<Response> => {
    const foundStatus = await statusService.retrieve(req);
    return res.status(200).json(foundStatus);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const updatedStatus = await statusService.update(req);
    return res.status(200).json(updatedStatus);
  };
}

export default new StatusController();
