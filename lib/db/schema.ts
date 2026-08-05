import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const portfolioRequests = pgTable('portfolio_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id'), // auth 구현 후 채울 예정
  brandName: text('brand_name').notNull(),
  brandDescription: text('brand_description').notNull(),
  brandColors: text('brand_colors').array().notNull().default([]),
  imageUrls: text('image_urls').array().default([]),
  status: text('status').default('pending'), // pending | in_progress | done
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
})

export const publishedPages = pgTable('published_pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  requestId: uuid('request_id').references(() => portfolioRequests.id).notNull(),
  userId: uuid('user_id'),
  username: text('username').notNull(),
  slug: text('slug').notNull(),
  templateId: text('template_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
