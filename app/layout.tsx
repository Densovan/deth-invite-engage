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


// export const metadata: Metadata = {
//   metadataBase: new URL("https://deth-pich.vercel.app"),

//   title: "សិរីសួស្តីពិធីភ្ជាប់ពាក្យ - Engagement Invitation",

//   description:
//     "You are warmly invited to our engagement ceremony.",

//   openGraph: {
//     title: "សិរីសួស្តីពិធីភ្ជាប់ពាក្យ - Engagement Invitation",

//     description:
//       "You are warmly invited to our engagement ceremony.",

//     url: "https://deth-pich.vercel.app",

//     siteName: "Deth & Pich Engagement",

//     images: [
//       {
//         url: "https://deth-pich.vercel.app/images/IMG_2407.JPG",
//         width: 1200,
//         height: 630,
//         alt: "Engagement Invitation Thumbnail",
//       },
//     ],

//     locale: "km_KH",
//     type: "website",
//   },

//   twitter: {
//     card: "summary_large_image",

//     title: "សិរីសួស្តីពិធីភ្ជាប់ពាក្យ - Engagement Invitation",

//     description:
//       "You are warmly invited to our engagement ceremony.",

//     images: [
//       "https://deth-pich.vercel.app/images/IMG_2407.JPG",
//     ],
//   },
// };
export const metadata: Metadata = {
  title: "សិរីសួស្តីពិធីភ្ជាប់ពាក្យ - Engagement Invitation",
  description: "You are warmly invited to our engagement ceremony.",
  openGraph: {
    title: "សិរីសួស្តីពិធីភ្ជាប់ពាក្យ - Engagement Invitation",
    description: "You are warmly invited to our engagement ceremony.",
    images: [
      "https://deth-pich.vercel.app/images/IMG_2407.JPG",
    ],
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
