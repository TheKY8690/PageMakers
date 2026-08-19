import { supabaseAdmin } from '@/lib/supabase/admin'

const BUCKET = 'portfolio-images'

export async function uploadImage(file: File, userId: string): Promise<string> {
  const ext = file.name.split('.').pop()
  const path = `${userId}/${Date.now()}.${ext}`

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file)

  if (error) throw error

  const { data } = supabaseAdmin.storage
    .from(BUCKET)
    .getPublicUrl(path)

  return data.publicUrl
}
