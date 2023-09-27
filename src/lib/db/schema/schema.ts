import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, varchar, int, unique, timestamp, bigint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const account = mysqlTable("account", {
	userId: varchar("userId", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 255 }),
	accessToken: varchar("access_token", { length: 255 }),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: varchar("id_token", { length: 255 }),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => {
	return {
		userIdUserIdFk: index("account_userId_user_id_fk").on(table.userId),
	}
});

export const computers = mysqlTable("computers", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	brand: varchar("brand", { length: 256 }).notNull(),
	cores: int("cores").notNull(),
},
(table) => {
	return {
		id: unique("id").on(table.id),
	}
});

export const session = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		userIdUserIdFk: index("session_userId_user_id_fk").on(table.userId),
	}
});

export const user = mysqlTable("user", {
	id: varchar("id", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }),
	emailVerified: timestamp("emailVerified", { fsp: 3, mode: 'string' }).default('CURRENT_TIMESTAMP(3)').notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	image: varchar("image", { length: 255 }),
});

export const verificationtoken = mysqlTable("verificationtoken", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});