import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    userId: integer('user_id').notNull().default(1),
});

export const goals = sqliteTable('goals', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    description: text('description').notNull(),
    startDate: text('start_date').notNull(),
    endDate: text('end_date').notNull(),
    targetCount: integer('target_count').notNull().default(1),
    categoryId: integer('category_id').notNull().default(1),
    userId: integer('user_id').notNull().default(1),
});