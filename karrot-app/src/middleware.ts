import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/jose";

export const middleware = async (request: NextRequest) => {
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
    console.log(request.method, request.url);
  }

  if (request.url.includes("/api/wishlist")) {
    console.log("API", request.method, request.url);
    const cookiesStore = cookies();
    const karrot_token = cookiesStore.get("karrot-token");
    console.log(
      karrot_token,
      "token di middleware <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    );
    if (!karrot_token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unanthorized",
      });
    }
    const tokenData = (await verifyToken(karrot_token.value)) as {
      id: string;
      name: string;
      username: string;
      email: string;
    };

    console.log(tokenData);

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("karrot-user-id", tokenData.id);
    requestHeaders.set("karrot-user-name", tokenData.name);
    requestHeaders.set("karrot-user-username", tokenData.username);
    requestHeaders.set("karrot-user-email", tokenData.email);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};
