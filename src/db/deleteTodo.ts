import DynamodbAdapter from "@utils/DynamodbAdapter";

const deleteTodo = async (db: DynamodbAdapter, id: string) => {
  await db.delete({ id });
};

export default deleteTodo;
