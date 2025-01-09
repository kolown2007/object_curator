import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Define the user table
export const user = sqliteTable('user', {
  id: integer('id').primaryKey().notNull(),
  googleId: text('google_id').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  picture: text('picture').notNull(),
  access: text('access').notNull().default('[]'), 
});

// Define the index on google_id
export const googleIdIndex = sql`CREATE INDEX google_id_index ON user(google_id)`;

// Define the session table
export const session = sqliteTable('session', {
  id: text('id').primaryKey().notNull(),
  userId: integer('user_id').notNull().references(() => user.id),
  expiresAt: integer('expires_at').notNull(),
});