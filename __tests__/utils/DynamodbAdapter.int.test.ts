import DynamodbAdapter from "@utils/DynamodbAdapter";

describe("DynamoDB Adapter", () => {
  it("should query by field", async () => {
    // GIVEN
    const db = new DynamodbAdapter();

    // WHEN
    const results = await db.queryByField(
      process.env.tableName,
      "PK",
      "fake-fake-fake",
    );

    // THEN
    expect(results).toEqual([]);
  });

  it("should create & delete item", async () => {
    // GIVEN
    const db = new DynamodbAdapter();

    const paramsCreate = {
      PK: "SampleId",
      Type: "SampleId",
    };

    const paramsDelete = {
      PK: "SampleId",
    };

    // WHEN
    const createResult = await db.create(process.env.tableName, paramsCreate);
    await db.delete(process.env.tableName, paramsDelete);

    const check = await db.queryByField(
      process.env.tableName,
      "PK",
      "SampleId",
    );

    // THEN
    expect(createResult).toEqual(paramsCreate);
    expect(check.length).toBe(0);
  });

  it("should get item", async () => {
    // GIVEN
    const db = new DynamodbAdapter();

    const paramsCreate = {
      PK: "SampleId",
      Type: "SampleId",
    };

    const paramsDelete = {
      PK: "SampleId",
    };

    const paramsGet = { PK: "SampleId" };

    // WHEN
    const createResult = await db.create(process.env.tableName, paramsCreate);
    const getResult = await db.get(process.env.tableName, paramsGet);
    await db.delete(process.env.tableName, paramsDelete);
    const check = await db.queryByField(
      process.env.tableName,
      "PK",
      "SampleId",
    );

    // THEN
    expect(createResult).toEqual(paramsCreate);
    expect(getResult).toEqual(paramsCreate);
    expect(check.length).toBe(0);
  });
});
