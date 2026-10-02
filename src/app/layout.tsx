import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import IntroSequence from "@/components/ui/IntroSequence";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Patel Prince | Data Science & Analytics",
  description: "Data Science & Analytics student building practical projects across data analysis, machine learning and AI.",
  keywords: ["Data Science", "Analytics", "Machine Learning", "AI", "Patel Prince", "Portfolio"],
  openGraph: {
    title: "Patel Prince | Data Science & Analytics",
    description: "Data Science & Analytics student building practical projects across data analysis, machine learning and AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark bg-[#0a0a0c]`}
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-1000">
        <AppProvider>
          <IntroSequence />
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
