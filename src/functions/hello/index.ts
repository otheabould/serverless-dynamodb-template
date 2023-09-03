import { handlerPath } from "src/common/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "POST",
        path: "/hello",
      },
    },
  ],
};
