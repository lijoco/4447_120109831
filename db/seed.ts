import { db } from './client';
import { goals } from './schema';

export async function seedGoalsIfEmpty() {
    const existing = await db.select().from(goals);

    if (existing.length > 0) return;
    await db.insert(goals).values([
        { title: 'Learn TypeScript', description: 'Complete the TypeScript tutorial', deadline: '2026-12-31', count: 0 },
        { title: 'Build a React App', description: 'Create a new React application', deadline: '2026-11-30', count: 0 },
        { title: 'Deploy to Production', description: 'Deploy the application to production', deadline: '2026-10-31', count: 0 },
    ]);
}
