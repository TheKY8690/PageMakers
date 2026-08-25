import { db } from '@/lib/db'
import { publishedPages } from '@/lib/db/schema'
import { createServerClient } from '@supabase/ssr'
import { eq } from 'drizzle-orm'
import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''
  const { pathname } = request.nextUrl
  const BASE = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'pagemakers.co'

  // ① 서브도메인 처리 (auth 불필요, 먼저 실행)
  const isLocalhost = hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1')
  const isBaseDomain = hostname === BASE || hostname === `www.${BASE}`

  if (!isLocalhost && !isBaseDomain && hostname.endsWith(`.${BASE}`)) {
    const sub = hostname.replace(`.${BASE}`, '')

    if (sub !== 'admin' && sub !== 'www') {
      const [page] = await db
        .select({ username: publishedPages.username, slug: publishedPages.slug })
        .from(publishedPages)
        .where(eq(publishedPages.username, sub))
        .limit(1)

      if (!page) {
        return new NextResponse('<h1>404 – 페이지를 찾을 수 없습니다</h1>', {
          status: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        })
      }

      const url = request.nextUrl.clone()
      url.pathname = `/u/${page.username}/${page.slug}${pathname === '/' ? '' : pathname}`
      return NextResponse.rewrite(url)
    }
  }

  // ② 기존 Supabase auth (쿠키 갱신 + /dashboard 보호)
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}
