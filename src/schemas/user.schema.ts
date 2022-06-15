import { type } from "os";
import { charSchema } from "./";

class UserSchema {
  user = {
    type: "object",
    additionalProperties: false,
    properties: {
      id: { type: "string" },
      username: { type: "string" },
      email: { type: "string" },
      active: { type: "boolean" },
      adm: { type: "boolean" },
      char: { type: "string" },
    },
  };
  createUser = {
    type: "object",
    additionalProperties: false,
    properties: {
      username: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
      adm: { type: "boolean" },
    },
    required: ["username", "email", "password"],
  };
}

export default new UserSchema();
