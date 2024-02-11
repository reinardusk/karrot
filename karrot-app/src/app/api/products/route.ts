import { getProducts, getProductsByName } from "@/db/models/products";
import { MyResponse, Product } from "@/types/type";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  console.log(url, "url di handle route");

  const search = url.searchParams.get("search");
  console.log(search, "search di handle route");

  let products;
  if (!search || search === "null") {
    products = await getProducts();
  } else {
    products = await getProductsByName(search);
  }

  return Response.json(
    {
      statusCode: 200,
      data: products,
    },
    {
      status: 200,
    }
  );
};
