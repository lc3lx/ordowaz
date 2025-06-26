import type React from "react"
import type { Metadata } from "next"
import { Inter, Cairo } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "أردواز لخدمات البحث العلمي",
  description:
    "خدمات شاملة ومتخصصة في مجال البحث العلمي والأكاديمي - رسائل الماجستير، أطروحات الدكتوراه، التدقيق اللغوي، والنشر العلمي",
  keywords: "بحث علمي, رسائل ماجستير, أطروحات دكتوراه, تدقيق لغوي, نشر علمي, سكوبس",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${cairo.variable} ${inter.className} font-cairo`}>{children}</body>
    </html>
  )
}
