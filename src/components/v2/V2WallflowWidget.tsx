'use client';

import { useEffect, useRef } from 'react';

// Demo embed of the Wallflow wallpaper calculator widget.
// The iframe posts its content height via postMessage so we resize it
// instead of relying on a fixed height with inner scrolling.
export default function V2WallflowWidget() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'wallflow-calc-height' && frameRef.current) {
        frameRef.current.style.height = `${e.data.height}px`;
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <section className="bg-[#060608] border-t border-gold/15 relative">
      <div className="max-w-5xl mx-auto px-6 py-24 sm:py-32">
        <p className="text-gold text-[10px] sm:text-xs font-semibold tracking-[0.5em] uppercase mb-6 text-center">
          Widget Lab
        </p>
        <h2 className="text-white font-sans font-extrabold leading-[0.95] tracking-[-0.03em] text-4xl sm:text-6xl mb-12 text-center">
          WALLFLOW <span className="text-stroke-gold">CALCULATOR</span>
        </h2>
        <div className="bg-white overflow-hidden">
          <iframe
            ref={frameRef}
            src="https://www.wallflow.pro/embed/calculator?k=6c840ae6413880a66c90030c070327dc"
            width="100%"
            height={900}
            style={{ border: 0, display: 'block' }}
            scrolling="no"
            title="Wallpaper Calculator"
          />
        </div>
      </div>
    </section>
  );
}
