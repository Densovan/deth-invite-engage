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

export const metadata: Metadata = {
  title: "សិរីសួស្តីពិធីកាត់ខាន់ស្លា - Engagement Invitation",
  description: "You are invited to our engagement ceremony.",
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  openGraph: {
    title: "សិរីសួស្តីពិធីកាត់ខាន់ស្លា - Engagement Invitation",
    description: "You are invited to our engagement ceremony.",
    images: [
      {
        url: "/images/IMG_2407.JPG",
        width: 1200,
        height: 630,
        alt: "Engagement Invitation Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "សិរីសួស្តីពិធីកាត់ខាន់ស្លា - Engagement Invitation",
    description: "You are invited to our engagement ceremony.",
    images: ["/images/IMG_2407.JPG"],
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
