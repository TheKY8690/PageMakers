import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const portfolioRequests = pgTable('portfolio_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id'), // auth 구현 후 채울 예정
  brandName: text('brand_name').notNull(),
  brandDescription: text('brand_description').notNull(),
  brandColor: text('brand_color').notNull(),
  imageUrls: text('image_urls').array().default([]),
  status: text('status').default('pending'), // pending | in_progress | done
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
})
