import Ajv from "ajv";
import { Char, User } from "../entities";

const ajv = new Ajv({ removeAdditional: true });

const serializeSchema = async (schema: object, payload: User | Char) => {
  const serialize = ajv.compile(schema);
  await serialize(payload);

  return payload;
};

export default serializeSchema;
