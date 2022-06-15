import { Router } from "express";
import { battleController } from "../controllers";

const battleRoutes = Router();

battleRoutes.get("", battleController.start);

export default battleRoutes;
