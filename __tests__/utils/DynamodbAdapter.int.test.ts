import DynamodbAdapter from "@utils/DynamodbAdapter";

const region = process.env.region;
const tableName = process.env.tableName;

describe("DynamoDB Adapter", () => {
  it("should query by field", async () => {
    // GIVEN
    const db = new DynamodbAdapter(region, tableName);

    // WHEN
    const results = await db.queryByField("id", "fake-fake-fake");

    // THEN
    expect(results).toEqual([]);
  });

  it("should create & delete item", async () => {
    // GIVEN
    const db = new DynamodbAdapter(region, tableName);

    const paramsCreate = {
      id: "SampleId",
      Type: "SampleId",
    };

    const paramsDelete = {
      id: "SampleId",
    };

    // WHEN
    const createResult = await db.create(paramsCreate);
    await db.delete(paramsDelete);

    const check = await db.queryByField("id", "SampleId");

    // THEN
    expect(createResult).toEqual(paramsCreate);
    expect(check.length).toBe(0);
  });

  it("should get an item", async () => {
    // GIVEN
    const db = new DynamodbAdapter(region, tableName);

    const paramsCreate = {
      id: "SampleId",
      Type: "SampleId",
    };

    const paramsDelete = {
      id: "SampleId",
    };

    const paramsGet = { id: "SampleId" };

    // WHEN
    const createResult = await db.create(paramsCreate);
    const getResult = await db.get(paramsGet);
    await db.delete(paramsDelete);
    const check = await db.queryByField("id", "SampleId");

    // THEN
    expect(createResult).toEqual(paramsCreate);
    expect(getResult).toEqual(paramsCreate);
    expect(check.length).toBe(0);
  });
});
