import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URI_DEV,
  logging: true,
  synchronize: true,
  entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
  migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
});

const TestDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
  synchronize: true,
});

export default process.env.NODE_ENV === "test" ? TestDataSource : AppDataSource;
