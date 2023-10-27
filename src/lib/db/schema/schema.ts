import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, int, timestamp, varchar, mysqlEnum, serial, text, tinyint, unique, smallint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const channelMessages = mysqlTable("channel_messages", {
	id: int("id").autoincrement().notNull(),
	channelId: int("channel_id").references(() => channels.id),
	messageId: int("message_id").references(() => message.id),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		channelId: index("channel_id").on(table.channelId),
		messageId: index("message_id").on(table.messageId),
		channelMessagesId: primaryKey(table.id),
	}
});

export const channels = mysqlTable("channels", {
	id: int("id").autoincrement().notNull(),
	serverId: int("server_id").references(() => servers.id),
	channelName: varchar("channel_name", { length: 30 }),
	type: mysqlEnum("type", ['text','voice']),
	order: int("order"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		serverId: index("server_id").on(table.serverId),
		channelsId: primaryKey(table.id),
	}
});

export const message = mysqlTable("message", {
	id: int("id").autoincrement().notNull(),
	fromUserId: int("from_user_id").references(() => users.id),
	message: text("message"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		fromUserId: index("from_user_id").on(table.fromUserId),
		messageId: primaryKey(table.id),
	}
});

export const servers = mysqlTable("servers", {
	id: int("id").autoincrement().notNull(),
	serverName: varchar("server_name", { length: 30 }).notNull(),
	serverIcon: varchar("server_icon", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		serversId: primaryKey(table.id),
	}
});

export const userMessages = mysqlTable("user_messages", {
	id: int("id").autoincrement().notNull(),
	messageId: int("message_id").references(() => message.id),
	toUserId: int("to_user_id").references(() => users.id),
	hasSeen: tinyint("has_seen"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		messageId: index("message_id").on(table.messageId),
		toUserId: index("to_user_id").on(table.toUserId),
		userMessagesId: primaryKey(table.id),
	}
});

export const userProfile = mysqlTable("user_profile", {
	id: int("id").autoincrement().notNull(),
	usersId: int("users_id").references(() => users.id),
	profilePicture: varchar("profile_picture", { length: 255 }),
	banner: varchar("banner", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		usersId: index("users_id").on(table.usersId),
		userProfileId: primaryKey(table.id),
	}
});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	username: varchar("username", { length: 255 }),
	tag: smallint("tag"),
	password: varchar("password", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { fsp: 3, mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		usersId: primaryKey(table.id),
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export const usersFriends = mysqlTable("users_friends", {
	id: int("id").autoincrement().notNull(),
	fromFriendId: int("from_friend_id").references(() => users.id),
	toFriendId: int("to_friend_id").references(() => users.id),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		fromFriendId: index("from_friend_id").on(table.fromFriendId),
		toFriendId: index("to_friend_id").on(table.toFriendId),
		usersFriendsId: primaryKey(table.id),
	}
});

export const usersFriendsStatus = mysqlTable("users_friends_status", {
	id: int("id").autoincrement().notNull(),
	usersFriendsId: int("users_friends_id").references(() => usersFriends.id),
	status: mysqlEnum("status", ['accepted','pending','blocked','muted']),
},
(table) => {
	return {
		usersFriendsId: index("users_friends_id").on(table.usersFriendsId),
		usersFriendsStatusId: primaryKey(table.id),
	}
});

export const usersServers = mysqlTable("users_servers", {
	id: int("id").autoincrement().notNull(),
	userId: int("user_id").references(() => users.id),
	serverId: int("server_id").references(() => servers.id),
	role: mysqlEnum("role", ['owner','moderator','normal']),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		userId: index("user_id").on(table.userId),
		serverId: index("server_id").on(table.serverId),
		usersServersId: primaryKey(table.id),
	}
});