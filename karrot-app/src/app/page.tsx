import Image from "next/image";
import Link from "../../node_modules/next/link";
import { Product } from "@/types/type";
import { rupiahFormat } from "@/utils/rupiahFornat";

const fetchProducts = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/api/products`
  );

  const { data }: { data: Product[] } = await response.json();
  return data;
};

export default async function Home() {
  const products = await fetchProducts();
  // console.log(products);
  let i = 0;
  return (
    <section className="w-full h-full p-1 flex flex-col gap-1">
      <div className="border-b-2 mb-3 pb-2">
        <img
          src="https://img.freepik.com/premium-photo/lodz-poland-april-15-2023-sun-major-arcana-tarot-cards-deck-background-taro-divination-banner-with-copy-space-text_361816-8132.jpg"
          className="w-screen h-[350px]"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {products?.map((product, idx) => {
          if (i < 4) {
            i++;
            return (
              <Link href={"/products/" + product.slug}>
                <div
                  className="w-[18rem] border flex flex-col items-center text-xl gap-1 p-1 hover:opacity-80 transition duration-200"
                  key={idx}
                >
                  <img src={product.images[0]} className="h-[60%]" alt="" />
                  <p>{product.name}</p>
                  <p className="text-slate-500">
                    {rupiahFormat(product?.price)}
                  </p>
                  <p className="text-justify text-lg">Rp. {product.excerpt}</p>
                </div>
              </Link>
            );
          }
        })}
      </div>
      <button className="text-2xl p-2 m-2 self-center text-gray-800 hover:text-gray-500">
        <Link href="/products">See All</Link>
      </button>
    </section>
  );
}
