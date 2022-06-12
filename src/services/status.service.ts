import { Request } from "express";
import { Status } from "../entities";
import { statusRepository } from "../repositories";

class StatusService {
  create = async ({ validated }: Request): Promise<Status> => {
    const status = await statusRepository.save(validated as Status);
    return status;
  };

  getAll = async (): Promise<Status[]> => {
    const statuses = await statusRepository.getAll();
    return statuses;
  };

  retrieve = async ({ status }: Request): Promise<Status> => {
    const foundStatus = await statusRepository.retrieve(Status);
    return foundStatus;
  };

  update = async ({ status, validated }: Request) => {
    const updatedStatus = await statusRepository.update(status.id, {
      ...(validated as Status),
    });
    return updatedStatus;
  };
}

export default new StatusService();
