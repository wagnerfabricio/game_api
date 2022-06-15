class AtacckSchema {
  serialize = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      power: { type: "integer" },
      accuracy: { type: "integer" },
      hits: { type: "integer" },
      type: { type: "string" },
    },
  };
  create = {
    type: "object",
    properties: {
      name: { type: "string" },
      power: { type: "integer" },
      accuracy: { type: "integer" },
      hits: { type: "integer" },
      type: { type: "string" },
    },
    required: ["name", "power", "accuracy", "hits", "type"],
  };
}

export default new AtacckSchema();
