import { db } from './client';
import { categories, goals } from './schema';

export async function seedGoalsIfEmpty() {
    const existingCategories = await db.select().from(categories);

    if (existingCategories.length === 0) {
        await db.insert(categories).values([
            { name: 'Health', userId: 1 },
            { name: 'Learning', userId: 1 },
            { name: 'Career', userId: 1 },
        ]);
    }

    const existingGoals = await db.select().from(goals);
    if (existingGoals.length > 0) return;

    await db.insert(goals).values([
        { title: 'Learn TypeScript', description: 'Complete the TypeScript tutorial', startDate: '2026-01-01', endDate: '2026-12-31', targetCount: 10, categoryId: 2, userId: 1 },
        { title: 'Build a React App', description: 'Create a new React application', startDate: '2026-01-01', endDate: '2026-11-30', targetCount: 5, categoryId: 3, userId: 1 },
        { title: 'Run 5km', description: 'Run 5km three times a week', startDate: '2026-01-01', endDate: '2026-10-31', targetCount: 50, categoryId: 1, userId: 1 },
    ]);
}
