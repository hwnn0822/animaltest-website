import type { Metadata } from "next";
import { Noto_Sans_KR } from 'next/font/google';
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '700'],
  preload: false,
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "나와 닮은 동물 찾기",
  description: "간단한 심리테스트로 나와 닮은 동물을 찾아보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} min-h-screen bg-gradient-to-br from-primaryPink via-lightPink to-lightPurple bg-fixed`}>{children}</body>
    </html>
  );
}