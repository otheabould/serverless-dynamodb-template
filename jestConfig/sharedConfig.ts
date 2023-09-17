import { JestConfigWithTsJest } from "ts-jest";

const sharedConfig: JestConfigWithTsJest = {
  verbose: true,
  preset: "ts-jest",
  rootDir: "../",
  roots: ["./__tests__/"],
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@handlers/(.*)$": "<rootDir>/src/handlers/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@db/(.*)$": "<rootDir>/src/db/$1",
  },
};

export default sharedConfig;
