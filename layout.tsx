import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CalciLab - Your All-in-One Calculator Hub | 124+ Free Online Calculators",
  description: "Access 124+ free online calculators for health, finance, math, date & time, and everyday tools. BMI calculator, mortgage calculator, compound interest, and more. Fast, accurate, and easy to use.",
  keywords: ["calculator", "BMI calculator", "mortgage calculator", "compound interest", "percentage calculator", "age calculator", "online calculator", "free calculator", "CalciLab"],
  authors: [{ name: "CalciLab Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CalciLab - Your All-in-One Calculator Hub",
    description: "124+ free online calculators for health, finance, math, and more",
    url: "https://calcilab.com",
    siteName: "CalciLab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalciLab - Your All-in-One Calculator Hub",
    description: "124+ free online calculators for health, finance, math, and more",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
