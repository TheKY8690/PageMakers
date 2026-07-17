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
      <body>{children}</body>
    </html>
  );
}
