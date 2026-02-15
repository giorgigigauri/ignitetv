import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ignite Television",
  description:
    "Ignite Television - Your source for live streaming, news, and on-demand shows.",
};

export const viewport: Viewport = {
  themeColor: "#0a1128",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} font-sans antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
