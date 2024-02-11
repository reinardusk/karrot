import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <section>
      <Link href="/">
        <h1 className="text-4xl text-black font-semibold mb-4 text-center hover:text-gray-400">
          KAR<span className="text-orange-500 hover:text-orange-300">-ROT</span>{" "}
          SHOP
        </h1>
      </Link>
      {/* Sidebar */}
      <ul className="justify-center flex flex-col gap-10">
        <div className="gap-14">
          <li className="border-b-2 w-[180px]">
            <Link
              className="text-gray-800 hover:text-gray-400 underline-offset-4 transition-colors duration-300 text-xl"
              href="/products"
            >
              Products
            </Link>
          </li>
          <li className="border-b-2 w-[180px]">
            <Link
              className="text-gray-800 hover:text-gray-400 underline-offset-4 transition-colors duration-300 text-xl"
              href="/wishlist"
            >
              Wishlist
            </Link>
          </li>
        </div>
      </ul>
    </section>
  );
};

export default DashboardSidebar;
