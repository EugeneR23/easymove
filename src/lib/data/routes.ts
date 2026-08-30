/**
 * Long-distance route price bands — the ONE place they live.
 *
 * These bands render on /pricing, on each /moving-<route> page, and in
 * llms.txt. They used to be a const inside the pricing page; the moment route
 * pages existed, the same table in two files would drift, and a price that
 * disagrees between two pages is the exact class of bug this repo has been
 * burned by before.
 *
 * Every job starts at the $1,500 interstate minimum — no cell may sit below it.
 * [TODO: confirm with Evgenii] these route ranges are estimates, not booked-job
 * data. `slug` links a band to its route page; a band with no page yet simply
 * has no slug consumer.
 */
export interface RouteBand {
  slug: string;
  route: string;
  studio: string;
  oneBr: string;
  twoBr: string;
  threeBr: string;
}

export const DISTANCE_ROUTES: RouteBand[] = [
  { slug: 'moving-miami-to-orlando',       route: 'Miami → Orlando',       studio: '$1,500–$1,800', oneBr: '$1,600–$2,200', twoBr: '$2,200–$2,900', threeBr: '$3,000–$4,200' },
  { slug: 'moving-miami-to-tampa',         route: 'Miami → Tampa',         studio: '$1,500–$1,700', oneBr: '$1,500–$2,100', twoBr: '$2,100–$2,800', threeBr: '$2,800–$4,000' },
  { slug: 'moving-miami-to-jacksonville',  route: 'Miami → Jacksonville',  studio: '$1,600–$2,200', oneBr: '$1,900–$2,600', twoBr: '$2,600–$3,500', threeBr: '$3,500–$5,000' },
  { slug: 'moving-miami-to-atlanta',       route: 'Miami → Atlanta',       studio: '$2,200–$3,000', oneBr: '$2,800–$3,800', twoBr: '$3,800–$5,200', threeBr: '$5,200–$7,500' },
  { slug: 'moving-miami-to-new-york',      route: 'Miami → New York',      studio: '$2,800–$3,800', oneBr: '$3,600–$4,800', twoBr: '$4,800–$6,500', threeBr: '$6,500–$9,500' },
  { slug: 'moving-miami-to-boston',        route: 'Miami → Boston',        studio: '$3,000–$4,000', oneBr: '$3,800–$5,100', twoBr: '$5,100–$6,900', threeBr: '$6,900–$10,000' },
  { slug: 'moving-miami-to-washington-dc', route: 'Miami → Washington DC', studio: '$2,500–$3,400', oneBr: '$3,100–$4,200', twoBr: '$4,200–$5,700', threeBr: '$5,700–$8,300' },
  { slug: 'moving-hollywood-to-charlotte', route: 'Hollywood → Charlotte', studio: '$2,000–$2,700', oneBr: '$2,500–$3,400', twoBr: '$3,400–$4,600', threeBr: '$4,600–$6,700' },
];

export const bandForSlug = (slug: string): RouteBand | undefined =>
  DISTANCE_ROUTES.find((r) => r.slug === slug);
