import { Request, Response, Router } from "express";

const helloRoutes = Router();

helloRoutes.get("", (_: Request, res: Response) =>
  res.json("Hello World! Want a churros?")
);

export default helloRoutes;
