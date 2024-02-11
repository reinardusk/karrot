import { ObjectId } from "mongodb";

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export type Product = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type Wishlist = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
  wishlist: Product;
};

export type inputWishlist = {
  userId: ObjectId;
  productId: ObjectId;
};
