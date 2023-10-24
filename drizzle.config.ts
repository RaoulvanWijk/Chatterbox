import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: '.env.local'
});

export default {
  schema: "./src/lib/db/schema/schema.ts",
  out: "./src/lib/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DATABASE_HOST as string,
    port: 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME as string,
  }
} satisfies Config;