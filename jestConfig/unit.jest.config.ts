import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: "ts-jest",
  // testEnvironment: "node",
  testMatch: ["**/*.unit.test.ts"],
  rootDir: "../",
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@functions/(.*)$": "<rootDir>/src/functions/$1",
  },
};

export default config;
