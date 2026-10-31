import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  title: "Patel Prince — Data Science & AI Engineering",
  description:
    "Patel Princekumar — CSE student at CSPIT, CHARUSAT. Data science, analytics and applied machine learning. Open to internships.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${space.variable} ${jbmono.variable}`}>
      <body className="grain antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
