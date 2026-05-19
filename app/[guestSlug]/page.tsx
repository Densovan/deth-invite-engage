import connectToDatabase from "@/lib/mongodb";
import { Guest } from "@/models/Guest";
import Invitation from "@/components/Invitation";
import { notFound } from "next/navigation";

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
