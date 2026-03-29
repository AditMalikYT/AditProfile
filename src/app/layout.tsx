import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Preloader from "@/components/Preloader";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Adit — AI Architect & Digital Creator",
  description: "I build intelligent digital systems — AI-powered websites, automation pipelines, and viral content engines that scale without limits.",
  keywords: ["AI", "Automation", "Web Development", "YouTube", "Content Creation", "Digital Systems", "AI Architect", "Prompt Engineering", "AI Strategy", "Viral Systems"],
  authors: [{ name: "Adit" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Adit — AI Architect & Creator",
    description: "I build intelligent digital systems — AI-powered websites, automation pipelines, and viral content engines.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adit — AI Architect & Creator",
    description: "AI-powered websites, automation pipelines, and viral content engines.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adit",
    "jobTitle": "AI Architect & Digital Creator",
    "description": "I build intelligent digital systems — AI-powered websites, automation pipelines, and viral content engines that scale without limits.",
    "url": "https://adit.profile"
  };

  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${syne.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`antialiased bg-background text-foreground font-sans`}
      >
        <Preloader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
