import { Wishlist } from "@/types/type";
import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { NextRequest } from "next/server";

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_WISHLIST = "wishlist";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const addWishlist = async (
  { productId }: { productId: string },
  userId: string
) => {
  try {
    const db = await getDb();

    // const checkWishlist = await db.collection(COLLECTION_WISHLIST).findOne({
    //   productId,
    // });

    // if (checkWishlist) {
    //   return "This product is listed in wishlist already!";
    // }

    const addWishlist = await db.collection(COLLECTION_WISHLIST).insertOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const addedWislist = await db.collection(COLLECTION_WISHLIST).findOne({
      _id: addWishlist.insertedId,
    });

    return addedWislist;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWishlist = async (
  { productId }: { productId: string },
  userId: string
) => {
  const db = await getDb();
  const deleteWishlist = await db.collection(COLLECTION_WISHLIST).deleteOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
  });
};

export const getWishlist = async (userId: string) => {
  const db = await getDb();
  const agg = [
    {
      $match: {
        userId: new ObjectId(userId),
      },
    },
    {
      $lookup: {
        as: "wishlist",
        from: "products",
        foreignField: "_id",
        localField: "productId",
      },
    },
    {
      $unwind: { path: "$wishlist" },
    },
  ];

  const coll = db.collection(COLLECTION_WISHLIST);
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();

  return result as Wishlist[];
};
