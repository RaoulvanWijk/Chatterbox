CREATE TABLE `users` (
	`id` varchar(255) NOT NULL,
	`username` varchar(255),
	`tag` smallint,
	`password` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
