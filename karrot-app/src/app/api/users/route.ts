"use server";

import { createUser } from "@/db/models/users";
import { MyResponse } from "@/types/type";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userInputSchema = z.object({
  name: z.string().optional(),
  username: z.string().min(1, { message: "can't be empty" }),
  email: z.string().email(),
  password: z.string().min(5),
});

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    const parsedData = userInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const user = await createUser(parsedData.data);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Successfully create user",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      // console.log(err);

      const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: errPath + " - " + errMessage,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};
