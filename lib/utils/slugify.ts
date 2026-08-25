export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거 (한글 허용)
    .replace(/[\s_]+/g, '-')      // 공백/언더스코어 → 하이픈
    .replace(/^-+|-+$/g, '')      // 앞뒤 하이픈 제거
}
