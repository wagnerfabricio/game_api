class CategorySchema {
  category = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      attacks: { type: "array" },
    },
  };

  createCategory = {
    type: "object",
    additionalProperties: false,
    properties: {
      name: { type: "string" },
      attacks: { type: "array" },
    },
    required: ["name"],
    optionalProperties: { attacks: { type: "array" } },
  };
}

export default new CategorySchema();
