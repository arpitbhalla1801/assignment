import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Consult General Physicians Online | Book Appointment with Internal Medicine Specialists",
  description: "Find and book online consultations with experienced general physicians and internal medicine specialists. Compare doctor fees, read reviews and book appointments instantly.",
  keywords: "general physicians, internal medicine specialists, doctor consultation, online doctor appointment, specialist doctors, best doctors near me",
  authors: [{ name: "Apollo247 Clone" }],
  openGraph: {
    title: "Find General Physicians & Internal Medicine Specialists - Apollo247 Clone",
    description: "Book online consultations with experienced general physicians. Compare doctor fees, read reviews and book appointments instantly.",
    url: "https://apollo247-clone.com/specialties/general-physician-internal-medicine",
    siteName: "Apollo247 Clone",
    images: [
      {
        url: "https://apollo247-clone.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apollo247 Clone Doctors",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://apollo247-clone.com/specialties/general-physician-internal-medicine",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-geist antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}
