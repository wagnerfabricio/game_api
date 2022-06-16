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
    await this.connection.destroy();
  };
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

export { generateToken, generateAdmin, generateNotAdmin, connection };
