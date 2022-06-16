import app from "../../app";
import { connection } from "../../tests";
import { generateToken, generateAdmin, generateNotAdmin } from ".";
import supertest from "supertest";
import { User } from "../../entities";
import { userRepository } from "../../repositories";

describe("Get all sprites", () => {
  let userNotAdmin: User;

  beforeAll(async () => {
    await connection.connect();
    userNotAdmin = await userRepository.save({
      ...generateNotAdmin(),
      adm: false,
    });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Sprite as JSON response | Status code: 200", async () => {
    const token = generateToken(userNotAdmin);

    const response = await supertest(app)
      .get("/api/sprites")
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
  });

  it("Body error, missing token | Status code: 404", async () => {
    const response = await supertest(app).get("/api/sprites");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Missing authorization token.");
  });
});
