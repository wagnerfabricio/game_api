import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = {
  docker: new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
  }),
  test: new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
    synchronize: true,
  }),
  production: new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    ssl: { rejectUnauthorized: false },
    entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
  }),
};

export default AppDataSource[process.env.NODE_ENV];
