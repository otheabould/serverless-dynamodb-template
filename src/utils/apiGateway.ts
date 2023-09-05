import type { FromSchema } from "json-schema-to-ts";
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};

export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const apiResponses = {
  _DefineResponse(
    statusCode: number,
    data: Record<string, unknown>,
  ): APIGatewayProxyResult {
    return {
      statusCode: statusCode,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOW_ORIGIN || "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },

  _200(data: Record<string, unknown> = {}): APIGatewayProxyResult {
    return this._DefineResponse(200, data);
  },

  _400(message: string): APIGatewayProxyResult {
    return this._DefineResponse(400, { message });
  },

  _404(message: string): APIGatewayProxyResult {
    return this._DefineResponse(404, { message });
  },

  _409(message: string): APIGatewayProxyResult {
    return this._DefineResponse(409, { message });
  },

  _500(message: string): APIGatewayProxyResult {
    return this._DefineResponse(500, { message });
  },
};
