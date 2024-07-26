CREATE TABLE `summarize-it_account` (
	`user_id` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `summarize-it_account_provider_provider_account_id_pk` PRIMARY KEY(`provider`,`provider_account_id`)
);
--> statement-breakpoint
CREATE TABLE `summarize-it_post` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`created_by` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `summarize-it_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `summarize-it_recipe` (
	`id` varchar(255) NOT NULL,
	`name` varchar(256),
	`url` varchar(256),
	`recipe` text,
	`summary` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `summarize-it_recipe_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `summarize-it_session` (
	`session_token` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `summarize-it_session_session_token` PRIMARY KEY(`session_token`)
);
--> statement-breakpoint
CREATE TABLE `summarize-it_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `summarize-it_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `summarize-it_verification_token` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `summarize-it_verification_token_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `summarize-it_account` ADD CONSTRAINT `summarize-it_account_user_id_summarize-it_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `summarize-it_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `summarize-it_post` ADD CONSTRAINT `summarize-it_post_created_by_summarize-it_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `summarize-it_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `summarize-it_session` ADD CONSTRAINT `summarize-it_session_user_id_summarize-it_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `summarize-it_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `summarize-it_account` (`user_id`);--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `summarize-it_post` (`created_by`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `summarize-it_post` (`name`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `summarize-it_session` (`user_id`);