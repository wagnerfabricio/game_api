import AppDataSource from "../data-source";
import { DataSource } from "typeorm";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { faker } from "@faker-js/faker";

config();

export class Connection {
  connection: DataSource;

  connect = async () => {
    await AppDataSource.initialize()
      .then((res) => (this.connection = res))
      .catch((err) => console.log("Error during db connection", err));
  };

  disconnect = async () => {
    await this.connection.destroy()
  }

  clear = async () => {
    const entities = this.connection.entityMetadatas
    entities.forEach(async (entity) => {
      const repo = this.connection.getRepository(entity.name)
      await repo.query(`DELETE FROM ${entity.tableName}`)
    })
  }
}

const connection = new Connection();

const generateAdmin = () => {
  return {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.datatype.string(4),
    adm: true,
  };
};

const generateNotAdmin = () => {
  return {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.datatype.string(4),
    adm: false,
  };
};

const generateToken = (user): string => {
  const token = jwt.sign({ ...user }, process.env.SECRET_KEY as string, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return token;
};

const generateChar = () => {
  return {
    name: faker.random.words(3),
    vigor: Number(faker.random.numeric(2)),
    strength: Number(faker.random.numeric(2)),
    agility: Number(faker.random.numeric(2)),
    magic: Number(faker.random.numeric(2)),
    defense: Number(faker.random.numeric(2)),
    points: Number(faker.random.numeric(2)),
    spriteId: faker.internet.avatar(),
  }
}

const generateAttack = () => {
  return {
    name: faker.random.words(3),
    power: Number(faker.random.numeric(2)),
    accuracy: Number(faker.random.numeric(2)),
    hits: Number(faker.random.numeric(1)),
    type: ['fisico', 'magico', 'ranged'][Math.floor(Math.random() * 3)],
  }
}

export {
  generateAttack,
  generateChar,
  generateToken,
  generateAdmin,
  generateNotAdmin,
  connection,
}
