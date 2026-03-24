import Image from 'next/image';

const photos = [
  { src: '/images/Real/9.jpg',  alt: 'Professional movers wrapping furniture in Miami high-rise elevator with city skyline view',   caption: 'High-rise move · Miami elevator' },
  { src: '/images/Real/8.jpg',  alt: 'EasyMove Elite moving truck and crew outside South Florida home during full residential move',  caption: 'Full move · South Florida community' },
  { src: '/images/Real/4.png',  alt: 'Furniture professionally wrapped in protective blankets and plastic before loading',            caption: 'White-glove furniture protection' },
  { src: '/images/Real/6.png',  alt: 'Neatly packed moving boxes organized and ready to load in South Florida home',                 caption: 'Packed & ready to load' },
  { src: '/images/Real/10.png', alt: 'Mover in white gloves carefully wrapping specialty item for safe transport',                   caption: 'White-glove wrap · specialty item' },
  { src: '/images/Real/1.png',  alt: 'Full-home packing job with boxes organized throughout Miami-Dade property',                   caption: 'Full-home packing · Miami-Dade' },
];

export default function WorkGallery() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Work</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal mb-3">
            Real Moves. Real Results.
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Every photo is from an actual job. No staging, no stock photography.
          </p>
        </div>

        {/* Grid — 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {photos.map((photo, idx) => (
            <div
              key={photo.src}
              className="relative overflow-hidden group aspect-[4/3]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority={idx < 3}
              />
              {/* Caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-white text-xs font-medium tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 text-xs mt-6">
          500+ completed moves across Miami-Dade, Broward &amp; Palm Beach Counties
        </p>

      </div>
    </section>
  );
}
