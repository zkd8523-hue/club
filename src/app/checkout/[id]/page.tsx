import { getClub } from "@/data/clubs";
import CheckoutClient from "@/components/features/CheckoutClient";
import { notFound } from "next/navigation";
import styles from "./checkout.module.css";

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
        <div className={`container ${styles.container}`}>
            <CheckoutClient club={club} />
        </div>
    );
}
