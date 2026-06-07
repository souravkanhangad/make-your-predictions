import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Make Your Prediction - Create Prediction Contests in Seconds",
  description: "Create score prediction contests, share a link, collect predictions, and automatically pick winners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
