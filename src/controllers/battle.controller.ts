import { Request, Response } from "express";
import { battleService } from "../services";

class BattleController {
  start = async (req: Request, res: Response): Promise<Response> => {
    console.log("start battle");
    const battle_token = await battleService.start(
      req.user.char,
      Number(req.params.lvl)
    );
    return res.status(200).json(battle_token);
  };
  battle = async (req: Request, res: Response): Promise<Response> => {
    const battle_result = await battleService.battle(req);
    return res.status(200).json(battle_result);
  };
}
export default new BattleController();
