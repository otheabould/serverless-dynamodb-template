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

  describe("_200", () => {
    it("should serialize the response body", () => {
      const response = apiResponses._200({ message: "hello" });
      const actual = response.body;

      expect(actual).toBe('{"message":"hello"}');
    });

    it("should add the correct headers", () => {
      const actual = apiResponses._DefineResponse(200, {}).headers;

      expect(actual["Access-Control-Allow-Origin"]).toBe("*");
      expect(actual["Access-Control-Allow-Credentials"]).toBe(true);
      expect(actual["Content-Type"]).toBe("application/json");
    });
  });

  describe("_400", () => {
    it("should add message the response body", () => {
      const response = apiResponses._400("hello");
      const actual = response.body;

      expect(actual).toBe('{"message":"hello"}');
    });

    it("should add the correct headers", () => {
      const actual = apiResponses._DefineResponse(200, {}).headers;

      expect(actual["Access-Control-Allow-Origin"]).toBe("*");
      expect(actual["Access-Control-Allow-Credentials"]).toBe(true);
      expect(actual["Content-Type"]).toBe("application/json");
    });
  });

  describe("_404", () => {
    it("should add message the response body", () => {
      const response = apiResponses._404("hello");
      const actual = response.body;

      expect(actual).toBe('{"message":"hello"}');
    });
  });

  describe("_409", () => {
    it("should add message the response body", () => {
      const response = apiResponses._409("hello");
      const actual = response.body;

      expect(actual).toBe('{"message":"hello"}');
    });

    it("should add the correct headers", () => {
      const actual = apiResponses._DefineResponse(200, {}).headers;

      expect(actual["Access-Control-Allow-Origin"]).toBe("*");
      expect(actual["Access-Control-Allow-Credentials"]).toBe(true);
      expect(actual["Content-Type"]).toBe("application/json");
    });
  });

  describe("_500", () => {
    it("should add message the response body", () => {
      const response = apiResponses._500("hello");
      const actual = response.body;

      expect(actual).toBe('{"message":"hello"}');
    });

    it("should add the correct headers", () => {
      const actual = apiResponses._DefineResponse(200, {}).headers;

      expect(actual["Access-Control-Allow-Origin"]).toBe("*");
      expect(actual["Access-Control-Allow-Credentials"]).toBe(true);
      expect(actual["Content-Type"]).toBe("application/json");
    });
  });
});
