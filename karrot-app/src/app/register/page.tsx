import { redirect } from "next/navigation";
import Link from "../../../node_modules/next/link";
import ClientErrorFlash from "@/components/ClientErrorFlash";

const Page = () => {
  async function handleRegister(formData: FormData) {
    "use server";

    type MyResponse<T> = {
      statusCode: number;
      message?: string;
      data?: T;
      error?: string;
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/users",
      {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response.ok, "<<<,response ok");

    const responseJson: MyResponse<unknown> = await response.json();

    if (!response.ok) {
      let message = responseJson.error ?? "Something went wrong!";

      return redirect(`/register?error=${message}`);
    }

    return redirect("/login");
  }

  return (
    <>
      <div className="h-screen w-full flex items-center">
        <div className="w-[50%] rounded-lg">
          <h1 className="pt-5 pl-2 text-2xl font-medium">Sign Up</h1>
          <ClientErrorFlash />
          <form
            className="p-2 flex flex-col h-full w-full gap-2"
            action={handleRegister}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="bg-gray-200 w-[300px] py-2 px-3 rounded-sm"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="bg-gray-200 w-[300px] py-2 px-3 rounded-sm"
            />
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
            <button
              type="submit"
              className="bg-gray-700 w-[300px] py-2 px-3 rounded-sm text-white text-xl"
            >
              SIGN UP
            </button>
            <Link href={"login"}>
              <h1 className="text-xl text-gray-800 hover:text-gray-500 mt-5">
                Sign In
              </h1>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
