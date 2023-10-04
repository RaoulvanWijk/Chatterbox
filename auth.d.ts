// import Default user interface from next-auth
import { DefaultUser, Session, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface DefaultUser {
    id: number; // Or string
    username: string;
    email: string;
    password: string;
    image: string;
  } 

  interface User {
    id: number; // Or string
    username: string;
    email: string;
    password: string;
    image: string;
  }

  interface AdapterUser extends DefaultUser {}


  interface DefaultSession {
    user: {
      id: number;
      username: string;
      email: string;
      password: string;
      image: string;
    };
  }

  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      password: string;
      image: string;
    };
  }
}

