/**
 * Verbatim client reviews, copied word-for-word from the live Thumbtack
 * profile on 2026-09-05 (rating 4.7 across 33 reviews at that check — the
 * current numbers live in credentials.ts THUMBTACK, never here).
 *
 * These are quotes, not testimonials we wrote: do not edit the text, fix the
 * grammar, or trim beyond the ellipsis already marked. A quote that stops
 * matching the source page is worse than no quote. Reviews are about the
 * company, not about any one city — city pages must label them as company
 * reviews rather than implying the move happened in that city.
 */
export interface ThumbtackQuote {
  author: string;
  date: string;
  service: string;
  text: string;
}

export const THUMBTACK_QUOTES: ThumbtackQuote[] = [
  {
    author: 'Timothy E.',
    date: 'March 2026',
    service: 'Packing and Unpacking',
    text: 'Eugene and his team provided an exceptional moving experience. They were punctual, equipped with all necessary supplies, and handled my belongings with care. … He even expertly problem-solved getting large furniture pieces into my new building’s elevator.',
  },
  {
    author: 'Tatiana R.',
    date: 'January 2026',
    service: 'Local Moving',
    text: 'The team arrived on time, worked fast and carefully, and handled all my furniture with care. Clear pricing, no surprises, very professional service. Would definitely hire them again and recommend to anyone looking for reliable movers.',
  },
  {
    author: 'Briyanna L.',
    date: 'January 2026',
    service: 'Local Moving',
    text: 'Absolutely great company! They moved my 1 bedroom in under 3 hours. Very reasonable pricing. Would recommend again …',
  },
  {
    author: 'Ebony T.',
    date: 'February 2026',
    service: 'Packing and Unpacking',
    text: 'The guys were GREAT! They arrived on time and went to work. Literally the easiest time I’ve had “packing” for a move… ever. I will certainly use them again and recommend to everyone I know.',
  },
  {
    author: 'Gina S.',
    date: 'April 2026',
    service: 'Local Moving',
    text: 'Absolutely fantastic experience moving with you!! Very punctual, organized, and made the whole experience alot easier than I thought it would. Thank you so much!! Highly recommend!',
  },
];
