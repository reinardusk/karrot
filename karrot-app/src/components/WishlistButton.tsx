"use client";

import handleAddWishlist from "@/app/wishlist/action";
import { ObjectId } from "mongodb";

const WishlistButton = ({ productId }: { productId: ObjectId }) => {
  return (
    <button
      onClick={() => handleAddWishlist(productId)}
      className="text-3xl border border-gray-500 rounded-lg w-auto p-1 bg-gray-800 hover:bg-gray-500 text-white pt-2"
    >
      ADD TO WISHLIST
    </button>
  );
};

export default WishlistButton;
