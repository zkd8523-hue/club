import PartyCard from "@/components/features/PartyCard";
import { parties } from "@/data/parties";

export default function PartyPage() {
    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
                    함께 파티를 즐기세요.
                </h1>
                <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
                    N/1 조각 기능으로 부담 없이 VIP 경험을 즐기세요.<br />
                    새로운 사람들과 함께하면 더 즐겁습니다.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={{
                        background: '#9d00ff',
                        color: 'white',
                        padding: '0.8rem 2rem',
                        borderRadius: '99px',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        + 새 모임 만들기 (Create Party)
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {parties.map(party => (
                    <PartyCard key={party.id} party={party} />
                ))}
            </div>
        </div>
    );
}
