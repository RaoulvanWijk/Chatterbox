import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "@/lib/env.mjs";
import drizzleConfig from "../../../drizzle.config";
 
const poolConnection = mysql.createPool(drizzleConfig.dbCredentials);
 
export const db = drizzle(poolConnection);
