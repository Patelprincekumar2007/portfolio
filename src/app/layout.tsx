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
  metadataBase: new URL("https://patelprince.xyz"),
  title: "Patel Prince | Data Science & Analytics",
  description: "Data Science & Analytics student building practical projects across data analysis, machine learning and AI.",
  keywords: ["Data Science", "Analytics", "Machine Learning", "AI", "Patel Prince", "Portfolio"],
  openGraph: {
    title: "Patel Prince | Data Science & Analytics",
    description: "Data Science & Analytics student building practical projects across data analysis, machine learning and AI.",
    type: "website",
    url: "https://patelprince.xyz",
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
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
