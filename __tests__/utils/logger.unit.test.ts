import logger from "@utils/logger";

describe("logger", () => {
  it("Should error if the file type is invalid", () => {
    const t = () => logger("name.invalid");

    expect(t).toThrow(
      "Logger not initialized. Add `(__filename)` to the import line.",
    );
  });
});
