"use client";

import handleAddWishlist, { handleDeleteWishlist } from "@/app/wishlist/action";
import { Product } from "@/types/type";
import { rupiahFormat } from "@/utils/rupiahFornat";
import Link from "next/link";
import { IoCloseCircleSharp } from "react-icons/io5";

const WishlistCard = ({ product }: { product: Product }) => {
  return (
    <div className="w-[18rem] border flex flex-col items-center text-lg gap-1 p-1 ">
      <Link
        href={`/products/${product.slug}`}
        className="h-[60%] hover:opacity-80 transition duration-200"
      >
        <img src={product.images[1]} className="h-[100%]" alt="" />
      </Link>
      <Link
        href={`/products/${product.slug}`}
        className="hover:opacity-80 transition duration-200"
      >
        {product.name}
      </Link>
      <p className="text-slate-500">{rupiahFormat(product?.price)}</p>
      <p>{product.excerpt}</p>
      <p>#{product.tags?.join(" #")}</p>
      <IoCloseCircleSharp
        size={30}
        className="hover:text-red-700 cursor-pointer"
        onClick={() => handleDeleteWishlist(product._id)}
      />
    </div>
  );
};

export default WishlistCard;
