CREATE TABLE `goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`deadline` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL
);
