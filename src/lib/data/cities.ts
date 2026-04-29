export interface CityData {
  slug: string;
  name: string;
  state: string;
  county: string;
  heroHeadline: string;
  heroSub: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  neighborhoods: string[];
  localFacts: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const CITIES: CityData[] = [
  {
    slug: 'miami-movers',
    name: 'Miami',
    state: 'FL',
    county: 'Miami-Dade',
    heroHeadline: "Miami's White-Glove Moving Company",
    heroSub: 'Brickell · Coral Gables · Miami Beach · Coconut Grove',
    heroImage: '/images/Real/Miami.jpg',
    metaTitle: 'Miami Movers — EasyMove Elite | White-Glove Moving in Miami, FL',
    metaDescription:
      'Licensed & insured movers in Miami, FL. High-rise specialists serving Brickell, Coral Gables, Miami Beach & Coconut Grove. Founder-led, COI available. Call 786-305-1844.',
    intro:
      "Moving in Miami means navigating some of the most demanding logistics in the country — Brickell's loading dock windows, Coral Gables HOA requirements, South Beach elevator reservations, and I-95 at the wrong hour. EasyMove Elite was built in Miami-Dade and every crew we send is briefed on your building before they arrive.",
    neighborhoods: [
      'Brickell', 'Coral Gables', 'Coconut Grove', 'Miami Beach', 'South Beach',
      'Wynwood', 'Edgewater', 'Midtown', 'Downtown Miami', 'Aventura',
      'Sunny Isles Beach', 'Kendall', 'Doral', 'Cutler Bay',
    ],
    localFacts: [
      {
        title: 'High-Rise & Condo Specialists',
        body: 'We move clients in and out of Miami\'s most demanding buildings — from Brickell City Centre residences to South Beach penthouses. We handle elevator reservations, loading dock scheduling, and COI issuance so you don\'t have to.',
      },
      {
        title: 'COI Issued Within 24 Hours',
        body: 'Miami-Dade condo buildings require a Certificate of Insurance before any move begins. We issue COIs within 24 hours of your confirmed date — addressed to your building management exactly as required.',
      },
      {
        title: 'Coral Gables & Grove HOAs',
        body: 'Historic neighborhoods come with strict move-in windows and permit requirements. Our coordinator handles all paperwork and arrival coordination before your move day.',
      },
    ],
    faqs: [
      {
        q: 'Do you move in and out of Brickell high-rises?',
        a: 'Yes — Brickell is one of our most common service areas. We\'re familiar with loading dock requirements, elevator reservations, and COI formats for major buildings including SLS, ICON, and Brickell Heights.',
      },
      {
        q: 'How quickly can you issue a COI for my building?',
        a: 'Typically within 24 hours of your confirmed move date. Send us your building management\'s COI requirements and we handle the rest.',
      },
      {
        q: 'Do you move to and from Miami Beach?',
        a: 'Absolutely. South Beach, Mid-Beach, and North Beach are all covered. We work within building move-in windows and coordinate parking permits when needed.',
      },
      {
        q: 'What areas of Miami-Dade do you serve?',
        a: 'All of Miami-Dade County — from Aventura in the north to Homestead in the south, and everywhere in between including Coral Gables, Coconut Grove, Wynwood, Doral, and Kendall.',
      },
    ],
  },
  {
    slug: 'fort-lauderdale-movers',
    name: 'Fort Lauderdale',
    state: 'FL',
    county: 'Broward',
    heroHeadline: "Fort Lauderdale's Trusted Moving Company",
    heroSub: 'Las Olas · Victoria Park · Wilton Manors · Plantation',
    heroImage: '/images/Real/Fort-Lauderdale.jpg',
    metaTitle: 'Fort Lauderdale Movers — EasyMove Elite | Licensed & Insured',
    metaDescription:
      'Licensed & insured movers in Fort Lauderdale & Broward County. Serving Las Olas, Victoria Park, Wilton Manors & all of Broward. Founder-led, COI available.',
    intro:
      "Fort Lauderdale's mix of waterfront estates, mid-rise condos, and historic bungalows each require different expertise. EasyMove Elite has served Broward County clients across every neighborhood — from Las Olas Boulevard high-rises to Plantation family homes — with the same crew, the same standards, and direct access to the founder.",
    neighborhoods: [
      'Las Olas', 'Victoria Park', 'Wilton Manors', 'Lauderdale-by-the-Sea',
      'Hollywood', 'Hallandale Beach', 'Deerfield Beach', 'Pompano Beach',
      'Plantation', 'Davie', 'Weston', 'Cooper City', 'Miramar',
    ],
    localFacts: [
      {
        title: 'Waterfront & Marina Properties',
        body: "Fort Lauderdale's waterfront homes and condos often require specialized equipment and routing. We're experienced with dock access, narrow drives, and the building requirements common to Las Olas-area high-rises.",
      },
      {
        title: 'Broward HOA Compliance',
        body: 'Many Broward communities — from Weston to Cooper City — have strict move-in windows, elevator reservations, and insurance requirements. We confirm all details with your HOA before arrival.',
      },
      {
        title: 'Convenient Staging for Long-Distance',
        body: "Fort Lauderdale is a common staging point for moves up I-95 or across the state. We coordinate temporary storage and schedule long-distance pickups efficiently from Broward County.",
      },
    ],
    faqs: [
      {
        q: 'Do you serve all of Broward County?',
        a: 'Yes — from Hollywood and Hallandale Beach in the south to Deerfield Beach and Pompano Beach in the north, and inland through Plantation, Davie, Weston, and Cooper City.',
      },
      {
        q: 'Can you handle waterfront property moves in Fort Lauderdale?',
        a: "Yes. We're experienced with the logistics of waterfront and marina-adjacent properties, including limited dock access, narrow drives, and building requirements specific to Las Olas-area towers.",
      },
      {
        q: 'Do you offer storage near Fort Lauderdale?',
        a: 'We offer premium short-term and monthly storage as an add-on. It\'s useful for staging between closings or when your new home isn\'t move-in ready.',
      },
      {
        q: 'How do you handle HOA move-in requirements in Broward?',
        a: 'Our coordinator confirms COI formats, move-in window times, elevator reservations, and any permits with your HOA before your move date — at no additional charge.',
      },
    ],
  },
  {
    slug: 'boca-raton-movers',
    name: 'Boca Raton',
    state: 'FL',
    county: 'Palm Beach',
    heroHeadline: 'Boca Raton\'s Luxury Moving Specialists',
    heroSub: 'East Boca · Mizner Park · Boca West · Delray Beach',
    heroImage: '/images/Real/Boca-Raton.jpg',
    metaTitle: 'Boca Raton Movers — EasyMove Elite | Luxury Moving Services',
    metaDescription:
      'Premium movers in Boca Raton & Palm Beach County. Estate and gated community specialists serving Boca West, Mizner Park & Delray Beach. Fully insured. Call 786-305-1844.',
    intro:
      "Boca Raton's gated communities, estate homes, and luxury condos demand a level of care that most moving companies simply cannot provide. EasyMove Elite specializes in high-value residential moves throughout Palm Beach County — with crews trained in fine art handling, furniture protection, and the discretion that Boca Raton clients expect.",
    neighborhoods: [
      'East Boca Raton', 'Mizner Park', 'Royal Palm Yacht & Country Club', 'Boca West',
      'Broken Sound', 'Delray Beach', 'Boynton Beach', 'Lake Worth',
      'Wellington', 'Palm Beach Gardens', 'West Palm Beach',
    ],
    localFacts: [
      {
        title: 'Estate & Luxury Home Specialists',
        body: "Boca Raton's estates often contain fine art, antiques, custom furniture, and high-value collections. Every item is inventoried, wrapped to our standard, and handled by experienced movers — not day laborers.",
      },
      {
        title: 'Gated Community Expertise',
        body: 'Communities like Boca West, Broken Sound, and Royal Palm require advance vehicle registration, crew ID verification, and strict move windows. We manage all of this before your crew arrives.',
      },
      {
        title: 'Discretion & Privacy',
        body: "Many of our Palm Beach County clients include executives, collectors, and families who value privacy. We operate with full confidentiality and never disclose client information.",
      },
    ],
    faqs: [
      {
        q: 'Do you move within gated communities in Boca Raton?',
        a: 'Yes — Boca West, Broken Sound, Royal Palm, and similar communities are familiar to us. We register vehicles and crew in advance, provide required insurance certificates, and work within your community\'s move windows.',
      },
      {
        q: 'Do you handle fine art and antiques?',
        a: 'Yes. Fine art and antique handling is a dedicated service. Items are crated or wrapped to museum standard, inventoried with photos, and transported with the additional care they require.',
      },
      {
        q: 'Do you serve Delray Beach and Palm Beach Gardens?',
        a: 'Yes — all of Palm Beach County is within our service area, including Delray Beach, Boynton Beach, Lake Worth, Wellington, Palm Beach Gardens, and West Palm Beach.',
      },
      {
        q: 'Can you move a large estate in one day?',
        a: "It depends on the size and complexity of the move. We'll give you a realistic timeline in your written estimate — some estate moves are one day, others benefit from a pre-pack day. We don't rush jobs to fit a number.",
      },
    ],
  },
];

export function getCityData(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
