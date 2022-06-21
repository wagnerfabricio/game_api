import { sign, verify } from "jsonwebtoken";
import { Attack, Char } from "../entities";
import { charRepository as charRepo, statusRepository } from "../repositories";
import { battleUtil as btu } from "../utils";
import { Request } from "express";
import { IFighters } from "../interfaces";
import { AppError } from "../errors";

class BattleService {
  start = async (char: Char, enemy_level: number) => {
    //randomize enemy
    let enemy = await charRepo.getRandomChar(enemy_level);
    while (enemy.id === char.id) {
      enemy = await charRepo.getRandomChar(enemy_level);
    }

    char.token = null;
    const token: string = sign({ char, enemy }, process.env.SECRET_KEY, {
      expiresIn: process.env.BATTLE_EXPIRES_IN,
    });

    await charRepo.update(char.id, { token });

    return verify(token, process.env.SECRET_KEY, (err, decoded) => {
      return decoded;
    });
  };

  charAttack = async (attackId, fighters) => {
    const { char, enemy } = fighters;
    const charAttack = char.attacks.find((attack) => attack.id === attackId);
    const damage = btu.damageCalculator(char, enemy, charAttack);
    enemy.status.hp -= damage;
    return {
      damage: damage,
      charAttack: charAttack,
    };
  };

  enemyAttack = async (fighters: IFighters) => {
    const { char, enemy } = fighters;
    const enemyAttack = btu.enemyRandomAttack(fighters);
    const enemyDamage = btu.damageCalculator(enemy, char, enemyAttack);
    char.status.hp -= enemyDamage;
    return {
      enemyDamage: enemyDamage,
      enemyAttack: enemyAttack,
    };
  };

  winnerDrop = async (fighters: IFighters) => {
    const { char, enemy } = fighters;
    const dropAttack = btu.enemyRandomAttack(fighters);
    if (Math.random() * 100 < 100) {
      const userChar = await charRepo.retrieve({ id: char.id });
      userChar.attacks.push(dropAttack);
      await charRepo.save(userChar);
      return dropAttack;
    }
  };

  battle = async ({ body, fighters }: Request) => {
    const { char, enemy } = fighters;

    // Char Attack
    const { charAttack, damage } = await this.charAttack(
      body.attackId,
      fighters
    );

    // Enemy Attack
    const { enemyAttack, enemyDamage } = await this.enemyAttack(fighters);

    // Verify if char is alive
    if (enemy.status.agility > char.status.agility) {
      // If enemy is faster, char hp will be verified first.
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
      if (enemy.status.hp <= 0) {
        const userChar = await charRepo.retrieve({ id: char.id });
        //add points and remove token
        userChar.status.points += 1;
        userChar.token = null;
        await charRepo.save(userChar);
        //verify if enemy drop something
        const winDrop: Attack = await this.winnerDrop(fighters);
        return {
          msg: {
            char_attack: `${char.name} used ${charAttack.name}`,
            enemy_damage: `${enemy.name} take ${damage} damage and died.`,
            victory: `${char.name} win and now have ${userChar.status.points} status point!`,
            drop: winDrop ? `${char.name} got a ${winDrop.name}` : null,
          },
        };
      }
    } else {
      // If char is faster, enemy hp will be verified first.
      if (enemy.status.hp <= 0) {
        const userChar = await charRepo.retrieve({ id: char.id });
        //add points and remove token
        userChar.status.points += 1;
        userChar.token = null;
        await charRepo.save(userChar);
        //verify if enemy drop something
        const winDrop: Attack = await this.winnerDrop(fighters);
        return {
          msg: {
            char_attack: `${char.name} used ${charAttack.name}`,
            enemy_damage: `${enemy.name} take ${damage} damage and died.`,
            victory: `${char.name} win and now have ${userChar.status.points} status point!`,
            drop: winDrop ? `${char.name} got a ${winDrop.name}` : null,
          },
        };
      }
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
    }

    const updatedUserCharToken = sign({ char, enemy }, process.env.SECRET_KEY, {
      expiresIn: process.env.BATTLE_EXPIRES_IN,
    });
    await charRepo.update(char.id, { token: updatedUserCharToken });

    const msg =
      enemy.status.agility > char.status.agility
        ? {
            first_attack: `${enemy.name} is faster than ${char.name} and attack first.`,
            enemy_atatck:
              enemyDamage === 0
                ? `${enemy.name} missed ${enemyAttack.name}`
                : `${enemy.name} used ${enemyAttack.name}`,
            char_damage:
              enemyDamage === 0
                ? `${char.name} took no damage`
                : `${char.name} take ${enemyDamage} damage`,
            char_attack:
              damage === 0
                ? `${char.name} missed ${charAttack.name}`
                : `${char.name} used ${charAttack.name}`,
            enemy_damage:
              damage === 0
                ? `${enemy.name} took no damage`
                : `${enemy.name} take ${damage} damage`,
          }
        : {
            char_attack:
              damage === 0
                ? `${char.name} missed ${charAttack.name}`
                : `${char.name} used ${charAttack.name}`,
            enemy_damage:
              damage === 0
                ? `${enemy.name} took no damage`
                : `${enemy.name} take ${damage} damage`,
            enemy_atatck:
              enemyDamage === 0
                ? `${enemy.name} missed ${enemyAttack.name}`
                : `${enemy.name} used ${enemyAttack.name}`,
            char_damage:
              enemyDamage === 0
                ? `${char.name} took no damage`
                : `${char.name} take ${enemyDamage} damage`,
          };

    return {
      msg,
      char,
      enemy,
    };
  };
}

export default new BattleService();
