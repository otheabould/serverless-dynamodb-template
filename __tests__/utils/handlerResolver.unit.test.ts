import { handlerPath } from "@utils/handlerResolver";

describe("handlerResolver", () => {
  describe("handlerPath", () => {
    it("should return the current project folder", () => {
      const actual = handlerPath(__dirname);
      expect(actual).toBe("__tests__/utils");
    });
  });
});
