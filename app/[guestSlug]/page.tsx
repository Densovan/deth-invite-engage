import connectToDatabase from "@/lib/mongodb";
import { Guest } from "@/models/Guest";
import Invitation from "@/components/Invitation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guestSlug: string }>;
}): Promise<Metadata> {
  const { guestSlug } = await params;
  
  try {
    await connectToDatabase();
    const decodedSlug = decodeURIComponent(guestSlug);
    const guest = await Guest.findOne({ slug: decodedSlug });

    if (!guest) {
      return {};
    }

    const title = `សិរីសួស្តី ${guest.name} - ពិធីភ្ជាប់ពាក្យ ម៉ៅ វណ្ណដេត & លឹម ស្រីពេជ្រ`;
    const description = `គោរពអញ្ជើញ ${guest.name} ចូលរួមជាភ្ញៀវកិត្តិយសក្នុងពិធីភ្ជាប់ពាក្យ កូនប្រុស កូនស្រី របស់យើងខ្ញុំ នៅថ្ងៃអាទិត្យ ទី២១ ខែមិថុនា ឆ្នាំ២០២៦។`;
    const url = `https://deth-pich.vercel.app/${guestSlug}`;

    return {
      title,
      description,
      openGraph: {
        type: "website",
        url,
        title,
        description,
        images: [
          {
            url: "https://deth-pich.vercel.app/images/IMG_2407_thumb.jpg",
            width: 800,
            height: 600,
            alt: "Engagement Invitation Thumbnail",
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://deth-pich.vercel.app/images/IMG_2407_thumb.jpg"],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

export default async function GuestInvitation({
  params,
}: {
  params: Promise<{ guestSlug: string }>;
}) {
  const { guestSlug } = await params;
  
  try {
    await connectToDatabase();
    const decodedSlug = decodeURIComponent(guestSlug);
    const guest = await Guest.findOne({ slug: decodedSlug });

    if (!guest) {
      notFound();
    }

    return <Invitation guestName={guest.name} />;
  } catch (error) {
    console.error("Error fetching guest:", error);
    notFound();
  }
}

