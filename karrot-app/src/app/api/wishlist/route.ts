import { addWishlist, deleteWishlist, getWishlist } from "@/db/models/wishlist";
import { MyResponse } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const userId: any = request.headers.get("karrot-user-id");

    // console.log(userId, "<<<< user id di api wishlist route");

    const inputData = await request.json();

    const listData = await getWishlist(userId);

    listData.forEach((el) => {
      if (el.productId == inputData.productId) {
        console.log("masuk ke validasi di wishlist route");
        throw new Error("Product is listed in wishlist already!");
      }
    });

    const wishlist = await addWishlist(inputData, userId);

    // if (wishlist === "This product is listed in wishlist already!") {
    //   throw new Error("This product is listed in wishlist already!");
    // }

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Success add this product to wishlist",
        data: wishlist,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json<MyResponse<unknown>>(
        {
          statusCode: 404,
          message: error.message,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const userId: any = request.headers.get("karrot-user-id");

    console.log(userId, "<<<< user id di api wishlist route");

    const inputData = await request.json();

    const wishlist = await deleteWishlist(inputData, userId);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        message: "Success delete this product from wishlist",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (request: NextRequest) => {
  const userId: any = request.headers.get("karrot-user-id");
  const wishlist = await getWishlist(userId);

  return Response.json(
    {
      statusCode: 200,
      data: wishlist,
    },
    {
      status: 200,
    }
  );
};
