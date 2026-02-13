import { getClub } from "@/data/clubs";
import CheckoutClient from "@/components/features/CheckoutClient";
import { notFound } from "next/navigation";

interface CheckoutPageProps {
    params: Promise<{ id: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { id } = await params;
    const club = getClub(id);

    if (!club) {
        notFound();
    }

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <CheckoutClient club={club} />
        </div>
    );
}
