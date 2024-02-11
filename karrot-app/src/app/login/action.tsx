"use server";

import { getUserByEmail } from "@/db/models/users";
import { comparePassword } from "@/utils/bcrypt";
import { createToken } from "@/utils/jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const handleLogin = async (formData: FormData) => {
  const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  // console.log(email, password);

  const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = errPath + " - " + errMessage;

    return redirect(
      process.env.NEXT_PUBLIC_BASE_URL + `/login?error=${errFinalMessage}`
    );
  }

  const user = await getUserByEmail(parsedData.data.email);

  console.log(user);

  if (!user || !comparePassword(parsedData.data.password, user.password)) {
    return redirect(
      process.env.NEXT_PUBLIC_BASE_URL + `/login?error=Incorrect Email/Password`
    );
  }

  const payload = {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  };

  const token = await createToken(payload);
  console.log(token);

  cookies().set("karrot-token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: "strict",
  });

  return redirect("/");
};
