import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'PageMakers — 나만의 포트폴리오 페이지',
    template: '%s | PageMakers',
  },
  description:
    '요청서 하나로, 전문가가 직접 만들어드리는 맞춤형 포트폴리오 페이지. 브랜드 컬러, 소개, 이미지를 담아 고유 URL로 즉시 공개됩니다.',
  metadataBase: new URL('https://pagemakers.co'),
  openGraph: {
    type: 'website',
    siteName: 'PageMakers',
    locale: 'ko_KR',
    images: [{ url: '/og-image.png', width: 1730, height: 909, alt: 'PageMakers' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`html { scroll-behavior: auto; background-color: #0C0C0C; } body { margin: 0; font-family: 'Space Grotesk', system-ui, sans-serif; background-color: #0C0C0C; } @keyframes spin { to { transform: rotate(360deg); } } * { scrollbar-width: none; } *::-webkit-scrollbar { display: none; }`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
