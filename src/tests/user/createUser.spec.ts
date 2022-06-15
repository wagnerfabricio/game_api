import { connection } from "../../tests";
import { generateUser } from ".";
import supertest from "supertest";
import app from "../../app";
import { User } from "../../entities";
import { userRepository } from "../../repositories";
import { hash } from "bcrypt";

describe("Create user", () => {
  beforeAll(async () => {
    await connection.connect();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("should create a user", async () => {
    const user = generateUser();

    const response = await supertest(app)
      .post("/api/users/register")
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not create a user with an existing email", async () => {
    const user = generateUser();

    const response = await supertest(app)
      .post("/api/users/register")
      .send(user);

    expect(response.status).toBe(409);
    expect(response.body.error).toBe("Email already registered");
  });
});
