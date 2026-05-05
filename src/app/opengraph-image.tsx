import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'EasyMove Elite — Premium White-Glove Movers in South Florida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0F0F11',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Ambient gold radial glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -150,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.05) 40%, rgba(15,15,17,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.03) 50%, rgba(15,15,17,0) 75%)',
          }}
        />

        {/* Top gold bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              'linear-gradient(90deg, transparent 0%, #C9A84C 25%, #E5C26B 50%, #C9A84C 75%, transparent 100%)',
          }}
        />

        {/* Subtle grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '70px 80px',
            height: '100%',
            width: '100%',
          }}
        >
          {/* Top row: Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 14,
                height: 14,
                background: '#C9A84C',
                transform: 'rotate(45deg)',
                display: 'flex',
              }}
            />
            <span
              style={{
                color: '#C9A84C',
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 8,
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
              }}
            >
              EasyMove Elite
            </span>
          </div>

          {/* Middle: Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div
              style={{
                color: '#C9A84C',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 6,
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
                display: 'flex',
              }}
            >
              South Florida · Founder-Led · Fully Insured
            </div>
            <div
              style={{
                fontSize: 76,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.05,
                letterSpacing: -1.5,
                maxWidth: 980,
                display: 'flex',
              }}
            >
              Premium White-Glove
              <br />
              Movers in <span style={{ color: '#C9A84C' }}>Miami</span>
            </div>
            <div
              style={{
                fontSize: 26,
                color: '#A8A8AC',
                lineHeight: 1.4,
                maxWidth: 880,
                fontFamily: 'sans-serif',
                fontWeight: 400,
                display: 'flex',
              }}
            >
              Miami · Fort Lauderdale · Boca Raton — no subcontractors,
              no surprise fees, real coordinator on every move.
            </div>
          </div>

          {/* Bottom row: badges + URL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(201,168,76,0.18)',
              paddingTop: 28,
            }}
          >
            <div style={{ display: 'flex', gap: 14 }}>
              {['Licensed & Insured', 'COI in 24h', '786-305-1844'].map((b) => (
                <div
                  key={b}
                  style={{
                    border: '1px solid rgba(201,168,76,0.35)',
                    color: '#C9A84C',
                    padding: '10px 18px',
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    fontFamily: 'sans-serif',
                    display: 'flex',
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 1,
                fontFamily: 'sans-serif',
                display: 'flex',
              }}
            >
              easy-move-florida.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
