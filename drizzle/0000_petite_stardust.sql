CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`user_id` integer DEFAULT 1 NOT NULL
);

CREATE TABLE `goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`target_count` integer DEFAULT 1 NOT NULL,
	`category_id` integer DEFAULT 1 NOT NULL,
	`user_id` integer DEFAULT 1 NOT NULL
);
