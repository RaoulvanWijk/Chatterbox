CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`username` varchar(255),
	`tag` tinyint,
	`password` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
