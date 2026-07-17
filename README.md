# PageMakers

개인/기업 포트폴리오 제작 SaaS. 유저가 폼으로 요청을 제출하면 운영자가 템플릿에 매핑해 포트폴리오 사이트를 생성합니다. 결과물 페이지는 Three.js GLB 3D 모델 스크롤 연출 또는 사진/영상 기반으로 구성됩니다.

**A portfolio creation SaaS for individuals and businesses.** Users submit a form request, and the admin maps the content to a template to generate a portfolio site — featuring Three.js 3D scroll animations or photo/video presentations.

---

## Tech Stack

| Category | Library |
|----------|---------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | vanilla-extract |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| ORM | Drizzle ORM + drizzle-kit |
| Database Driver | postgres-js |
| Backend | Supabase (Auth, Postgres, Storage) |
| Form | react-hook-form + zod |
| Package Manager | pnpm |
| Deploy | Vercel |

---

## Getting Started

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경변수 설정

`.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

```bash
cp .env.example .env.local
```

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon 공개 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role 키 (서버 전용) |
| `DATABASE_URL` | Postgres 연결 문자열 (Drizzle 마이그레이션용) |

### 3. 개발 서버 실행

```bash
pnpm dev
```

---

## Router Structure

```
app/
├── (marketing)/                        # 공개 마케팅 레이아웃 그룹
│   ├── page.tsx                        # / — 랜딩 페이지
│   └── templates/
│       ├── page.tsx                    # /templates — 템플릿 갤러리
│       └── [templateType]/page.tsx    # /templates/[type] — 데모
├── (auth)/                             # 인증 레이아웃 그룹
│   ├── login/page.tsx                  # /login
│   ├── signup/page.tsx                 # /signup
│   └── callback/page.tsx              # /callback — Supabase OAuth 콜백
├── (dashboard)/                        # 유저 대시보드 레이아웃 그룹
│   └── dashboard/
│       ├── page.tsx                    # /dashboard — 내 요청 목록
│       ├── portfolios/new/page.tsx     # /dashboard/portfolios/new
│       ├── requests/[id]/edit/page.tsx # /dashboard/requests/[id]/edit
│       └── inquiries/
│           ├── page.tsx                # /dashboard/inquiries
│           └── new/page.tsx           # /dashboard/inquiries/new
├── (admin)/                            # 어드민 레이아웃 그룹
│   └── admin/
│       ├── page.tsx                    # /admin — 대시보드
│       ├── requests/[id]/page.tsx     # /admin/requests/[id]
│       ├── portfolios/page.tsx        # /admin/portfolios
│       ├── users/[id]/page.tsx        # /admin/users/[id]
│       ├── inquiries/page.tsx         # /admin/inquiries
│       └── analytics/page.tsx        # /admin/analytics
└── u/[username]/[slug]/page.tsx       # /u/[username]/[slug] — 공개 포트폴리오 (ISR)
```

### 포트폴리오 요청 흐름

```
유저: 폼 제출 → pending
어드민: 작업 시작 → in_progress  (유저 편집 잠금)
어드민: 작업 완료 → done         (포트폴리오 배포)

작업 시작 후 변경 필요 시 → 1:1 문의
```

### 템플릿 타입

- `product` — 상품 소개
- `model_actor` — 모델/배우
- `personal` — 개인 포트폴리오
- `corporate` — 기업 포트폴리오

---

## Scripts

```bash
pnpm dev        # 개발 서버
pnpm build      # 프로덕션 빌드
pnpm start      # 프로덕션 서버
pnpm lint       # ESLint
```
