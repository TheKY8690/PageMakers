'use server'

import { db } from '@/lib/db'
import { profiles } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'
import { sql } from 'drizzle-orm'

export async function setUserRole(userId: string, role: 'admin' | 'user') {
  await db.execute(
    sql`INSERT INTO profiles (id, role) VALUES (${userId}, ${role})
        ON CONFLICT (id) DO UPDATE SET role = ${role}`
  )
  revalidatePath(`/admin/users/${userId}`)
  revalidatePath('/admin/users')
}
