import { Request, Response } from "express";
import dataSource from "../data-source";
import { Category } from "../entities";

class CategoryService {
  addCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = new Category();

    category.name = name;

    dataSource
      .getRepository(Category)
      .save(category)
      .then((response) => res.status(201).json(response));
  };

  getCategories = async (req: Request, res: Response) => {
    return dataSource
      .getRepository(Category)
      .find()
      .then((response) => res.status(200).json(response));
  };

  getCategoryByAttack = async (req: Request, res: Response) => {
    const { name } = req.body;

    return dataSource
      .getRepository(Category)
      .findBy({ attacks: { name: name } })
      .then((response) => res.status(200).json(response));
  };
}

export default new CategoryService();
