import { boolean } from "drizzle-orm/mysql-core";
import { jwtVerify } from "jose";
import jsonwebtoken from 'jsonwebtoken';

export type UserJWT = {
  userId: number;
  username: string;
  userTag: number;
  iat: number;
  exp: number;
};

export type validatedJWT = {
  oldToken: {
    userId: number;
    username: string;
    userTag: number;
    iat: number;
    exp: number;
  },
  newToken?: string
};

export const validateJWT = async (token: string, newToken: boolean = false) : Promise<validatedJWT | undefined> => {
  try {
    const payload = (await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )).payload as UserJWT;
    const res = {oldToken: payload, newToken: ""};
    if(newToken) {
      const newToken = jsonwebtoken.sign({ userId: payload.userId, username: payload.username, userTag: payload.userTag }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
      res.newToken = newToken;
    }
    return res;
  } catch (err) {
    return undefined;
  }
};
