import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  verbose: true,
  testMatch: ["**/*.unit.test.ts"],
};

export default config;
