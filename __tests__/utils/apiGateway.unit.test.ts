import { apiResponses } from "@utils/apiGateway";

describe("apiResponses", () => {
  describe("_DefineResponse", () => {
    it("should add the correct headers", () => {
      const actual = apiResponses._DefineResponse(200, {}).headers;

      expect(actual["Access-Control-Allow-Origin"]).toBe("*");
      expect(actual["Access-Control-Allow-Credentials"]).toBe(true);
      expect(actual["Content-Type"]).toBe("application/json");
    });
  });
});
