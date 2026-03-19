import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Papel Crepé - Crea Invitaciones Hermosas",
  description: "Crea invitaciones digitales personalizadas con Papel Crepé para cumpleaños, bodas, baby showers y más. Diseña, comparte y gestiona tus eventos fácilmente.",
  keywords: ["papel crepé", "invitaciones digitales", "invitaciones online", "cumpleaños", "bodas", "baby shower", "eventos", "RSVP"],
  authors: [{ name: "Papel Crepé" }],
  icons: {
    icon: "/logo-papel-crepe.png",
  },
  openGraph: {
    title: "Papel Crepé",
    description: "Crea invitaciones digitales hermosas para cualquier ocasión con Papel Crepé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Papel Crepé",
    description: "Crea invitaciones digitales hermosas para cualquier ocasión con Papel Crepé",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Bubblegum+Sans&family=Fredoka+One&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Quicksand:wght@300;400;500;600;700&family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
