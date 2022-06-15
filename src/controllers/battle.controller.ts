import { Request, Response } from "express";
import { battleService } from "../services";

class BattleController {
  start = async (req: Request, res: Response): Promise<Response> => {
    const battle_token = await battleService.start(
      req.body.player,
      Number(req.params.enemy_level)
    );
    return res.status(200).json(battle_token);
  };
}
export default new BattleController();
