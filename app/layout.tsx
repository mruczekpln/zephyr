import "@/styles/globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/navigation";

import { Inter } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-main",
});
const titleFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: "Zephyr",
  description: "Put the jacket on!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`overflow-x-hidden max-w-[100vw] ${titleFont.variable} ${inter.variable} `}
    >
      <body className={`font-main max-w-[100vw] w-screen min-h-screen h-auto`}>
        <Navigation></Navigation>
        {children}
      </body>
    </html>
  );
}
