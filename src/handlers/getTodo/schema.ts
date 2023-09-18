export const schema = {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
  },
  required: ["pathParameters"],
} as const;
