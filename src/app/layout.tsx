// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/organisms/navbar";
import Providers from "./provider";

// Tanpa variable
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Job Portal App",
  description: "Modern job portal powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <link  rel="icon" href="/logo_rev.svg" className="w-6" />
      </head>
      <body className={inter.className}>
        <Navbar/>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
