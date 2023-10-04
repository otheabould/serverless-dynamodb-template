import { DocumentClient } from "aws-sdk/clients/dynamodb";

export default class DynamodbAdapter {
  documentClient: DocumentClient;
  tableName: string;

  constructor(region: string, tableName: string) {
    this.tableName = tableName;
    this.documentClient = new DocumentClient({
      region: region,
    });
  }

  async queryByField<T>(
    field: string,
    value: DocumentClient.AttributeValue,
  ): Promise<T[]> {
    const params = {
      TableName: this.tableName,
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
    IndexName: string,
    field: string,
    value: DocumentClient.AttributeValue,
  ): Promise<T[]> {
    const params = {
      TableName: this.tableName,
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
    KeyConditionExpression: string,
    ExpressionAttributeNames: Record<string, string>,
    ExpressionAttributeValues: Record<string, DocumentClient.AttributeValue>,
  ): Promise<T[]> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    };

    const { Items } = await this.documentClient.query(params).promise();
    return Items as T[];
  }

  async get<T>(Key: Record<string, DocumentClient.AttributeValue>) {
    const params = {
      TableName: this.tableName,
      Key,
    };

    const { Item } = await this.documentClient.get(params).promise();
    return Item as T;
  }

  async create<T>(Item: T): Promise<T> {
    const params = {
      TableName: this.tableName,
      Item,
      ReturnConsumedCapacity: "TOTAL",
    };

    await this.documentClient.put(params).promise();
    return Item;
  }

  async delete(
    Key: Record<string, DocumentClient.AttributeValue>,
  ): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key,
    };

    await this.documentClient.delete(params).promise();
  }

  async update<T>(
    Key: Record<string, DocumentClient.AttributeValue>,
    updateVals: Record<string, DocumentClient.AttributeValue>,
  ): Promise<T> {
    const {
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    } = this._generateUpdateExpression(updateVals);

    const params: DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key,
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const { Attributes } = await this.documentClient.update(params).promise();
    return Attributes as T;
  }

  _generateUpdateExpression(
    updateVals: Record<string, DocumentClient.AttributeValue>,
  ): {
    UpdateExpression: string;
    ExpressionAttributeNames: Record<string, string>;
    ExpressionAttributeValues: Record<string, DocumentClient.AttributeValue>;
  } {
    let expression = "SET ";
    const attributeNames: Record<string, string> = {};
    const attibuteValues: Record<string, DocumentClient.AttributeValue> = {};

    for (const [key, value] of Object.entries(updateVals)) {
      expression += ` #${key} = :${key},`;
      attributeNames[`#${key}`] = key;
      attibuteValues[`:${key}`] = value;
    }

    // remove the trailing comma
    expression = expression.slice(0, expression.length - 1);

    return {
      UpdateExpression: expression,
      ExpressionAttributeNames: attributeNames,
      ExpressionAttributeValues: attibuteValues,
    };
  }
}
