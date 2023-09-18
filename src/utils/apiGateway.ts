import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Handler,
} from "aws-lambda";

type ValidatedAPIGatewayProxyEvent<T> = Omit<APIGatewayProxyEventV2, "body"> & {
  body: T;
};

export type ValidatedHttpApiHandler<S = never> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyStructuredResultV2
>;

export const apiResponses = {
  _DefineResponse(
    statusCode: number,
    data: Record<string, unknown>,
  ): APIGatewayProxyStructuredResultV2 {
    const response: APIGatewayProxyStructuredResultV2 = {
      statusCode: statusCode,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOW_ORIGIN || "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return response;
  },

  _200(data: unknown = {}): APIGatewayProxyStructuredResultV2 {
    return this._DefineResponse(200, data);
  },

  _400(message: string): APIGatewayProxyStructuredResultV2 {
    return this._DefineResponse(400, { message });
  },

  _404(message: string): APIGatewayProxyStructuredResultV2 {
    return this._DefineResponse(404, { message });
  },

  _409(message: string): APIGatewayProxyStructuredResultV2 {
    return this._DefineResponse(409, { message });
  },

  _500(message: string): APIGatewayProxyStructuredResultV2 {
    return this._DefineResponse(500, { message });
  },
};
