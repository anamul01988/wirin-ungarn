"use client";
import {
  Geist,
  Geist_Mono,
  Open_Sans,
  Roboto_Condensed,
} from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "@/contexts/AuthContext";
import ReduxProvider from "@/lib/store/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose the weights you need
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
