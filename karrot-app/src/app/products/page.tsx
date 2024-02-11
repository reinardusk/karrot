"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/type";
import ProductCard from "@/components/ProductCard";
import SearchForm from "@/components/SearchForm";
import { useSearchParams } from "next/navigation";
import ClientErrorFlash from "@/components/ClientErrorFlash";

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/products?search=${search}`
    );

    if (!response.ok) {
      throw new Error("Failed fetch products");
    }

    const { data } = await response.json();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="w-full h-full p-1">
      <SearchForm />
      <ClientErrorFlash />
      <div className="flex flex-wrap gap-2">
        {products?.map((product: Product, idx: number) => {
          return <ProductCard product={product} key={idx} />;
        })}
      </div>
    </section>
  );
};

export default Page;
