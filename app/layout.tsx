import type { Metadata } from "next";
import { Playfair_Display, Suwannaphum, Moul, Moulpali } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const suwannaphum = Suwannaphum({
  subsets: ["khmer"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-suwannaphum",
});

const moul = Moul({
  subsets: ["khmer"],
  weight: ["400"],
  variable: "--font-moul",
});

const moulpali = Moulpali({
  subsets: ["khmer"],
  weight: ["400"],
  variable: "--font-moulpali",
});

// export const metadata: Metadata = {
//   title: "សិរីសួស្តីពិធីកាត់ខាន់ស្លា - Engagement Invitation",
//   description: "You are invited to our engagement ceremony.",
//   metadataBase: new URL("https://deth-pich.vercel.app"),
//   openGraph: {
//     title: "សិរីសួស្តីពិធីកាត់ខាន់ស្លា - Engagement Invitation",
//     description: "You are invited to our engagement ceremony.",
//     images: [
//       {
//         url: "https://deth-pich.vercel.app/images/IMG_2407.JPG",
//         width: 1200,
//         height: 630,
//         alt: "Engagement Invitation Thumbnail",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "សិរីសួស្តីពិធីកាត់ខាន់ស្លា - Engagement Invitation",
//     description: "You are invited to our engagement ceremony.",
//     images: ["https://deth-pich.vercel.app/images/IMG_2407.JPG"],
//   },
// };

export const metadata: Metadata = {
  metadataBase: new URL("https://deth-pich.vercel.app"),

  title: {
    default: "សិរីសួស្តីពិធីកាត់ខាន់ស្លា - Engagement Invitation",
    template: "%s | Engagement Invitation",
  },

  description:
    "សូមគោរពអញ្ជើញចូលរួមពិធីកាត់ខាន់ស្លា និងពិសាអាហារសាមគ្គី។ You are warmly invited to our engagement ceremony.",

  keywords: [
    "Engagement Invitation",
    "Wedding Invitation",
    "Khmer Wedding",
    "Cambodia Engagement",
    "សិរីសួស្តីពិធីកាត់ខាន់ស្លា",
    "ការអញ្ជើញពិធីភ្ជាប់ពាក្យ",
  ],

  authors: [
    {
      name: "Deth & Pich",
    },
  ],

  creator: "Deth & Pich",

  openGraph: {
    type: "website",
    locale: "km_KH",
    url: "https://deth-pich.vercel.app",
    siteName: "Deth & Pich Engagement",

    title: "សិរីសួស្តីពិធីកភ្ជាប់ពាក្យ - Engagement Invitation",

    description:
      "សូមគោរពអញ្ជើញចូលរួមពិធីភ្ជាប់ពាក្យរបស់កូនប្រុសស្រី។",

    images: [
      {
        url: "/images/IMG_2407.JPG",
        width: 1200,
        height: 630,
        alt: "Deth & Pich Engagement Invitation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "សិរីសួស្តីពិធីកាត់ខាន់ស្លា - Engagement Invitation",

    description:
      "You are warmly invited to our engagement ceremony.",

    images: ["/images/IMG_2407.JPG"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://deth-pich.vercel.app",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km">
      <body
        className={`${playfair.variable} ${suwannaphum.variable} ${moul.variable} ${moulpali.variable} antialiased min-h-screen flex flex-col relative`}
      >
        {children}
      </body>
    </html>
  );
}
