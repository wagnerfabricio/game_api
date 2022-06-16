import { connection } from "../../tests";
import { generateToken, generateAdmin, generateNotAdmin } from ".";
import supertest from "supertest";
import app from "../../app";
import { User, Sprite } from "../../entities";
import { spriteRepository, userRepository } from "../../repositories";
import path from "path";

describe("Create a Sprite", () => {
  let userAdmin: User;
  let userNotAdmin: User;

  beforeAll(async () => {
    await connection.connect();

    userAdmin = await userRepository.save({ ...generateAdmin(), adm: true });
    userNotAdmin = await userRepository.save({
      ...generateNotAdmin(),
      adm: false,
    });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Sprite as JSON response | Status code: 201", async () => {
    const token = generateToken(userAdmin);

    const response = await supertest(app)
      .post("/api/sprites/admin")
      .set("Authorization", "Bearer " + token)
      .attach("image", "./src/tests/sprite/test.png");

    expect(response.status).toBe(201);
    expect(typeof response.body).toBe("object");
    expect(response.body[0].id).toBeTruthy();
    expect(response.body[0].url).toBeTruthy();
    expect(response.body[0].name).toBeTruthy();
  });

  it("Body error, missing token | Status code: 404", async () => {
    const response = await supertest(app)
      .post("/api/sprites/admin")
      .attach("image", "./src/tests/sprite/test.png");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Missing authorization token.");
    expect(typeof response.body).toBe("object");
  });

  it("Body error, invalid token | Status code: 401", async () => {
    const token = generateToken(userAdmin);

    const response = await supertest(app)
      .post("/api/sprites/admin")
      .set("Authorization", "Bearer 121321" + token)
      .attach("image", "./src/tests/sprite/test.png");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toHaveProperty("name");
    expect(response.body.error).toHaveProperty("message");
    expect(response.body.error.name).toBe("JsonWebTokenError");
    expect(response.body.error.message).toBe("invalid token");
    expect(response.body).toStrictEqual({
      error: {
        name: "JsonWebTokenError",
        message: "invalid token",
      },
    });
  });

  it("Body error, user not admin | Status code: 422", async () => {
    const token = generateToken(userNotAdmin);

    const response = await supertest(app)
      .post("/api/sprites/admin")
      .set("Authorization", "Bearer " + token)
      .attach("image", "./src/tests/sprite/test.png");

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Need admim permission.");
  });
});
