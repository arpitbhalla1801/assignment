import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apollo 24/7: Consult General Physicians & Internal Medicine Doctors Online",
  description: "Find and book consultations with top general physicians and internal medicine specialists on Apollo 24/7. Compare fees, check qualification, and read patient reviews before booking your online doctor appointment.",
  keywords: "Apollo 24/7, general physician, internal medicine specialist, online doctor consultation, physician near me, best general physicians, Apollo healthcare",
  openGraph: {
    title: "General Physicians & Internal Medicine Specialists | Apollo 24/7",
    description: "Book appointments with the best general physicians and internal medicine specialists on Apollo 24/7. Get online consultations or in-clinic visits at your convenience.",
    url: "https://apollo247.com/specialties/general-physician-internal-medicine",
    siteName: "Apollo 24/7",
    images: [
      {
        url: "https://apollo247.com/general-physician.jpg",
        width: 1200,
        height: 630,
        alt: "Apollo 24/7 - General Physicians & Internal Medicine Specialists",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://apollo247.com/specialties/general-physician-internal-medicine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apollo 24/7: Consult General Physicians Online",
    description: "Book appointments with the best general physicians and internal medicine specialists. Compare fees and check availability instantly.",
    images: ["https://apollo247.com/general-physician.jpg"],
  },
  authors: [{ name: "Apollo 24/7" }],
  publisher: "Apollo 24/7",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};