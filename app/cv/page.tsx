import type { Metadata } from "next";
import CvClient from "@/components/CvClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Print Station — Patel Prince",
  description: "Watch Patel Princekumar's resume print itself in 3D, then preview or download the PDF.",
};

export default function CvPage() {
  return (
    <main>
      <CvClient />
      <Footer />
    </main>
  );
}
