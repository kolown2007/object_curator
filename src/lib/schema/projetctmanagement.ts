import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Main project
export const project = sqliteTable('project', {
  id: integer('id').primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  progress: integer('progress').default(0), // Calculated from phases
});

// Phases (Research, Writing, etc)
export const phase = sqliteTable('phase', {
  id: integer('id').primaryKey().notNull(),
  projectId: integer('project_id').references(() => project.id),
  name: text('name').notNull(),
  order: integer('order').notNull(),
  startDate: text('start_date'),
  endDate: text('end_date'),
  progress: integer('progress').default(0), // Calculated from tasks
  weight: integer('weight').default(1),
});

// Tasks under phases
export const task = sqliteTable('task', {
  id: integer('id').primaryKey().notNull(),
  phaseId: integer('phase_id').references(() => phase.id),
  title: text('title').notNull(),
  description: text('description'),
  isComplete: integer('is_complete').default(0),
  weight: integer('weight').default(1),
  progress: integer('progress').default(0),
});