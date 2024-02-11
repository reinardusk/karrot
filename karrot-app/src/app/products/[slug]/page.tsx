import WishlistButton from "@/components/WishlistButton";
import { Product } from "@/types/type";
import { rupiahFormat } from "@/utils/rupiahFornat";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const fetchProduct = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${params.slug}`
    );

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const { data }: { data: Product } = await response.json();

    // console.log(data);

    return data;
  };

  const product = await fetchProduct();

  return {
    title: product.name,
    excerpt: product.excerpt,
    description: product.description,
    price: product.price,
    tags: product.tags,
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const fetchProduct = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${params.slug}`
    );

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const { data }: { data: Product } = await response.json();

    // console.log(data);

    return data;
  };

  const product = await fetchProduct();

  return (
    <>
      <div className="min-h-screen p-2">
        <div className="flex p-2">
          <img
            src={product?.images[0]}
            className="w-[500px] h-[600px] border border-gray-100"
          />
          <div className="flex flex-col gap-5 p-2">
            <h1 className="text-6xl mb-10">{product?.name}</h1>
            <p className="text-2xl">{product.excerpt}</p>
            <p className="text-xl">Tags: #{product.tags?.join(" #")}</p>
            <h1 className="text-6xl">{rupiahFormat(product?.price)}</h1>
            <WishlistButton productId={product?._id} />
          </div>
        </div>
        <h1 className="text-2xl p-2">Description :</h1>
        <p className="text-xl text-justify p-2">{product.description}</p>
      </div>
    </>
  );
};
export default Page;
