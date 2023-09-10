import { JestConfigWithTsJest } from "ts-jest";
import sharedConfig from "./sharedConfig";

const config: JestConfigWithTsJest = {
  ...sharedConfig,
  testMatch: ["**/*.unit.test.ts"],
};

export default config;
