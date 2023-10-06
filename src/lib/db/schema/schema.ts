import {
	int,
	timestamp,
	mysqlTable,
	primaryKey,
	varchar,
	smallint
} from "drizzle-orm/mysql-core"

export const users = mysqlTable("users", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	username: varchar("username", { length: 255 }),
	tag: smallint("tag"),
	password: varchar("password", { length: 255 }),
	email: varchar("email", { length: 255 }).unique().notNull(),
	emailVerified: timestamp("emailVerified", {
		mode: "date",
		fsp: 3
	}).defaultNow(),
})
