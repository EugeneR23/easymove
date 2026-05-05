/**
 * Embedded Google Map showing EasyMove Elite's GBP location.
 *
 * Local SEO signal: an embedded map of your own GBP (linked by place_id) on
 * your site is a strong NAP-consistency signal that Google uses when ranking
 * the business in Map Pack. It also:
 *   - increases time-on-page (pin interaction)
 *   - lets users tap "Open in Google Maps" → routes to your GBP, more session
 *     signals to Google
 *   - works without an API key in basic iframe form
 *
 * To upgrade to the official GBP-pinned embed (shows business card popup with
 * rating/photo on hover):
 *   1. Open https://www.google.com/maps
 *   2. Search "EasyMove Elite Hollywood FL" — find your verified profile
 *   3. Click Share → Embed a map → Copy HTML
 *   4. Replace the iframe src below with the `pb=...` URL Google provides
 */
export default function GoogleMapEmbed() {
  // Address-based embed — works without API key. Shows pin at our location.
  // For the richer GBP-card embed, follow the upgrade steps in the comment above.
  const mapSrc =
    'https://maps.google.com/maps?q=2130+Stirling+Rd,+Hollywood,+FL+33020&t=&z=11&ie=UTF8&iwloc=&output=embed';

  return (
    <div className="relative w-full overflow-hidden border border-gold/20 bg-charcoal">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold z-10" />
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
          Service Area
        </p>
        <a
          href="https://www.google.com/maps/place/?q=place_id:ChIJJcPs4dykvagR_uQxPaSlY_8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold/70 text-[10px] tracking-widest uppercase hover:text-gold transition-colors"
        >
          View on Google Maps ↗
        </a>
      </div>
      <iframe
        src={mapSrc}
        title="EasyMove Elite — South Florida service area map"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-72 md:h-80 border-0 grayscale-[15%]"
        allowFullScreen
      />
      <div className="px-5 py-4 text-xs text-gray-400 leading-relaxed border-t border-white/10">
        Based in Hollywood, FL · Serving Miami-Dade, Broward, and Palm Beach Counties
      </div>
    </div>
  );
}
