import { Wishlist } from "@/types/type";
import ProductCard from "@/components/ProductCard";
import { cookies } from "next/headers";
import WishlistCard from "@/components/WishlistCard";

const fetchWishlist = async () => {
  "use server";
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed fetch products");
  }

  const { data } = await response.json();

  return data;
};

const Page = async () => {
  const data = await fetchWishlist();
  // console.log(data, "<<<< data di wishlist page");
  return (
    <section className="w-full h-full p-1">
      <div className="flex flex-wrap gap-2">
        {data?.map((product: Wishlist, idx: number) => {
          return <WishlistCard product={product.wishlist} key={idx} />;
        })}
      </div>
    </section>
  );
};

export default Page;
