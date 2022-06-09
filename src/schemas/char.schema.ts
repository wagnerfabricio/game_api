import { Category } from "../entities";
import categorySchema from "./category.schema";

class CharSchema {
  char = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      life: { type: "integer" },
      currentLife: { type: "integer" },
      resource: { type: "integer" },
      currentResource: { type: "integer" },
      defence: { type: "integer" },
      level: { type: "integer" },
      category: { type: categorySchema.category },
    },
  };

  createChar = {
    type: "object",
    additionalProperties: false,
    properties: {
      name: { type: "string" },
      life: { type: "integer" },
      currentLife: { type: "integer" },
      resource: { type: "integer" },
      currentResource: { type: "integer" },
      defence: { type: "integer" },
      level: { type: "integer" },
      //   category: { type: Category },
    },
    required: [
      "name",
      "life",
      "currentLife",
      "resource",
      "currentResource",
      "defence",
      //   "category",
    ],
    // optionalProperties: { id: { type: "string" }, level: { type: "integer" } },
  };
}

export default new CharSchema();
