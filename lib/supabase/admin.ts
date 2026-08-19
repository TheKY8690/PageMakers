import { createClient } from '@supabase/supabase-js'

type AdminClient = ReturnType<typeof createClient>

let _client: AdminClient | null = null

function getClient(): AdminClient {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _client
}

export const supabaseAdmin = new Proxy({} as AdminClient, {
  get(_, prop: string | symbol) {
    return getClient()[prop as keyof AdminClient]
  },
})
