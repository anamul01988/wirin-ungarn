"use client";
import {
  Geist,
  Geist_Mono,
  Open_Sans,
  Roboto_Condensed,
} from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@material-tailwind/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${openSans.variable} 
          ${robotoCondensed.variable} 
          antialiased
        `}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
