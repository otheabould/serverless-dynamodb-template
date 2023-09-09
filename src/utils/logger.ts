const isTest = process.env.NODE_ENV === "test" && process.env.DEBUG !== "ON";

const logger = (file: string) => {
  const fileName = file.split("/").slice(-1)[0];
  const extensions = [".js", ".jsx", ".ts"];

  const isInitialised = extensions.some((ext) => fileName.includes(ext));
  if (!isInitialised) {
    throw new Error(
      "Logger not initialized. Add `(__filename)` to the import line.",
    );
  }

  const log = (...args: unknown[]) => {
    if (!isTest) {
      console.log(`[${fileName}]`, ...args);
    }
  };

  return log;
};

export default logger;
