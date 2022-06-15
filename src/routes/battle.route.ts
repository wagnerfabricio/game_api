import { Router } from "express";
import { battleController } from "../controllers";
import { verifyBattleToken, verifyToken } from "../middlewares";

const battleRoutes = Router();

battleRoutes.get("/:lvl", verifyToken, battleController.start);
battleRoutes.post("", verifyToken, verifyBattleToken, battleController.battle);

export default battleRoutes;
