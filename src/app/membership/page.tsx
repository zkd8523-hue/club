import Button from "@/components/common/Button";
import styles from "./Membership.module.css";

export default function MembershipPage() {
    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <div className={styles.header}>
                <h1 className="text-gradient">Clubbnb Gold Membership</h1>
                <p>Unlock the most exclusive nightlife experiences in Korea.</p>
            </div>

            <div className={styles.pricingGrid}>
                <div className={styles.planCard}>
                    <div className={styles.planHeader}>
                        <h3>Standard</h3>
                        <p>For casual party goers</p>
                        <div className={styles.price}>Free</div>
                    </div>
                    <ul className={styles.features}>
                        <li>✓ Basic Reservation</li>
                        <li>✓ Find Party Groups</li>
                        <li>✗ Service Fees Apply</li>
                        <li>✗ No Queue Priority</li>
                    </ul>
                    <Button variant="outline" fullWidth>Get Started</Button>
                </div>

                <div className={`${styles.planCard} ${styles.featured}`}>
                    <div className={styles.badge}>BEST VALUE</div>
                    <div className={styles.planHeader}>
                        <h3>Gold VIP</h3>
                        <p>For the ultimate experience</p>
                        <div className={styles.price}>₩29,900<span>/mo</span></div>
                    </div>
                    <ul className={styles.features}>
                        <li>✓ Zero Service Fees</li>
                        <li>✓ Priority VIP Entry</li>
                        <li>✓ 2x Free Drink Coupons</li>
                        <li>✓ Dedicated Concierge</li>
                        <li>✓ Early Access to Hot Deals</li>
                    </ul>
                    <Button variant="primary" fullWidth size="large">Subscribe Now</Button>
                </div>

                <div className={styles.planCard}>
                    <div className={styles.planHeader}>
                        <h3>Elite</h3>
                        <p>For the real players</p>
                        <div className={styles.price}>₩99,900<span>/mo</span></div>
                    </div>
                    <ul className={styles.features}>
                        <li>✓ All Gold Benefits</li>
                        <li>✓ VVIP Table Booking</li>
                        <li>✓ Monthly Bottle Credit</li>
                        <li>✓ Secret Afterparty Invites</li>
                        <li>✓ Personal Host</li>
                    </ul>
                    <Button variant="outline" fullWidth>Request Access</Button>
                </div>
            </div>
        </div>
    );
}
