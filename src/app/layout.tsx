import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Risee — AI Architect & Creator",
  description: "I build intelligent digital systems — AI-powered websites, automation pipelines, and viral content engines that scale without limits.",
  keywords: ["AI", "Automation", "Web Development", "YouTube", "Content Creation", "Digital Systems"],
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
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased bg-background text-foreground`}
        style={{ fontFamily: "'DM Sans', 'system-ui', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
