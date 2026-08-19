import { jsonb, pgPolicy, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const portfolioRequests = pgTable(
  'portfolio_requests',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id'), // auth 구현 후 채울 예정
    brandName: text('brand_name').notNull(),
    brandDescription: text('brand_description').notNull(),
    websiteType: text('website_type').notNull(),
    brandColors: text('brand_colors').array().notNull().default([]),
    mainImageUrl: text('main_image_url'),
    imageUrls: text('image_urls').array().default([]),
    contacts: jsonb('contacts').$type<{ type: string; value: string }[]>().default([]),
    selectedTemplateId: text('selected_template_id'),
    additionalRequest: text('additional_request'),
    status: text('status').default('pending'), // pending | in_progress | done
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    pgPolicy('users_own_requests', {
      as: 'permissive',
      for: 'all',
      to: 'authenticated',
      using: sql`auth.uid() = ${table.userId}`,
    }),
  ]
).enableRLS()

export const publishedPages = pgTable(
  'published_pages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    requestId: uuid('request_id').references(() => portfolioRequests.id).notNull(),
    userId: uuid('user_id'),
    username: text('username').notNull(),
    slug: text('slug').notNull(),
    templateId: text('template_id').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => [
    pgPolicy('public_read_pages', {
      as: 'permissive',
      for: 'select',
      to: 'anon,authenticated',
      using: sql`true`,
    }),
    pgPolicy('users_own_pages', {
      as: 'permissive',
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`auth.uid() = ${table.userId}`,
    }),
  ]
).enableRLS()
