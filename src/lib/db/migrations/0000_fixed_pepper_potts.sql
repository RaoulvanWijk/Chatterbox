-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int(11),
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `computers` (
	`id` bigint(20) unsigned AUTO_INCREMENT NOT NULL,
	`brand` varchar(256) NOT NULL,
	`cores` int(11) NOT NULL,
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`emailVerified` timestamp(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`email` varchar(255) NOT NULL,
	`image` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `verificationtoken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL
);
--> statement-breakpoint
CREATE INDEX `account_userId_user_id_fk` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `session_userId_user_id_fk` ON `session` (`userId`);
*/