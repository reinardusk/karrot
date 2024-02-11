import { Db, ObjectId } from "../../../node_modules/mongodb/mongodb";
import { getMongoClientInstance } from "../config";
import { hashPassword } from "@/utils/bcrypt";
export type UserModel = {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
};

export type UserModelCreateInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_USER = "users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  const users = (await db
    .collection(COLLECTION_USER)
    .find(
      {},
      {
        projection: {
          password: 0,
        },
      }
    )
    .toArray()) as UserModel[];

  return users;
};

export const createUser = async (inputUser: UserModelCreateInput) => {
  const modifiedUser: UserModelCreateInput = {
    ...inputUser,
    password: hashPassword(inputUser.password),
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

  const createdUser = await db.collection(COLLECTION_USER).findOne(
    { _id: result.insertedId },
    {
      projection: { password: 0 },
    }
  );

  return createdUser;
};

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email })) as UserModel;

  return user;
};
