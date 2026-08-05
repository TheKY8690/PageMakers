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
        <style>{`body { margin: 0; } @keyframes spin { to { transform: rotate(360deg); } } * { scrollbar-width: none; } *::-webkit-scrollbar { display: none; }`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
