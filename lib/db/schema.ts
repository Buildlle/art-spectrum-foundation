import { pgTable, text, timestamp, boolean, uuid, jsonb } from 'drizzle-orm/pg-core';

// Users table for authentication
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified'),
  image: text('image'),
  role: text('role').default('user'), // 'admin', 'editor', 'user'
  createdAt: timestamp('created_at').defaultNow(),
});

// Content blocks that can be edited inline
export const contentBlocks = pgTable('content_blocks', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: text('key').notNull().unique(), // unique identifier for each content block
  type: text('type').notNull(), // 'text', 'image', 'link', 'html'
  content: text('content').notNull(), // the actual content
  metadata: jsonb('metadata'), // additional data (alt text, link targets, etc)
  page: text('page').notNull(), // which page this content belongs to
  position: text('position'), // position identifier on page
  isPublished: boolean('is_published').default(true),
  lastModified: timestamp('last_modified').defaultNow(),
  modifiedBy: uuid('modified_by').references(() => users.id),
});

// Page configurations
export const pages = pgTable('pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  isPublished: boolean('is_published').default(true),
  lastModified: timestamp('last_modified').defaultNow(),
  modifiedBy: uuid('modified_by').references(() => users.id),
});

// Deployment logs
export const deployments = pgTable('deployments', {
  id: uuid('id').defaultRandom().primaryKey(),
  status: text('status').notNull(), // 'pending', 'building', 'success', 'failed'
  triggeredBy: uuid('triggered_by').references(() => users.id),
  buildId: text('build_id'),
  deployUrl: text('deploy_url'),
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

export type User = typeof users.$inferSelect;
export type ContentBlock = typeof contentBlocks.$inferSelect;
export type Page = typeof pages.$inferSelect;
export type Deployment = typeof deployments.$inferSelect;