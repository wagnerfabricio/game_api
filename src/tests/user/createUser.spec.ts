import { connection } from "../../tests";
import { generateNotAdmin, generateAdmin, generateToken } from "../.";
import supertest from "supertest";
import app from "../../app";
import { userRepository } from "../../repositories";

describe("Create user", () => {
  const user = generateNotAdmin();
  const userAdmin = generateAdmin();

  beforeAll(async () => {
    await connection.connect();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("should create a user", async () => {
    const response = await supertest(app)
      .post("/api/users/register")
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not create a user with an existing email", async () => {
    const response = await supertest(app)
      .post("/api/users/register")
      .send(user);

    expect(response.status).toBe(409);
    expect(response.body.error).toBe("Email already registered");
  });

  it("should ask for a token when creating an admin user", async () => {
    const response = await supertest(app)
      .post("/api/users/register")
      .send(userAdmin);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Missing authorization token.");
  });

  it("should return token malformed and 401", async () => {
    const response = await supertest(app)
      .post("/api/users/register")
      .set("Authorization", "Bearer qualquerbagaceiraaih")
      .send(userAdmin);

    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("jwt malformed");
    expect(response.body.error.name).toBe("JsonWebTokenError");
  });

  it("should need admin permission and status 422", async () => {
    const token = generateToken(user);
    const response = await supertest(app)
      .post("/api/users/register")
      .set("Authorization", `Bearer ${token}`)
      .send(userAdmin);

    expect(response.status).toBe(422);
    expect(response.body.error).toBe("Need admin permission.");
  });

  it("should create an admin user", async () => {
    const newUserAdmin = generateAdmin();

    await userRepository.save(userAdmin);
    const token = generateToken(userAdmin);
    const response = await supertest(app)
      .post("/api/users/register")
      .set("Authorization", `Bearer ${token}`)
      .send(newUserAdmin);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.adm).toBe(true);
  });

  it("should fail on schema validation", async () => {
    const wrongUser = {
      username: 37,
      email: "trintaesete@mail.com",
      password: "1234",
    };

    const response = await supertest(app)
      .post("/api/users/register")
      .send(wrongUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("data/username must be string");
  });
});
