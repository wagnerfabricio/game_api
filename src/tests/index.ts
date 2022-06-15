import AppDataSource from "../data-source";
import { DataSource } from "typeorm";

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

export const connection = new Connection();
