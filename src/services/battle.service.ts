import { sign, verify } from "jsonwebtoken";
import { Attack, Char } from "../entities";
import { IFighters } from "../interfaces";
import { charRepository as charRepo } from "../repositories";
import { battleUtil as btu } from "../utils";
import { Request } from "express";
import { AppError } from "../errors";

class BattleService {
  start = async (char: Char, enemy_level: number) => {
    //randomize enemy
    const enemy = await charRepo.getRandomChar(enemy_level);

    //verify first attacker
    if (enemy.status.agility > char.status.agility) {
      return;
    }
    char.token = "";

    const token: string = sign({ char, enemy }, process.env.SECRET_KEY, {
      expiresIn: process.env.BATTLE_EXPIRES_IN,
    });

    await charRepo.update(char.id, { token });

    return verify(token, process.env.SECRET_KEY, (err, decoded) => {
      return decoded;
    });
  };

  battle = async ({ body, fighters }: Request) => {
    const { char, enemy } = fighters;

    const charAttack = char.attacks.find(
      (attack) => attack.id === body.attackId
    );
    const damage = btu.damageCalculator(fighters, charAttack);
    enemy.status.hp -= damage;
    if (enemy.status.hp <= 0) {
      await charRepo.update(char.id, { token: null });
      return {
        msg: {
          char_attack: `${char.name} used ${charAttack.name}`,
          enemy_damage: `${enemy.name} take ${damage} damage and died.`,
          victory: `${char.name} wins!`,
        },
      };
    }
    const enemyAttack = btu.enemyRandomAttack(fighters);
    const enemyDamage = btu.damageCalculator(fighters, enemyAttack);
    char.status.hp -= enemyDamage;
    if (char.status.hp <= 0) {
      await charRepo.update(char.id, { token: null });
      return {
        msg: {
          enemy_attack: `${enemy.name} used ${enemyAttack.name}`,
          char_damage: `${char.name} take ${enemyDamage} damage and died.`,
          victory: `${enemy.name} wins!`,
        },
      };
    }

    const updatedUserCharToken = sign({ char, enemy }, process.env.SECRET_KEY, {
      expiresIn: process.env.BATTLE_EXPIRES_IN,
    });
    await charRepo.update(char.id, { token: updatedUserCharToken });

    return {
      msg: {
        char_attack: `${char.name} used ${charAttack.name}`,
        enemy_damage: `${enemy.name} take ${damage} damage`,
        enemy_atatck: `${enemy.name} used ${enemyAttack.name}`,
        char_damage: `${char.name} take ${enemyDamage} damage`,
      },
      char,
      enemy,
    };
  };

  calculateDamage = async (playerChar: Char, player_atack_id: string) => {
    const fighters = verify(
      playerChar.token,
      process.env.SECRET_KEY,
      async (err, decoded) => {
        return decoded;
      }
    );
    const damage = 1;
  };
}

export default new BattleService();
