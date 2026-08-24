# Variant1 — 설계 기록 (2026-08-22)

requestId: `4f307aca-b8c2-4144-8fba-9451864a1278`
파일: `components/requests/4f307aca-b8c2-4144-8fba-9451864a1278/Variant1.tsx`

---

## 레퍼런스

**daveholloway.uk** — 핵심 차용 패턴:
- 히어로: 이미지 없이 타이포그래피만, bottom-aligned
- 스크롤 후 mainImage 등장 (이미지를 히어로 배경으로 쓰지 않음)
- char-split 브랜드명 stagger 애니메이션
- 커튼 clipPath 이미지 리빌

**expandable gallery 레퍼런스** (2026-08-22 추가):
- hover 시 flex 팽창 인터랙션 (ExpandableGallery 컴포넌트 참조)
- 이미지 hover → flex: 2.5, 나머지 → flex: 0.5
- CSS transition으로 구현 (framer-motion 아닌 React state + inline style)

---

## 페이지 플로우

```
1. HERO         — 타이포만, bg #0C0C0C, bottom-aligned
2. INTRO        — mainImage (좌 55%) + 자기소개 (우 45%)
3a. FEATURED    — imageUrls[0~2], 카드 형식, 자연비율
3b. GALLERY     — imageUrls[3+], hover-expand flex 갤러리
4. PHILOSOPHY   — brandDescription 기반 quote + word scrub
5. TICKER       — CSS marquee, tagline 반복
6. CONTACT      — stagger x reveal
7. FOOTER
```

---

## 이미지 처리 규칙

| 섹션 | 처리 방식 | 이유 |
|------|-----------|------|
| INTRO mainImage | `position:absolute; height:115%; object-fit:cover` + parallax | 좌측 full-height sticky, parallax 효과 필요 |
| Featured [0~2] | `height:auto; object-fit:initial; width:100%` | 자연비율 보존, 크롭 없음 |
| Gallery [3+] | `height:100%; width:100%; object-fit:cover` | 고정 height(52vh) 갤러리, 일관된 높이 필요 |

**핵심**: `imageUrls`는 자연비율 유지가 원칙 (Variant.md 스펙). mainImage만 cover 예외.

---

## GSAP 구조

### useEffect #1 — scroller detection
- DOM 부모 순회 → `overflow: auto/scroll` 찾기
- admin overlay(custom scroller) vs 발행 페이지(window) 구분
- `scrollerRef.current`에 저장 → 모든 ScrollTrigger에서 `scroller` 옵션으로 사용

### useEffect #2 — hero entrance (preloaderDone gate)
```
tl: nav(y -28→0) → chars(y 115%→0%) → words(y 75%→0%) → meta(opacity)
```

### useEffect #3 — scroll animations (preloaderDone gate)
- `[data-v1-curtain]` → clipPath 커튼 리빌 + img y parallax scrub
- `[data-v1-card]` → clipPath 커튼 리빌 + img scale(1.04→1)
- `.v1-intro-right` → meta fade + bio word y reveal
- `.v1-quote-section` → qword opacity scrub(0.1→1)
- `.v1-contact-section` → rows x stagger

### 갤러리 [3+] — GSAP 없음
- CSS transition만 사용 (ScrollTrigger가 custom scroller 내부 flex container에서 불안정)

---

## CSS 클래스

| 클래스 | 용도 | 핵심 규칙 |
|--------|------|-----------|
| `.v1-curtain` | INTRO mainImage | `overflow:hidden; position:relative` + img `position:absolute; height:115%` |
| `.v1-card` | featured 카드 | `overflow:hidden` + img `height:auto; object-fit:initial` |
| `.v1-card-wrap` | 카드 wrapper | 모바일 padding 오버라이드용 |
| `.v1-card-grid` | 카드 그리드 wrapper | 모바일 1열 오버라이드용 |
| `.v1-gallery` | 갤러리 컨테이너 | `display:flex; height:52vh; overflow:hidden` |
| `.v1-gallery-item` | 갤러리 아이템 | `flex` 값 JS로 동적 제어 |
| `.v1-char-wrap/.v1-char` | 브랜드명 char split | overflow:hidden mask |
| `.v1-word-wrap/.v1-word` | tagline/bio word split | overflow:hidden mask |
| `.v1-qword` | philosophy quote | opacity 0.1→1 scrub |
| `.v1-contact-row` | contact 행 | hover padding-left indent |

---

## 콘텐츠 로직

```ts
const descLines = brandDescription.split(/\r?\n/).filter(Boolean)
const tagline = descLines[0]                          // 히어로 tagline
const lastLine = descLines[descLines.length - 1]
const useLastAsQuote = descLines.length > 1 && lastLine.length >= 20
const bioLines = useLastAsQuote ? descLines.slice(1, -1) : descLines.slice(1)
const quoteText = useLastAsQuote ? lastLine : QUOTE_FALLBACK
```

- `descLines[0]` → 히어로 tagline + ticker
- `descLines[1+]` → INTRO bio (마지막 줄 20자 이상이면 quote로 분리)
- 마지막 줄 20자+ → Philosophy quote로 사용
- Fallback: `'빛이 머문 자리에 이야기가 남는다'`

---

## 주요 버그 기록

| 버그 | 원인 | 해결 |
|------|------|------|
| 이미지 크롭/정방향 아님 | 전체 이미지에 `height:vh + object-fit:cover` 적용 | Featured [0~2]은 `height:auto; object-fit:initial` |
| 이미지 전부 갤러리처럼 모임 | 모든 이미지를 동일 레이아웃으로 렌더 | [0~2] 카드, [3+] flex 갤러리로 분리 |
| mainImage 너무 어두움 | 히어로 배경으로 사용 + opacity 0.36 | 히어로에서 제거, INTRO 섹션에 별도 배치, full opacity |
| nav opacity 영구 투명 | `gsap.from`에 `opacity:0` 인라인 스타일 동시 사용 | nav는 인라인 opacity 지정 금지, gsap.fromTo로만 |
| admin overlay ScrollTrigger 오작동 | window 대신 custom scroller 필요 | DOM walk로 scroller 감지, `scroller` 옵션 전달 |

---

## 미결 / 참고

- `PagePreloader` StrictMode 버그: `shownSet.add()` 애니메이션 완료 후로 이동 (기수정)
- `gsap.context(fn, containerRef)` — 3개 동시 렌더링 시 selector 충돌 방지
- 모바일: 갤러리 height `50vw`, 카드 grid 1열 (`v1-card-grid` 클래스)
