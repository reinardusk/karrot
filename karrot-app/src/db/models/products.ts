import { Product } from "@/types/type";
import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_PRODUCT = "products";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getProducts = async () => {
  const db = await getDb();
  const products = (await db
    .collection(COLLECTION_PRODUCT)
    .find()
    .toArray()) as Product[];

  return products;
};

export const getProductBySlug = async (slug: string) => {
  const db = await getDb();
  const product = await db.collection(COLLECTION_PRODUCT).findOne({ slug });

  if (!product) throw new Error("Product not found");

  return product;
};

export const getProductsByName = async (name: string) => {
  const db = await getDb();
  const products = await db
    .collection(COLLECTION_PRODUCT)
    .find({
      name: {
        $regex: name,
        $options: "i",
      },
    })
    .toArray();

  return products;
};
