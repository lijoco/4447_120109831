import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

const sqlite = openDatabaseSync('goals.db');

sqlite.execSync(`

 CREATE TABLE IF NOT EXISTS goals (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 description TEXT NOT NULL,
 deadline TEXT NOT NULL,
 count INTEGER NOT NULL DEFAULT 0
 );
`);

export const db = drizzle(sqlite);