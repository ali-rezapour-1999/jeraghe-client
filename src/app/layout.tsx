import type { Metadata } from "next";
import "../style/globals.css";
import "../style/drawer.css";
import { Providers } from "@/utils/lib/provider";
import MainLayout from "./wrapper";

export const metadata: Metadata = {
  title: "جرقه - فضای خلاق و آموزشی",
  description: "جرقه جایی برای یادگیری، حل مشکلات و همکاری در ایده‌ها",
  keywords: ["یادگیری", "حل مشکلات", "ایده پردازی", "همکاری", "جرقه"],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "جرقه - فضای خلاق و آموزشی",
    description: "جرقه محلی برای یادگیری و همکاری در ایده‌ها",
    siteName: "جرقه",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "جرقه لوگو",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
