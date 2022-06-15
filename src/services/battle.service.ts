import { sign, verify } from "jsonwebtoken";
import { Attack, Char } from "../entities";
import { charRepository as charRepo } from "../repositories";

class BattleService {
  // calculateDamage = async (player: Char, player_atack_id: string) => {
  //   const damage = verify(player.token, process.env.SECRET_KEY, async (err, decoded) => {
  //     //((for*pow) * (1-((res_mons / 100) + (agi_mons / 1000))))
  //     const player_atk = decoded.player.attacks.find(atk => atk.id === player_atk_id);
  //   })
  // }

  start = async (player: Char, enemy_level: number) => {
    //randomize enemy
    const enemy = await charRepo.getRandomChar(enemy_level);

    //verify first attacker
    if (enemy.status.agility > player.status.agility) {
      return;
    }

    const token: string = sign({ player, enemy }, process.env.SECRET_KEY, {
      expiresIn: process.env.BATTLE_EXPIRES_IN,
    });

    charRepo.update(player.id, { token });

    return verify(token, process.env.SECRET_KEY, (err, decoded) => {
      return decoded;
    });
  };
}

export default new BattleService();
