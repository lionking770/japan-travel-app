import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "일본 여행 플래너",
  description: "지도, 날씨, 메모와 AI 피드백으로 일본 여행을 계획하세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full overflow-hidden antialiased`}>
      <body className="h-full overflow-hidden bg-zinc-100 font-sans text-zinc-900">
        {children}
      </body>
    </html>
  );
}
