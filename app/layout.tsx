import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PageMakers",
  description: "개인/기업 포트폴리오 제작 서비스",
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
