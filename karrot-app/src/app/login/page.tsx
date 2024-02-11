import ClientErrorFlash from "@/components/ClientErrorFlash";
import Link from "../../../node_modules/next/link";
import { handleLogin } from "./action";

const Page = () => {
  return (
    <>
      <div className="h-screen w-full flex items-center">
        <div className="h-[50%] w-[50%] rounded-lg">
          <h1 className="pt-5 pl-2 text-2xl font-medium">Login</h1>
          <ClientErrorFlash />
          <form
            className="p-2 flex flex-col h-full w-full gap-2"
            action={handleLogin}
          >
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="bg-gray-200 w-[300px] py-2 px-3 rounded-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-gray-200 w-[300px] py-2 px-3 rounded-sm"
            />
            <button className="bg-gray-700 w-[300px] py-2 px-3 rounded-sm text-white text-xl hover:bg-gray-700/90 transition-colors duration-150">
              SIGN IN
            </button>
            <Link href="/register">
              <h1 className="text-xl text-gray-800 hover:text-gray-500 mt-5">
                Sign Up
              </h1>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
