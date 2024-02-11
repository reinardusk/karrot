import * as jose from "jose";
import { ObjectId } from "mongodb";

type PayloadType = {
  id: ObjectId;
  name: string;
  username: string;
  email: string;
};

export const createToken = async (payload: jose.JWTPayload) => {
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
  const alg = "HS256";

  const jwToken = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .sign(secret);

  return jwToken;
};

export const verifyToken = async <T>(token: string) => {
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);

  const payloadJose = await jose.jwtVerify<T>(token, secret);

  return payloadJose.payload;
};
