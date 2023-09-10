import { DocumentClient } from "aws-sdk/clients/dynamodb";
import logger from "@utils/logger";

const log = logger(__filename);

export default class DynamodbAdapter {
  documentClient: DocumentClient;

  constructor() {
    this.documentClient = new DocumentClient({
      region: process.env.region,
    });
  }

  async queryByField<T>(
    TableName: string,
    field: string,
    value: DocumentClient.AttributeValue,
  ): Promise<T[]> {
    const params = {
      TableName,
      KeyConditionExpression: "#field = :value",
      ExpressionAttributeNames: {
        "#field": field,
      },
      ExpressionAttributeValues: {
        ":value": value,
      },
    };

    const { Items } = await this.documentClient.query(params).promise();
    return Items as T[];
  }

  async queryIndexByField<T>(
    TableName: string,
    IndexName: string,
    field: string,
    value: DocumentClient.AttributeValue,
  ): Promise<T[]> {
    const params = {
      TableName,
      IndexName,
      KeyConditionExpression: "#field = :value",
      ExpressionAttributeNames: {
        "#field": field,
      },
      ExpressionAttributeValues: {
        ":value": value,
      },
    };

    const { Items } = await this.documentClient.query(params).promise();
    return Items as T[];
  }

  async query<T>(
    TableName: string,
    KeyConditionExpression: string,
    ExpressionAttributeNames: Record<string, string>,
    ExpressionAttributeValues: Record<string, DocumentClient.AttributeValue>,
  ): Promise<T[]> {
    const params = {
      TableName,
      KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    };

    const { Items } = await this.documentClient.query(params).promise();
    return Items as T[];
  }

  async get<T>(
    TableName: string,
    Key: Record<string, DocumentClient.AttributeValue>,
  ) {
    const params = {
      TableName,
      Key,
    };

    const { Item } = await this.documentClient.get(params).promise();
    return Item as T;
  }

  async create<T>(tableName: string, Item: T): Promise<T> {
    const params = {
      Item,
      ReturnConsumedCapacity: "TOTAL",
      TableName: tableName,
    };

    await this.documentClient.put(params).promise();
    return Item;
  }

  async delete(
    tableName: string,
    Key: Record<string, DocumentClient.AttributeValue>,
  ): Promise<void> {
    const params = {
      TableName: tableName,
      Key,
    };

    await this.documentClient.delete(params).promise();
  }

  async update(
    TableName: string,
    Key: Record<string, DocumentClient.AttributeValue>,
    UpdateExpression: string,
    ExpressionAttributeNames: Record<string, string>,
    ExpressionAttributeValues: Record<string, DocumentClient.AttributeValue>,
  ): Promise<void> {
    const params = {
      TableName,
      Key,
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    };

    await this.documentClient.update(params).promise();
  }

  async transactWrite(params: DocumentClient.TransactWriteItemsInput) {
    return executeTransactWrite({ client: this.documentClient, params });
  }
}

// Thanks Alex DeBrie and his DynamoDB Book for this code below
// Alex: Thanks, Paul Swail! https://github.com/aws/aws-sdk-js/issues/2464#issuecomment-503524701
const executeTransactWrite = async ({
  client,
  params,
}: {
  client: DocumentClient;
  params: DocumentClient.TransactWriteItemsInput;
}): Promise<DocumentClient.TransactWriteItemsOutput> => {
  const transactionRequest = client.transactWrite(params);
  let cancellationReasons;

  transactionRequest.on("extractError", (response) => {
    try {
      cancellationReasons = JSON.parse(
        response.httpResponse.body.toString(),
      ).CancellationReasons;
    } catch (err) {
      // suppress this just in case some types of errors aren't JSON parseable
      log("Error extracting cancellation error", err);
    }
  });

  return new Promise((resolve, reject) => {
    transactionRequest.send((err, response) => {
      if (err) {
        return reject({ ...err, cancellationReasons });
      }
      return resolve(response);
    });
  });
};
