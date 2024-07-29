ALTER TABLE `summarize-it_recipe` MODIFY COLUMN `name` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `summarize-it_recipe` ADD `created_by` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `summarize-it_user` ADD `role` varchar(255) DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE `summarize-it_recipe` ADD CONSTRAINT `summarize-it_recipe_created_by_summarize-it_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `summarize-it_user`(`id`) ON DELETE no action ON UPDATE no action;