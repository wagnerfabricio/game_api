class CharSchema {
  char = {
    type: "object",
    properties: {
      name: { type: "string" },
      vigor: { type: "integer" },
      strength: { type: "integer" },
      agility: { type: "integer" },
      magic: { type: "integer" },
      defense: { type: "integer" },
      hp: { type: "integer" },
      points: { type: "integer" },
      spriteId: { type: "string" },
    },
  };

  createChar = {
    type: "object",
    additionalProperties: false,
    properties: {
      name: { type: "string" },
      vigor: { type: "integer" },
      strength: { type: "integer" },
      agility: { type: "integer" },
      magic: { type: "integer" },
      defense: { type: "integer" },
      // hp: { type: "integer" },
      points: { type: "integer" },
      spriteId: { type: "string" },
    },
    required: [
      "name",
      "vigor",
      "strength",
      "agility",
      "magic",
      "defense",
      // "hp",
      "points",
      "spriteId",
    ],
  };
}

export default new CharSchema();
