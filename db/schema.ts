import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const goals = sqliteTable('goals', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    description: text('description').notNull(),
    deadline: text('deadline').notNull(),
    count: integer('count').notNull().default(0),
});