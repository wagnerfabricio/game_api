import { Request, Response, Router } from "express";

const helloRoutes = Router();

helloRoutes.get("", (_: Request, res: Response) => res.json("Hello World!"));

export default helloRoutes;
