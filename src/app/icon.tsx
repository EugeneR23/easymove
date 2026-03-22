import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0b0b',
        }}
      >
        {/* Gold top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: '#d4a017',
          }}
        />
        {/* EME letters */}
        <div
          style={{
            color: '#d4a017',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
            fontFamily: 'serif',
          }}
        >
          EME
        </div>
      </div>
    ),
    { ...size },
  );
}
