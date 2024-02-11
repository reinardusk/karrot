import { cookies } from "next/headers";
import Link from "../../node_modules/next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const Navbar = async () => {
  const handleLogout = async () => {
    "use server";

    cookies().delete("karrot-token");
    revalidatePath("/");
    redirect("/login");
  };

  return (
    <>
      <div className="w-full h-[50px] bg-gray-100 flex flex-row items-center justify-between z-10 text-lg">
        <div className="px-5 font-bold">
          <Link href="/">KAR-ROT</Link>
        </div>
        <div className="flex flex-row gap-5 w-[50%]">
          <Link href="/login">
            <h1 className="text-gray-800 hover:text-gray-400 transition-colors duration-300">
              Log In
            </h1>
          </Link>
          <Link href="/register">
            <h1 className="text-gray-800 hover:text-gray-400 transition-colors duration-300">
              Sign Up
            </h1>
          </Link>
          {cookies().get("karrot-token") && (
            <form
              action={handleLogout}
              className="text-red-600 hover:text-red-400 transition-colors duration-300"
            >
              <button type="submit">Logout</button>
            </form>
          )}
        </div>
        <div className="px-5">
          <h1></h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;
