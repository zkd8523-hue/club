import Hero from "@/components/features/Hero";
import HotDeals from "@/components/features/HotDeals";
import Auction from "@/components/features/Auction";
import ClubCard from "@/components/features/ClubCard";
import { clubs } from "@/data/clubs";

export default function Home() {
  // Use real data to satisfy the ClubCard component types
  const featuredClubs = clubs.slice(0, 4);

  return (
    <div id="home">
      <Hero />
      <HotDeals />
      <div id="auction">
        <Auction />
      </div>

      <section className="container" style={{ padding: '4rem 1.5rem', marginTop: '-50px', position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          fontWeight: '700'
        }}>
          오늘의 추천 클럽 (Trending) <span style={{ color: 'var(--primary)', fontSize: '0.6em', verticalAlign: 'middle', marginLeft: '0.5rem' }}>🔥</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {featuredClubs.map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>

      <section id="party-section" style={{ background: 'var(--card-bg)', padding: '4rem 0', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                함께하면 더 즐거운 파티.<br />조각(N-Pay)으로 부담없이.
              </h2>
              <p style={{ color: '#aaa', marginBottom: '2rem', lineHeight: '1.6' }}>
                혼자 가기 망설여지거나 가격이 부담되시나요? <br />
                '파티 조각' 기능을 통해 마음 맞는 사람들과 테이블을 공유하고 비용을 나눠보세요.
              </p>
              <button style={{
                background: 'white',
                color: 'black',
                padding: '1rem 2rem',
                borderRadius: '99px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer'
              }}>파티 찾기 (Find Party)</button>
            </div>
            <div style={{
              flex: 1,
              minWidth: '300px',
              height: '300px',
              background: 'linear-gradient(135deg, rgba(157,0,255,0.2), rgba(255,0,85,0.2))',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)'
            }}>
              Feature Visual (Party Mode)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
