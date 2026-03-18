import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ミリイ・ソーイング | 未経験から、ひとりで子供服が作れるようになる教室",
  description: "30〜35歳のママに向けた自立型子供服ミシン教室。元警察官の講師が教える、再現性の高い本格的な洋裁技術。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} antialiased font-sans text-slate-800 bg-[#FAF9F6]`}
      >
        {children}
      </body>
    </html>
  );
}
