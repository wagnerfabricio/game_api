import { Request, Response } from "express";
import dataSource from "../data-source";
import { Attack, Char, User } from "../entities";
import { Sprite, Status } from "../entities/char";
import { charRepository } from "../repositories";
import { ICreateUserChar } from "../interfaces";
import { AppError } from "../errors";
import { charUtil as utl } from "../utils";
class CharService {
  create = async ({ validated }: Request): Promise<Char> => {
    const char = await charRepository.save(validated as Char);
    return char;
  };

  getAll = async (): Promise<Char[]> => {
    const chars = await charRepository.getAll();
    return chars;
  };

  retrieve = async ({ user }: Request): Promise<Char> => {
    const foundChar = await charRepository.retrieve(user.char);
    return foundChar;
  };

  update = async ({ char, validated }: Request) => {
    const updatedChar = await charRepository.update(char.id, {
      ...(validated as Char),
    });
    return updatedChar;
  };

  createUserChar = async ({ validated, user }: Request) => {
    const {
      name,
      vigor,
      strength,
      agility,
      magic,
      defense,
      // hp,
      points,
      spriteId,
    } = validated as Partial<ICreateUserChar>; //mudado para partial <<<<< Verificar >>>>>

    const newChar = new Char();

    newChar.name = name;

    const newStatus = new Status();
    newStatus.vigor = vigor;
    newStatus.strength = strength;
    newStatus.agility = agility;
    newStatus.magic = magic;
    newStatus.defense = defense;
    newStatus.hp = vigor * 10;
    newStatus.points = points;

    newChar.status = newStatus;

    const charSprite = await dataSource
      .getRepository(Sprite)
      .findOneByOrFail({ id: spriteId });

    newChar.sprite = charSprite;

    const attackList = await dataSource
      .getRepository(Attack)
      .createQueryBuilder()
      .orderBy("RANDOM()")
      .limit(3)
      .getMany();

    newChar.attacks = attackList;

    await charRepository.save(newChar);
    user.char = newChar;
    await dataSource.getRepository(User).save(user);

    return newChar;
  };

  leaderboard = async (): Promise<Char[]> => {
    const leaderboard = await dataSource
      .getRepository(Char)
      .createQueryBuilder("char")
      .leftJoinAndSelect("char.status", "status")
      .orderBy({ "status.level": "DESC" })
      .limit(10)
      .getMany();

    return leaderboard;
  };

  upgradeChar = async ({ body, user }: Request) => {
    const { char } = user;
    if (!utl.verifyMaxLvl(char)) {
      throw new AppError(400, "Max level reached");
    }
    switch (body.status) {
      case "vigor":
        if (char.status.points >= 1) {
          char.status.points -= 1;
          char.status.vigor += 1;
          char.status.hp = char.status.vigor * 10;
          char.status.level += 1;
          await charRepository.save(char);
          return {
            msg: `Up to LVL ${
              char.status.level
            }! ${body.status.toUpperCase()} upgraded to ${
              char.status.vigor
            } points!`,
          };
        } else {
          throw new AppError(
            400,
            "You don't have enough points to upgrade this attribute"
          );
        }
        break;
      case "strength":
        if (char.status.points >= 1) {
          char.status.points -= 1;
          char.status.strength += 1;
          char.status.level += 1;
          await charRepository.save(char);
          return {
            msg: `Up to LVL ${
              char.status.level
            }! ${body.status.toUpperCase()} upgraded to ${
              char.status.strength
            } points!`,
          };
        } else {
          throw new AppError(
            400,
            "You don't have enough points to upgrade this attribute"
          );
        }
        break;
      case "agility":
        if (char.status.points >= 1) {
          char.status.points -= 1;
          char.status.agility += 1;
          char.status.level += 1;
          await charRepository.save(char);
          return {
            msg: `Up to LVL ${
              char.status.level
            }! ${body.status.toUpperCase()} upgraded to ${
              char.status.agility
            } points!`,
          };
        } else {
          throw new AppError(
            400,
            "You don't have enough points to upgrade this attribute"
          );
        }
        break;
      case "magic":
        if (char.status.points >= 1) {
          char.status.points -= 1;
          char.status.magic += 1;
          char.status.level += 1;
          await charRepository.save(char);
          return {
            msg: `Up to LVL ${
              char.status.level
            }! ${body.status.toUpperCase()} upgraded to ${
              char.status.magic
            } points!`,
          };
        } else {
          throw new AppError(
            400,
            "You don't have enough points to upgrade this attribute"
          );
        }
        break;
      case "defense":
        if (char.status.points >= 1) {
          char.status.points -= 1;
          char.status.defense += 1;
          char.status.level += 1;
          await charRepository.save(char);
          return {
            msg: `Up to LVL ${
              char.status.level
            }! ${body.status.toUpperCase()} upgraded to ${
              char.status.defense
            } points!`,
          };
        } else {
          throw new AppError(
            400,
            "You don't have enough points to upgrade this attribute"
          );
        }
        break;
    }
  };
}

export default new CharService();
