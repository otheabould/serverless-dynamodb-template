import { JestConfigWithTsJest } from "ts-jest";

const sharedConfig: JestConfigWithTsJest = {
  verbose: true,
  preset: "ts-jest",
  rootDir: "../",
  roots: ["./__tests__/"],
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@functions/(.*)$": "<rootDir>/src/functions/$1",
  },
};

export default sharedConfig;
