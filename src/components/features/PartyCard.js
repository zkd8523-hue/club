import styles from "./PartyCard.module.css";
import Button from "@/components/ui/Button";

export default function PartyCard({ party }) {
    const progress = (party.currentMembers / party.maxMembers) * 100;
    const isFull = party.currentMembers >= party.maxMembers;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.clubName}>{party.clubName}</h3>
                    <div className={styles.date}>{party.date.toLocaleDateString()}</div>
                </div>
                {!isFull && <div className={styles.status}>모집중 (Recruiting)</div>}
            </div>

            <div className={styles.info}>
                <div className={styles.tableInfo}>
                    {party.tableType} • {party.bottles.join(", ")}
                </div>

                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className={styles.members}>
                        <span>{party.currentMembers} / {party.maxMembers} 참여 (Joined)</span>
                        <span>{party.maxMembers - party.currentMembers} 명 남음</span>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div>
                    <span className={styles.priceLabel}>1인당 (Per Person)</span>
                    <span className={styles.priceValue}>₩{party.perPersonPrice.toLocaleString()}</span>
                </div>
                <Button size="small" variant={isFull ? "outline" : "primary"} disabled={isFull}>
                    {isFull ? "마감 (Full)" : "참여하기 (Join)"}
                </Button>
            </div>
        </div>
    );
}
