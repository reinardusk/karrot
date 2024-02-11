import { getProductBySlug } from "@/db/models/products";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const product = await getProductBySlug(params.slug);

  return Response.json(
    {
      statusCode: 200,
      data: product,
    },
    {
      status: 200,
    }
  );
};
