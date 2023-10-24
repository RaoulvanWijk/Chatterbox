import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import config from "../../../drizzle.config";

const connection = await mysql.createConnection(config.dbCredentials);

export const db = drizzle(connection);