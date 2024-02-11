"use server";

import { MyResponse } from "@/types/type";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const handleAddWishlist = async (productId: ObjectId) => {
  const cekCookies = cookies().toString();
  console.log(
    cekCookies,
    "<<<<<<<<< cookies stringify di handlewishlist acition"
  );
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist`,
    {
      method: "POST",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  const responseJson: MyResponse<unknown> = await response.json();

  if (!response.ok) {
    let message = responseJson.message;

    return redirect(`/products?error=${message}`);
  }

  revalidatePath("/wishlist");
  return redirect("/wishlist");
};

export const handleDeleteWishlist = async (productId: ObjectId) => {
  const cekCookies = cookies().toString();
  console.log(
    cekCookies,
    "<<<<<<<<< cookies stringify di handlewishlist acition"
  );
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist`,
    {
      method: "DELETE",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );

  revalidatePath("/wishlist");
};

export default handleAddWishlist;
