CREATE TABLE `channel_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`channel_id` int,
	`message_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `channel_messages_id` PRIMARY KEY(`id`)
);

CREATE TABLE `channels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`server_id` int,
	`channel_name` varchar(30),
	`type` enum('text','voice'),
	`order` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `channels_id` PRIMARY KEY(`id`)
);

CREATE TABLE `message` (
	`id` int AUTO_INCREMENT NOT NULL,
	`from_user_id` int,
	`message` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `message_id` PRIMARY KEY(`id`)
);

CREATE TABLE `servers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`server_name` varchar(30) NOT NULL,
	`server_icon` varchar(255),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `servers_id` PRIMARY KEY(`id`)
);

CREATE TABLE `user_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`message_id` int,
	`to_user_id` int,
	`has_seen` tinyint,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `user_messages_id` PRIMARY KEY(`id`)
);

CREATE TABLE `user_profile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`users_id` int,
	`profile_picture` varchar(255),
	`banner` varchar(255),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `user_profile_id` PRIMARY KEY(`id`)
);

CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255),
	`tag` smallint,
	`password` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);

CREATE TABLE `users_friends` (
	`id` int AUTO_INCREMENT NOT NULL,
	`from_friend_id` int,
	`to_friend_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `users_friends_id` PRIMARY KEY(`id`)
);

CREATE TABLE `users_friends_status` (
	`id` int AUTO_INCREMENT NOT NULL,
	`users_friends_id` int,
	`status` enum('accepted','pending','blocked','muted'),
	CONSTRAINT `users_friends_status_id` PRIMARY KEY(`id`)
);

CREATE TABLE `users_servers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`server_id` int,
	`role` enum('owner','moderator','normal'),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `users_servers_id` PRIMARY KEY(`id`)
);

CREATE INDEX `channel_id` ON `channel_messages` (`channel_id`);
CREATE INDEX `message_id` ON `channel_messages` (`message_id`);
CREATE INDEX `server_id` ON `channels` (`server_id`);
CREATE INDEX `from_user_id` ON `message` (`from_user_id`);
CREATE INDEX `message_id` ON `user_messages` (`message_id`);
CREATE INDEX `to_user_id` ON `user_messages` (`to_user_id`);
CREATE INDEX `users_id` ON `user_profile` (`users_id`);
CREATE INDEX `from_friend_id` ON `users_friends` (`from_friend_id`);
CREATE INDEX `to_friend_id` ON `users_friends` (`to_friend_id`);
CREATE INDEX `users_friends_id` ON `users_friends_status` (`users_friends_id`);
CREATE INDEX `user_id` ON `users_servers` (`user_id`);
CREATE INDEX `server_id` ON `users_servers` (`server_id`);
ALTER TABLE `channel_messages` ADD CONSTRAINT `channel_messages_channel_id_channels_id_fk` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `channel_messages` ADD CONSTRAINT `channel_messages_message_id_message_id_fk` FOREIGN KEY (`message_id`) REFERENCES `message`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `channels` ADD CONSTRAINT `channels_server_id_servers_id_fk` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `message` ADD CONSTRAINT `message_from_user_id_users_id_fk` FOREIGN KEY (`from_user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `user_messages` ADD CONSTRAINT `user_messages_message_id_message_id_fk` FOREIGN KEY (`message_id`) REFERENCES `message`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `user_messages` ADD CONSTRAINT `user_messages_to_user_id_users_id_fk` FOREIGN KEY (`to_user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `user_profile` ADD CONSTRAINT `user_profile_users_id_users_id_fk` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `users_friends` ADD CONSTRAINT `users_friends_from_friend_id_users_id_fk` FOREIGN KEY (`from_friend_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `users_friends` ADD CONSTRAINT `users_friends_to_friend_id_users_id_fk` FOREIGN KEY (`to_friend_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `users_friends_status` ADD CONSTRAINT `users_friends_status_users_friends_id_users_friends_id_fk` FOREIGN KEY (`users_friends_id`) REFERENCES `users_friends`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `users_servers` ADD CONSTRAINT `users_servers_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `users_servers` ADD CONSTRAINT `users_servers_server_id_servers_id_fk` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE no action ON UPDATE no action;