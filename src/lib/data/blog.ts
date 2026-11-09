/**
 * Blog content for Easy Move Florida.
 *
 * SEO/GEO foundation: long-tail informational queries that prospects search
 * BEFORE booking a mover. Each post targets a specific question + city
 * combination ("brickell condo move checklist", "miami moving cost 2026").
 *
 * Content lives here (not in MDX) for simplicity — small post count, type-safe,
 * no MDX runtime needed. Migrate to MDX later if post count grows past ~15.
 */

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  readTime: string;
  category: 'Moving Guide' | 'Pricing' | 'High-Rise' | 'Local' | 'Long-Distance' | 'Specialty' | 'Russian-Speaking';
  heroImage: string;
  /** Body as ordered blocks. Each renders to a section. */
  body: BlogBlock[];
  /** Related posts (slugs). */
  related?: string[];
}

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title: string; text: string }
  | { type: 'quote'; text: string; cite?: string };

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'brickell-condo-move-checklist',
    title: 'The Complete Brickell Condo Move Checklist (2026)',
    metaTitle: 'Brickell Condo Move Checklist 2026 — COI & Elevator | Easy Move Florida',
    metaDescription: 'Step-by-step Brickell condo move checklist: COI requirements, elevator reservations, loading dock windows, building management contacts. From a Miami mover.',
    excerpt: 'Moving into a Brickell high-rise involves more than packing boxes. Here are the requirements, deadlines and documents to ask your building for before move day.',
    publishedAt: '2026-04-22',
    updatedAt: '2026-11-09',
    author: 'Eugene Romanov',
    readTime: '9 min',
    category: 'High-Rise',
    heroImage: '/images/Real/Miami.jpg',
    body: [
      { type: 'p', text: 'Moving into a Brickell condo is unlike any other move in South Florida. The buildings are dense, the loading docks are scheduled to the minute, and every building has its own paperwork — COI requirements, elevator reservations, parking permits, and approved move-in windows. Miss one requirement and your crew gets turned away at the dock with the truck loaded and the meter running.' },
      { type: 'p', text: 'This is the checklist for a Brickell condo move. If you\'re moving in or out of a Brickell building yourself, work through this 2 weeks before your move date.' },

      { type: 'h2', text: '1. Confirm your building\'s COI requirements (do this first)' },
      { type: 'p', text: 'Every Brickell condo building requires a Certificate of Insurance (COI) from your moving company before allowing the move. The COI must name your building (or building management company) as additional insured, with specific liability limits.' },
      { type: 'p', text: 'Common Brickell COI requirements:' },
      { type: 'ul', items: [
        // [TODO: confirm exact building COI limits with Evgenii]
        'General liability: commonly $1M, but each building sets its own limit, so confirm your building\'s figure in writing',
        'Workers compensation coverage included',
        'Auto liability for moving truck',
        'Building management named as "additional insured" with exact spelling',
        'Specific dates of move included on certificate',
      ]},
      { type: 'p', text: 'Get your building\'s COI requirements in writing from your building manager or move-in coordinator. Forward to your mover. Reputable movers issue COI within 24 hours, free of charge.' },

      { type: 'h2', text: '2. Reserve the freight elevator' },
      { type: 'p', text: 'Each building sets its own freight elevator booking rules and move windows. Ask the management office for the available windows as soon as your move date is fixed.' },
      { type: 'callout', title: 'Insider tip', text: 'If your building offers Tuesday or Wednesday move-in slots, take them. Competition for elevator windows is much lower midweek, and your move will go faster because the freight elevator isn\'t shared with other movers.' },

      { type: 'h2', text: '3. Confirm loading dock access' },
      { type: 'p', text: 'Loading dock access differs from building to building. Some towers have a dock that has to be reserved through building management, and some older buildings load from the curb on an adjacent street.' },
      { type: 'p', text: 'Ask your mover to confirm the dock procedure with building management before move day, in writing.' },

      { type: 'h2', text: '4. Check parking and street permits' },
      { type: 'p', text: 'Where the truck has to load from the curb, street parking for it has to be arranged with the city\'s parking authority ahead of time.' },

      { type: 'h2', text: '5. Schedule around quiet hours' },
      { type: 'p', text: 'Each building sets its own move days and hours. Confirm your building\'s quiet hours and move hours before booking.' },

      { type: 'h2', text: '6. Pack and label by room' },
      { type: 'p', text: 'In a high-rise move, the difference between an efficient move and a slow one is labeling. Crews can\'t guess where boxes go in a 38th-floor unit they\'ve never seen. Label every box with destination room ("Master BR", "Kitchen", "Office") so the crew can place them correctly the first time without asking.' },

      { type: 'h2', text: '7. Plan for elevator wait times' },
      { type: 'p', text: 'Even with a freight elevator reservation, expect 5-15 minutes of wait time per loaded trip. Plan accordingly, because your crew bills hourly.' },

      { type: 'h2', text: '8. Final walk-through with the building' },
      { type: 'p', text: 'After your move, your building manager typically does a walk-through to check for damage to common areas (lobby floors, elevator pads, hallways). A good moving company will be there for this walk-through, not gone the moment the truck leaves.' },

      { type: 'h2', text: 'What we do for a Brickell move' },
      { type: 'p', text: 'Easy Move Florida takes condo moves across Brickell. For each one we ask building management for its COI template, dock procedure and elevator reservation process in writing, and work to them.' },

      { type: 'callout', title: 'Need a quote for your Brickell move?', text: 'Call 786-305-1844 or get a free written estimate online. We\'ll handle the COI, elevator reservation, and loading dock coordination so you don\'t have to.' },
    ],
    related: ['miami-moving-cost-2026', 'what-is-coi-condo-move'],
  },

  {
    slug: 'miami-moving-cost-2026',
    title: 'How Much Does a Move in Miami Cost in 2026? (Real Pricing Breakdown)',
    metaTitle: 'Miami Moving Cost 2026 — Local & Long-Distance Prices | Easy Move Florida',
    metaDescription: 'Real Miami moving costs in 2026: hourly rates, studio to 4-bedroom prices, long-distance, high-rise add-ons. From a Miami mover, no fluff.',
    excerpt: 'What does a move actually cost in Miami in 2026? Here are the real numbers for studios, 1-bedrooms, 2-bedrooms, high-rises, and long-distance — straight from a working mover.',
    publishedAt: '2026-04-12',
    updatedAt: '2026-11-09',
    author: 'Eugene Romanov',
    readTime: '7 min',
    category: 'Pricing',
    heroImage: '/images/Real/Fort-Lauderdale.jpg',
    body: [
      { type: 'p', text: 'If you\'ve searched "moving cost Miami" you\'ve probably found a dozen calculators that ask for your zip code and email and then hit you with a price 30-50% lower than what the move actually costs. There\'s a reason for that: lead-gen calculators are designed to get you on the phone with a sales team, not give you accurate pricing.' },
      { type: 'p', text: 'Here\'s what moves in Miami actually cost in 2026, based on what we charge and what other reputable Miami movers charge.' },

      { type: 'h2', text: 'How Miami movers price local moves' },
      { type: 'p', text: 'Almost all reputable Miami movers price local moves (anything under 50 miles) on an hourly basis with a 3-hour minimum. The hourly rate covers the crew (2 or 3 movers) and the equipment, and the truck is usually its own fee. Materials (boxes, paper, tape) are usually billed separately or included if you book a full pack.' },

      { type: 'p', text: 'Typical Miami hourly rates in 2026:' },
      { type: 'ul', items: [
        '2-mover crew: $99–$149/hour depending on company',
        '3-mover crew: $139–$199/hour',
        '4-mover crew: $179–$249/hour',
        'Truck fee: $79–$179 per move (one-time, varies by truck size)',
        'Materials: $30–$200+ depending on what you need',
      ]},
      { type: 'p', text: 'For comparison: Easy Move Florida charges $129/hour for 2 movers, $179/hour for 3, and a truck fee per day charged at the crew rate ($129 with 2 movers, $179 with 3) as a separate line item — fuel, tolls, and mileage are included, with no fuel surcharge.' },

      { type: 'h2', text: 'Real Miami move totals by home size' },
      { type: 'p', text: 'These ranges are hours × hourly rate plus the truck, assuming a 5-15 mile distance, easy access, and standard furniture.' },
      { type: 'h3', text: 'Studio apartment' },
      { type: 'p', text: 'Range: $516–$645 all-in (hours × rate, plus the truck at that same crew rate). Typical: 3-4 hours, 2 movers, basic furniture (bed, dresser, sofa, dining set, ~10-20 boxes).' },
      { type: 'h3', text: '1-bedroom apartment' },
      { type: 'p', text: 'Range: $516–$774. Typical: 3-5 hours, 2 movers, standard furniture, ~25-40 boxes.' },
      { type: 'h3', text: '2-bedroom apartment or condo' },
      { type: 'p', text: 'Range: $645–$1,253. Typical: 4-6 hours, 2-3 movers, ~50-80 boxes.' },
      { type: 'h3', text: '3-bedroom home or condo' },
      { type: 'p', text: 'Range: $1,253–$1,611. Typical: 6-8 hours, 3 movers, ~80-130 boxes.' },
      { type: 'h3', text: '4-bedroom home' },
      { type: 'p', text: 'Range: $1,611–$2,327+. Typical: 8-12 hours, 3-4 movers, often spans 2 days for larger homes.' },

      { type: 'h2', text: 'Add-ons that change the price' },
      { type: 'p', text: 'The base hourly rate is the floor. Several factors increase the total:' },
      { type: 'ul', items: [
        'High-rise / condo move: add 30-90 minutes for elevator and dock wait times',
        'No elevator (3rd floor walk-up): add 25-40% to hourly time',
        'Long carry from truck to door (>75 feet): add 20-40 minutes',
        'Packing service (full pack): add 25-40% of move cost',
        'Disassembly/reassembly of complex furniture (Murphy beds, modular wall units, heavy safes): hourly time applies',
        'Heavy items (piano, safe, marble piece): a separate line on the estimate, agreed before you book',
        'Weekend or after-hours: many companies add a 15-25% premium (Easy Move Florida does not — the rate you book is locked, any day of the week)',
        'Distance over 30 miles: many companies add a fuel or travel charge (often $1.50-$2.50 per mile). Easy Move Florida does not: the drive between your two addresses is on the clock at the same hourly rate',
      ]},

      { type: 'h2', text: 'Long-distance moves from Miami' },
      { type: 'p', text: 'Long-distance moves (over 50 miles) are quoted per job, not hourly. Easy Move Florida moves anywhere inside Florida and sends the figure in writing within 24 hours. It depends on distance, total volume and access at both ends, and we publish no range for it.' },
      { type: 'p', text: 'We do not move household goods across a state line. For a move to New York, Atlanta or Boston we refer you to a licensed interstate carrier, and we can still pack your home before their truck arrives.' },

      { type: 'h2', text: 'Red flags to watch for' },
      { type: 'p', text: 'Some Miami movers quote suspiciously low prices to win the booking, then raise the price on move day. Watch for:' },
      { type: 'ul', items: [
        'Quotes given without an in-person or video walk-through (especially for moves over $1,500)',
        'Hourly rates well below the market range ($69-$79/hr for 2 movers in Miami in 2026 is below cost)',
        'Required cash deposits over $200',
        'No written estimate provided',
        'No COI offered for condo buildings (means they\'re uninsured or unable to comply)',
        '"Volume-based" pricing without a specific cubic foot estimate',
      ]},

      { type: 'callout', title: 'Get a real Miami moving estimate', text: 'Easy Move Florida gives written estimates, no deposit required. Call 786-305-1844 or fill out the online quote form for a written estimate within 24 hours.' },
    ],
    related: ['brickell-condo-move-checklist', 'what-is-coi-condo-move'],
  },

  {
    slug: 'what-is-coi-condo-move',
    title: 'What is a COI and Why Your Miami Condo Building Requires One',
    metaTitle: 'COI for Miami Condo Moves — Quick Guide | Easy Move Florida',
    metaDescription: 'COI explained: what a Certificate of Insurance is, why Miami condo buildings require it, what it should include, and how to get one within 24 hours.',
    excerpt: 'Your Miami condo building wants a COI from your mover. What is it, what should it include, and how do you make sure you have it on time?',
    publishedAt: '2026-04-02',
    updatedAt: '2026-07-30',
    author: 'Eugene Romanov',
    readTime: '5 min',
    category: 'High-Rise',
    heroImage: '/images/Real/4.png',
    body: [
      { type: 'p', text: 'If you\'re moving into a Miami condo building, you\'ve probably heard the term "COI" from your building\'s move-in coordinator. They want it from your moving company before they\'ll let any move happen. Without it, your crew gets turned away at the loading dock with the truck loaded and the meter running. Here\'s what a COI actually is and how to make sure you have one in time.' },

      { type: 'h2', text: 'COI = Certificate of Insurance' },
      { type: 'p', text: 'A Certificate of Insurance (COI) is a one-page document from a moving company\'s insurance carrier that proves the mover has active liability insurance. It names your specific building (or building management company) as an "additional insured" on the mover\'s policy — meaning your building is protected if the mover damages common areas (elevators, hallways, lobbies) during the move.' },

      { type: 'h2', text: 'Why your building requires it' },
      { type: 'p', text: 'Miami condo buildings have learned (often the hard way) that uninsured moving companies cause expensive damage to lobbies, elevator interiors, and hallway walls — and then disappear without paying. A COI guarantees that if your mover causes damage, the building can claim against the mover\'s policy without the building itself absorbing the cost.' },
      { type: 'p', text: 'Almost every condo building in Miami-Dade, Broward, and Palm Beach Counties requires COI. The few that don\'t are typically older buildings (1970s and earlier) or single-family condo conversions.' },

      { type: 'h2', text: 'What a COI must include' },
      { type: 'p', text: 'Your building will provide specific COI requirements. Common ones in South Florida:' },
      { type: 'ul', items: [
        'General liability insurance: $1M minimum (some buildings require $2M)',
        'Auto liability for moving vehicles',
        'Workers compensation coverage',
        'Your building (or management company) named as "additional insured" with exact spelling',
        'Specific dates of the move included',
        'Carrier signature and date of issue',
      ]},

      { type: 'h2', text: 'How to get a COI for your move' },
      { type: 'ol', items: [
        'Get your building\'s COI requirements in writing from your move-in coordinator or building manager',
        'Forward those requirements to your moving company',
        'Reputable movers issue COI within 24 hours of receiving requirements, free of charge',
        'Confirm with your building that they\'ve received and approved the COI before move day',
        'Keep a copy on move day in case the dock manager needs to verify',
      ]},

      { type: 'h2', text: 'Red flags' },
      { type: 'p', text: 'If a moving company can\'t or won\'t provide a COI, that\'s a serious red flag — they\'re likely uninsured. An uninsured mover puts you on the hook for any damage they cause, both to your goods and to the building. Walk away from any quote where the mover hesitates on COI.' },
      { type: 'p', text: 'Ask whether the mover charges to issue a COI. We issue it free of charge.' },

      { type: 'h2', text: 'When to request your COI' },
      { type: 'p', text: 'Best practice: forward building requirements to your mover the day you book. Confirm with your building 5-7 days before move date. Some buildings\' approval processes can take 3-5 business days, so don\'t wait until the week of your move.' },

      { type: 'callout', title: 'Need a COI for your condo move?', text: 'Easy Move Florida issues COI within 24 hours of confirmed booking, free, addressed exactly to your building\'s requirements. Call 786-305-1844 to get started.' },
    ],
    related: ['brickell-condo-move-checklist', 'miami-moving-cost-2026'],
  },

  // ─── Long-tail post #4: How to choose a Miami mover ──────────────────────
  {
    slug: 'how-to-choose-moving-company-miami',
    title: 'How to Choose a Moving Company in Miami (Without Getting Burned)',
    metaTitle: 'How to Choose a Miami Moving Company 2026 — Red Flags | Easy Move Florida',
    metaDescription: 'How to vet a Miami moving company: licenses to verify, red flags to spot, 7 questions every legitimate mover answers. From a working mover.',
    excerpt: 'Some Miami movers add hundreds in surprise fees on move day. Some don\'t exist next month. Here\'s how to tell who\'s real before you book.',
    publishedAt: '2026-04-30',
    updatedAt: '2026-11-09',
    author: 'Eugene Romanov',
    readTime: '8 min',
    category: 'Moving Guide',
    heroImage: '/images/Real/2.png',
    body: [
      { type: 'p', text: 'Miami has hundreds of moving companies. A handful are excellent. Most are average. A meaningful number are scams or one-truck operations that disappear within a year. The difference between a good move and a nightmare is which one you booked — and you can usually tell which is which in 15 minutes of due diligence before signing anything.' },
      { type: 'p', text: 'Here\'s exactly how to vet a Miami mover before you book.' },

      { type: 'h2', text: '1. Verify the licenses actually exist' },
      { type: 'p', text: 'Every legal moving company in Florida must have two registrations. Both are public and take 30 seconds to check.' },
      { type: 'h3', text: 'For local moves (within Florida)' },
      { type: 'p', text: 'Florida Intrastate Mover (IM) registration through FDACS (Florida Department of Agriculture and Consumer Services). Search at csapp.800helpfla.com — you\'re looking for an active IM number under the company name.' },
      { type: 'h3', text: 'For interstate moves (out of Florida)' },
      { type: 'p', text: 'USDOT and MC numbers through FMCSA (Federal Motor Carrier Safety Administration). Search at safer.fmcsa.dot.gov — you\'re looking for active "Authorized for Property" status with motor carrier authority.' },
      { type: 'callout', title: 'What to look for', text: 'Whatever number a company gives you, verify it on the actual government site, not on their website.' },

      { type: 'h2', text: '2. Confirm the company is actually local' },
      { type: 'p', text: 'Some "Miami movers" are just lead-gen sites that sell your contact info to a network of unknown companies. You call expecting one company; a different truck shows up on move day.' },
      { type: 'p', text: 'How to spot it:' },
      { type: 'ul', items: [
        'Check Google Maps — does the company have a verified Business Profile with photos of their actual trucks and crew, or just a stock photo and a logo?',
        'Look at the contact page — is there a real local phone number (305, 786, 954)? Is there an actual address (or service area for SAB)?',
        'Search the company name on Reddit, Yelp, BBB — long-time local companies have a track record. Lead-gen middlemen don\'t.',
        'Check the website — does it look like the company runs it (real photos, founder info, team)? Or is it a generic template with stock photos?',
      ]},

      { type: 'h2', text: '3. Get an in-person or video walk-through' },
      { type: 'p', text: 'For any move over $1,500, insist on an in-person or video walk-through before booking. Quotes given over the phone or via web form alone are routinely 30-50% lower than what the move actually costs — because the mover doesn\'t know what you actually have.' },
      { type: 'p', text: 'On move day, the same mover that quoted you $800 looks at your loaded apartment and says "this is a $1,400 job, sign here or we leave." That\'s the bait-and-switch playbook. An in-person estimate eliminates it.' },

      { type: 'h2', text: '4. Demand a written estimate before booking' },
      { type: 'p', text: 'A real moving company sends you a written estimate that includes:' },
      { type: 'ul', items: [
        'Hourly rate or flat-rate amount',
        'Estimated duration (for hourly moves)',
        'Crew size',
        'Truck fee',
        'Materials cost (if you\'re booking packing or supplies)',
        'Any building-specific or distance surcharges',
        'Total estimated cost',
        'Cancellation policy',
      ]},
      { type: 'p', text: 'If a mover refuses to put numbers in writing — walk away. "We\'ll figure it out on move day" is how surprise charges happen.' },

      { type: 'h2', text: '5. Don\'t pay a large deposit' },
      { type: 'p', text: 'Reputable movers in Miami don\'t require deposits at all, or require small ones ($50-$200) for booking confirmation. If a company demands $500+ upfront — especially in cash, Zelle, or wire transfer — that\'s a major red flag. Scammers collect deposits and disappear.' },
      { type: 'p', text: 'Standard practice: pay 50% on completion of loading, 50% on completion of unloading, by credit card or check. Cash should be optional, never required.' },

      { type: 'h2', text: '6. Confirm COI capability' },
      { type: 'p', text: 'If you\'re moving into or out of any condo building in South Florida, you need a Certificate of Insurance from your mover. Ask: "Can you provide a COI for my building?" The answer should be immediate yes, with details ("how soon do you need it, what limits does the building require?"). A pause or a fee for COI is a red flag — it usually means the mover\'s insurance is expired or insufficient.' },

      { type: 'h2', text: '7. Check reviews carefully' },
      { type: 'p', text: 'Reviews matter, but how you read them matters more.' },
      { type: 'h3', text: 'Look for' },
      { type: 'ul', items: [
        'Volume — at least 50 Google reviews for an established Miami mover',
        'Recency — recent reviews (last 90 days) matter more than 4-year-old ones',
        'Specificity — real clients mention specific buildings, neighborhoods, crew names, dates. Fake reviews are generic ("great service, very professional")',
        'How the company responds to negative reviews — owners who respond professionally and offer to make things right are accountable. Owners who attack the reviewer or stay silent are not.',
      ]},
      { type: 'h3', text: 'Watch for' },
      { type: 'ul', items: [
        'A company with 5 reviews all posted in the same week (likely fake)',
        'A company with no negative reviews at all (every legitimate company has at least a few — perfection is suspicious)',
        'Reviews that read identically across multiple companies (review farm)',
      ]},

      { type: 'h2', text: 'The 5-minute phone test' },
      { type: 'p', text: 'When you call a Miami moving company, here\'s what a real conversation sounds like:' },
      { type: 'ol', items: [
        'They answer with a real person within a few rings (not a robot or "press 1 for...")',
        'They ask about your origin, destination, building details, and inventory before quoting',
        'They\'re comfortable saying "we don\'t handle that" if asked about something outside their scope',
        'They give a price range with caveats, not a magic number',
        'They offer (or accept) an in-person walk-through for larger moves',
        'They send a written estimate within 24 hours',
        'They don\'t pressure you to book before a deadline',
      ]},
      { type: 'p', text: 'If any of these break down, keep looking.' },

      // [TODO: FDACS IM# — add license number here once confirmed]
      { type: 'callout', title: 'Talk to the owner', text: 'Easy Move Florida is owner-led — Eugene answers the phone himself. Written estimates standard, no deposits required, COI issued to your building within 24 hours of booking. Call 786-305-1844.' },
    ],
    related: ['miami-moving-cost-2026', 'what-is-coi-condo-move'],
  },

  // ─── Long-tail post #5: NY to Miami long-distance ────────────────────────
  {
    slug: 'moving-from-new-york-to-miami-guide',
    title: 'Moving from New York to Miami: The Complete 2026 Guide',
    metaTitle: 'Moving from NY to Miami 2026 — Cost & Timeline | Easy Move Florida',
    metaDescription: 'Complete guide to moving from New York to Miami in 2026: what drives the cost, transit times, neighborhoods, climate prep, what to ship vs sell. From a Miami-based mover.',
    excerpt: 'How interstate carriers price the route, realistic transit times, what survives the trip and what doesn\'t, and how to pick a Miami neighborhood that fits your life. We do not run this move ourselves: we refer it to a licensed carrier.',
    publishedAt: '2026-04-18',
    updatedAt: '2026-11-09',
    author: 'Eugene Romanov',
    readTime: '11 min',
    category: 'Long-Distance',
    heroImage: '/images/Real/Miami.jpg',
    body: [
      { type: 'p', text: 'New York to Miami is one of the most common long-distance moves in the country. We do not run it ourselves: Easy Move Florida moves within Florida only, interstate work requires federal operating authority we do not hold, and we refer interstate moves to a licensed carrier. This guide covers what costs more than people expect, what arrives broken, what to leave behind, and which Miami neighborhoods actually fit which kind of New York life.' },
      { type: 'p', text: 'What follows is what to ask a carrier, what tends to go wrong, and what we can do at the Florida end.' },

      { type: 'h2', text: 'What it actually costs' },
      { type: 'p', text: 'Interstate moves are flat-rate, not hourly. The figure turns on four things, and every carrier prices all four: highway distance, the total volume or weight of what ships, how hard the pickup and delivery addresses are to work (stairs, elevator booking, how far the truck parks from the door), and whether packing is included or you do it yourself.' },
      { type: 'p', text: 'We do not publish a price range for this route, because we do not quote it. We hold no interstate authority, and a number we cannot stand behind is worse than no number. Get two or three written estimates from FMCSA-licensed carriers and compare them on those four variables. What we can tell you is how to read what comes back.' },
      { type: 'ul', items: [
        'Ask whether the estimate is binding, non-binding, or binding-not-to-exceed — the wording matters more than the figure.',
        'Check the volume or weight on the estimate against what you actually own. A low number here is where a low quote hides.',
        'Confirm packing is priced in or priced out, explicitly. It is the single largest swing.',
        'Ask what happens if access at either end differs from what was described, and get that answer in writing too.',
      ]},
      { type: 'callout', title: 'Watch for lowballs', text: 'Some carriers quote a figure far below the rest to win the deposit, then raise the bill on move day. Get any low quote in writing with binding language, and verify the company is FMCSA-licensed before booking.' },

      { type: 'h2', text: 'How long it takes' },
      { type: 'p', text: 'Pure transit time NY → Miami: 2-3 days driving. But you book a delivery window, not a delivery date.' },
      { type: 'h3', text: 'Dedicated truck (recommended)' },
      { type: 'p', text: 'Your goods on a truck reserved for your move only. Typical timeline: load Day 1, transit Days 2-3, deliver Day 4 (or load + deliver same week). Dedicated truck costs more but transit is predictable.' },
      { type: 'h3', text: 'Shared / consolidated truck (national van lines)' },
      { type: 'p', text: 'Your goods loaded on a truck shared with 3-5 other families. Truck makes multiple stops on the route. Typical delivery window: 7-14 days from pickup. Cheaper but unpredictable.' },

      { type: 'h2', text: 'What to bring vs sell' },
      { type: 'p', text: 'New York apartments are small. Miami spaces are often larger. The math: you pay the carrier for every cubic foot that ships. Some items make sense to bring; others are cheaper to replace.' },
      { type: 'h3', text: 'Bring' },
      { type: 'ul', items: [
        'Quality furniture you love (custom, antique, expensive new)',
        'Art, books, family items, anything irreplaceable',
        'Quality kitchen items (good pots, knives, espresso machine)',
        'Quality bedding and towels',
        'Clothes (just the ones you actually wear)',
      ]},
      { type: 'h3', text: 'Sell or leave' },
      { type: 'ul', items: [
        'IKEA furniture — costs more to ship than to rebuy in Miami',
        'Mattresses older than 5 years',
        'Appliances (apartments come with them; houses use 220V Florida appliances)',
        'Winter clothes you wore once (you won\'t wear them in Miami)',
        'Books you\'ll never re-read',
        'Lamps from college',
      ]},

      { type: 'h2', text: 'Climate considerations' },
      { type: 'p', text: 'Miami summer humidity is brutal on certain materials. Plan for it.' },
      { type: 'ul', items: [
        'Wood furniture: solid hardwood is fine; veneers and particleboard warp within a year if not in AC year-round',
        'Leather: dries and cracks faster — keep it conditioned',
        'Books: Miami humidity destroys books outside AC — climate control is non-negotiable for libraries',
        'Wine: never store outside climate-controlled space (60-65°F constant)',
        'Art: oil paintings, antiques, anything paper-based needs AC and dehumidification',
      ]},

      { type: 'h2', text: 'Miami neighborhoods by NY analog' },
      { type: 'p', text: 'Where in Miami you should live depends on what you liked about New York.' },
      { type: 'h3', text: 'If you loved Manhattan' },
      { type: 'p', text: 'Brickell (downtown business + walkable + condo high-rises), or Edgewater (smaller scale Brickell). Brickell City Centre area = Battery Park style. South of Fifth Miami Beach = West Village energy with beach.' },
      { type: 'h3', text: 'If you loved Brooklyn' },
      { type: 'p', text: 'Wynwood (art + restaurants + walkable), Little Havana (real local), or Upper East Side Miami (residential + beach access).' },
      { type: 'h3', text: 'If you loved Westchester / Long Island' },
      { type: 'p', text: 'Coral Gables (historic + tree-lined), Pinecrest (large lots + great schools), Coconut Grove (older + bohemian), or Boca Raton (planned communities + golf).' },
      { type: 'h3', text: 'If you loved Hamptons summers' },
      { type: 'p', text: 'Sunny Isles Beach, Bal Harbour, Surfside, Palm Beach (year-round version of what you wanted seasonally).' },
      { type: 'h3', text: 'If you loved Tribeca / Soho' },
      { type: 'p', text: 'Miami Design District (gallery scene + luxury retail), South of Fifth (premium beach + walkable), or Brickell penthouses.' },

      { type: 'h2', text: 'The closing-gap problem' },
      { type: 'p', text: 'Common pattern: NY apartment lease ends Aug 31, Miami closing scheduled for Sept 15. Two-week gap. Options:' },
      { type: 'ol', items: [
        'Storage in transit: your goods stay on the carrier\'s truck or in its warehouse for the gap. The carrier prices this by length of stay.',
        'Storage at destination — we deliver into a Miami storage facility we book for you, then redeliver after your closing. The facility sets its own rate; ask for climate-controlled space if anything is wood or art.',
        'Stay with friends or short-term rental in Miami while waiting — arrange 1-month lease overlap if possible.',
      ]},

      { type: 'h2', text: 'Timing your move' },
      { type: 'h3', text: 'Best months for NY → Miami' },
      { type: 'p', text: 'October-December (peak season but predictable rates), January-February (off-peak, best rates, fastest scheduling).' },
      { type: 'h3', text: 'Worst months' },
      { type: 'p', text: 'June-August (hurricane season, weather delays possible), late May (peak snowbird-return scarcity).' },

      { type: 'h2', text: 'Two weeks before move day' },
      { type: 'ol', items: [
        'Confirm building paperwork at both ends (NY building + Miami building). COI required at both.',
        'Reserve elevator/loading dock at both buildings',
        'Schedule final walk-through with NY building',
        'Forward mail to Miami address (USPS form 3575)',
        'Cancel NY utilities for day after move; activate Miami utilities for day of arrival',
        'Update address with bank, employer, IRS, voter registration',
      ]},

      { type: 'callout', title: 'Moving from New York to Miami?', text: 'Easy Move Florida does not run the interstate leg - that needs federal operating authority we do not hold. What we do handle is the Miami end: receiving your carrier delivery, unpacking, and any Florida-to-Florida leg afterwards. Call 786-305-1844 and we will also point you to a licensed long-haul carrier.' },
    ],
    related: ['miami-moving-cost-2026', 'how-to-choose-moving-company-miami'],
  },

  // ─── Long-tail post #6: Russian-speaking residents ───────────────────────
  {
    slug: 'pereezd-aventura-sunny-isles-russkogovoryashchih',
    title: 'Переезд в Авентуру и Санни-Айлс: руководство для русскоязычных жителей',
    metaTitle: 'Переезд в Авентуру и Санни-Айлс 2026 | Easy Move Florida',
    metaDescription: 'Полное руководство по переезду в высотки Авентуры и Санни-Айлс для русскоязычных жителей: COI, бронирование лифтов, цены, советы по зданиям. Говорим по-русски.',
    excerpt: 'Williams Island, Acqualina, Trump Tower — что нужно знать о переезде в самые востребованные русскоязычные высотки Южной Флориды.',
    publishedAt: '2026-04-25',
    updatedAt: '2026-11-09',
    author: 'Евгений Романов',
    readTime: '9 мин',
    category: 'Russian-Speaking',
    heroImage: '/images/Real/4.png',
    body: [
      { type: 'p', text: 'Авентура и Санни-Айлс-Бич — два из крупнейших русскоязычных районов в США. Williams Island, Porto Vita, Acqualina, Trump Tower I/II/III, Mansions at Acqualina, Jade Beach, Jade Ocean: ниже разбираем, что обычно требуют такие здания. Переезды в эти высотки — это отдельная дисциплина: жёсткие правила управления, обязательные сертификаты страхования, бронирование лифтов за неделю вперёд, и контроль каждой минуты на погрузочном доке.' },
      { type: 'p', text: 'Это руководство для тех, кто переезжает в один из этих премиум-домов или из него. Всё что нужно знать заранее, чтобы день переезда прошёл без неожиданностей.' },

      { type: 'h2', text: 'Сертификат страхования (COI) — главное требование' },
      { type: 'p', text: 'Каждое здание в Авентуре и Санни-Айлс требует Certificate of Insurance от мувинговой компании до начала переезда. Без COI ваша бригада не попадёт даже на парковку, не говоря о лифте. COI должен:' },
      { type: 'ul', items: [
        'Указывать ваше конкретное здание (или управляющую компанию) как "additional insured"',
        'Иметь правильное название здания (опечатки = отказ)',
        'Содержать конкретные даты переезда',
        'Соответствовать минимальным лимитам страхования вашего здания (обычно $1M, для премиум-зданий $2M)',
      ]},
      // [TODO: confirm exact building COI limits with Evgenii] — per-building
      // limits and naming strings are not verified; described as the pattern
      // across these towers rather than as a rule for any named building.
      { type: 'p', text: 'Что обычно требуют башни Авентуры и Санни-Айлс — Williams Island, Porto Vita, Turnberry Isle, Trump Tower I/II/III, Acqualina и Mansions at Acqualina:' },
      { type: 'ul', items: [
        'Лимиты general liability чаще всего в диапазоне $1–2 млн, у премиум-зданий — по верхней границе',
        'Ассоциация здания указана как additional insured, причём название пишется строго так, как оно записано в уставе',
        'У части зданий — отдельные требования по auto liability и workers compensation',
        'Свой формат сертификата: одна и та же страховка, оформленная не по форме здания, разворачивается на въезде',
      ]},
      { type: 'p', text: 'Точные лимиты и формулировки различаются от здания к зданию и меняются со временем. Мы запрашиваем требования у вашей управляющей компании до дня переезда и оформляем COI по её форме.' },
      { type: 'callout', title: 'Совет', text: 'Запросите требования к COI у вашего building manager письменно (по email). Перешлите эту информацию мувинговой компании. Качественный мувер выпустит COI в течение 24 часов после подтверждения брони — бесплатно.' },

      { type: 'h2', text: 'Бронирование лифта и погрузочного дока' },
      { type: 'p', text: 'У каждого здания свои правила брони грузового лифта и свои окна для переезда. В сезон snowbirds (октябрь-май) бронируйте окно как можно раньше.' },
      { type: 'p', text: 'Что нужно сделать заранее:' },
      { type: 'ol', items: [
        'Связаться с building management как только зафиксирована дата переезда',
        'Зарезервировать окно лифта (обычно нужно подать письменный запрос за 1-2 недели)',
        'Оплатить депозит за лифт, если здание его требует',
        'Подтвердить правила погрузочного дока: у каждого здания они свои',
        'Получить контакт dock manager или security в день переезда',
      ]},

      { type: 'h2', text: 'Стоимость переезда в Авентуру и Санни-Айлс' },
      { type: 'p', text: 'Цены в 2026 году для типичных переездов внутри Южной Флориды (например, Майами → Авентура или Санни-Айлс → Hollywood):' },
      { type: 'ul', items: [
        'Студия: $516-$645 всё включено (3-4 часа, 2 грузчика + грузовик)',
        '1-комнатная: $516-$774 (3-5 часов, 2 грузчика)',
        '2-комнатная: $645-$1,253 (4-6 часов, 2-3 грузчика)',
        '3-комнатная: $1,253-$1,611 (6-8 часов, 3 грузчика)',
      ]},
      { type: 'p', text: 'Базовая ставка: $129/час за 2 грузчика, $179/час за 3, минимум 3 часа. Грузовик — отдельной строкой в смете, за день, по ставке бригады: $129 при двух грузчиках, $179 при трёх, $219 при четверых; топливо, платные дороги и мили уже включены, никаких топливных надбавок. Надбавок за выходные и сезон у нас нет — ставка фиксируется при бронировании. Все цены прозрачны: вы получаете письменную смету до бронирования. Никаких сюрпризов в день переезда.' },

      { type: 'h2', text: 'Особенности конкретных зданий' },
      // Porto Vita, two towers (North and South): https://www.sunnyislesmiamirealestate.com/aventura-condos/porto-vita.htm (checked 2026-11-09)
      // No public source was found for per-building rules of Williams Island, Porto Vita, Trump Towers or Acqualina, so none are stated.
      { type: 'p', text: 'Williams Island, Porto Vita (две башни, North и South), Trump Tower I, II, III, Acqualina и Mansions at Acqualina: у каждого комплекса свои часы переезда, свой порядок брони лифта и свои формулировки страховки. Мы запрашиваем актуальные правила у управляющей компании до дня переезда: они меняются, и проверять их надо каждый раз.' },

      { type: 'h2', text: 'Бригада, говорящая по-русски' },
      { type: 'p', text: 'Этот пункт важен по двум причинам. Первая — комфорт общения. Если вам или management здания удобнее обсуждать детали по-русски, это убирает недопонимания, которые могут стоить времени и денег. Вторая — точность инвентаризации и инструкций. Когда вы говорите "вот эту картину поставьте в библиотеку, осторожнее с правым углом" — нужна уверенность что вас правильно поняли.' },
      { type: 'p', text: 'Владелец, Евгений Романов, сам отвечает на звонки по-русски, и старший бригады говорит по-русски. Это не маркетинговый слоган: так компания работает каждый день.' },

      { type: 'h2', text: 'Чек-лист за 2 недели до переезда' },
      { type: 'ol', items: [
        'Получить требования COI от management вашего здания (письменно)',
        'Переслать требования мувинговой компании, подтвердить выпуск COI в течение 24 часов',
        'Зарезервировать окно лифта в обоих зданиях (откуда и куда)',
        'Подтвердить парковку для грузовика — где и как долго можно стоять',
        'Уточнить любые специфические правила (форма бригады, размер грузовика, время прибытия)',
        'Обсудить план размещения мебели в новой квартире — куда что ставить',
        'Подготовить cash или оплату для tip бригаде если планируете (обычно 15-20% от суммы переезда)',
        'Сохранить наш номер, 786-305-1844, на случай вопросов в день переезда',
      ]},

      { type: 'h2', text: 'Что мы делаем по умолчанию' },
      { type: 'ul', items: [
        'Защита полов в лобби, лифте и коридорах вашего здания',
        'Защита дверных проёмов pad-wrapping',
        'Разборка и сборка стандартной мебели (кровати, столы, шкафы) — включено в стоимость',
        'COI выпускается за 24 часа, бесплатно, точно по требованиям здания',
        'Письменная смета до бронирования, без депозита',
        'Полный инвентарный список в день переезда',
        'Прямой контакт с Евгением (основателем) на протяжении всего процесса',
      ]},

      { type: 'callout', title: 'Бесплатная смета', text: 'Звоните 786-305-1844: владелец сам ответит по-русски. Письменную смету пришлём в течение 24 часов. Без депозита.' },
    ],
    related: ['brickell-condo-move-checklist', 'what-is-coi-condo-move'],
  },

  // ─── Long-tail post #7: 4-week pre-move checklist ────────────────────────
  {
    slug: 'south-florida-pre-move-checklist',
    title: 'The 4-Week South Florida Pre-Move Checklist',
    metaTitle: 'Pre-Move Checklist 4 Weeks Out — South Florida | Easy Move Florida',
    metaDescription: 'Week-by-week checklist for a smooth South Florida move: 4 weeks out to move day. Building paperwork, packing timeline, utilities, address changes.',
    excerpt: 'A move that goes smoothly looks effortless on the day. The work to make it look that way starts 4 weeks earlier. Here\'s the schedule.',
    publishedAt: '2026-04-08',
    updatedAt: '2026-11-09',
    author: 'Eugene Romanov',
    readTime: '7 min',
    category: 'Moving Guide',
    heroImage: '/images/Real/3.png',
    body: [
      { type: 'p', text: 'A South Florida move that goes smoothly on the day looks effortless. The reason it looks effortless: 4 weeks of structured preparation. Move-day chaos is almost always the result of last-week scrambling — and that scrambling is preventable with a clear timeline.' },
      { type: 'p', text: 'Here\'s the exact week-by-week checklist we send to clients after they book.' },

      { type: 'h2', text: '4 weeks out: Decisions and bookings' },
      { type: 'ol', items: [
        'Confirm move date in writing with both your origin and destination buildings',
        'Get COI requirements from both buildings (written, by email)',
        'Book your moving company. Get a written estimate. No deposit if avoidable.',
        'Reserve elevator/loading dock at both buildings if applicable',
        'Make a "bring vs leave" list. Realistically — what do you actually use?',
        'Schedule estate sale or donation pickup if downsizing',
      ]},

      { type: 'h2', text: '3 weeks out: Inventory and supplies' },
      { type: 'ol', items: [
        'Get moving boxes (small, medium, large), packing paper, tape, markers',
        'Order specialty supplies if needed: wardrobe boxes, dish-pack boxes, mattress bags',
        'Photograph your existing furniture setup — useful for placement at destination',
        'Start using up perishable food and freezer items',
        'If shipping pets: book pet relocation service (Caribbean and overseas pet imports require advance scheduling)',
        'Notify children\'s school of last day; arrange transcript transfer if applicable',
      ]},

      { type: 'h2', text: '2 weeks out: Utilities and address' },
      { type: 'ol', items: [
        'Schedule utilities cancellation at origin (electric, water, internet, gas) for day after move',
        'Schedule utilities activation at destination for day of move',
        'Submit USPS change of address (form 3575)',
        'Update address with: bank, credit cards, IRS, employer, voter registration, insurance, doctor offices, subscription services',
        'Confirm COI has been received and approved by both buildings',
        'Start packing non-essential items (books, decor, off-season clothing, kitchen items you don\'t use weekly)',
      ]},

      { type: 'h2', text: '1 week out: Packing and confirmations' },
      { type: 'ol', items: [
        'Pack everything except essentials (clothes for the week, daily kitchen, toiletries, electronics)',
        'Label every box with destination room AND brief contents ("Master Bedroom — bedside lamps, nightstand items")',
        'Confirm with mover: arrival time, crew size, total estimate, payment method',
        'Confirm with buildings: elevator reservation still in place, parking arrangement, dock access',
        'Cash for tips, if you plan to tip (typically 15-20% of the move cost, split across the crew)',
        'Pack a "first night" box: sheets, toiletries, phone charger, coffee maker, pajamas, snacks',
        'Defrost freezer if bringing it; clean refrigerator',
      ]},

      { type: 'h2', text: '24-48 hours before' },
      { type: 'ol', items: [
        'Mover\'s pre-move call (we do this — confirms timing, last-minute changes)',
        'Pack remaining essentials except first-night box',
        'Disconnect electronics — TVs, computers, gaming consoles. Photograph cable setups for easy reconnect.',
        'Wash and dry all linens and clothes before packing',
        'Print copies of important documents (passports, lease, COI, mover contract) — keep with you, not on truck',
        'Confirm parking for moving truck at both buildings — repeat the loading dock conversation',
        'Charge all phones and have backup batteries ready — move day has lots of phone time',
      ]},

      { type: 'h2', text: 'Move day' },
      { type: 'ol', items: [
        'Be present when crew arrives (or arrange someone to be)',
        'Walk the crew through your home — point out fragile items, anything unusual',
        'Verify COI is on file with building',
        'Make sure walkways and doorways are clear',
        'Keep first-night box and important documents OFF the truck',
        'After loading: walk through every room and closet to verify nothing\'s left',
        'Confirm destination address and any special instructions with crew',
        'At destination: be present for unload. Direct furniture placement room by room.',
        'Walk through with crew when complete. Inspect any potentially damaged items immediately.',
        'Final payment processed once you\'ve confirmed everything is in order.',
      ]},

      { type: 'h2', text: 'First week after move' },
      { type: 'ol', items: [
        'Test all major appliances and utilities',
        'Locate emergency exits, fire extinguishers, water shut-offs',
        'Find local: pharmacy, urgent care, hardware store, grocery',
        'Update driver\'s license to Florida (within 30 days for new residents)',
        'Re-register your vehicle in Florida if a permanent move',
        'Meet your immediate neighbors',
        'Leave your mover an honest Google review — it helps other people choose well',
      ]},

      { type: 'h2', text: 'What to skip' },
      { type: 'p', text: 'Things people overpack on but shouldn\'t worry about:' },
      { type: 'ul', items: [
        'You don\'t need to pack 2 months ahead. Most homes can be fully packed in the week before.',
        'You don\'t need to disassemble standard furniture yourself — your mover does that included.',
        'You don\'t need to clean before packing — clean after when boxes are out.',
        'You don\'t need to label every individual book or item — box-level room labels are enough.',
      ]},

      { type: 'callout', title: 'Need a written estimate?', text: 'Ask for a free written estimate and get it within 24 hours, with no deposit and no obligation. Or call 786-305-1844 to talk through a custom move.' },
    ],
    related: ['brickell-condo-move-checklist', 'how-to-choose-moving-company-miami'],
  },

  // ─── Long-tail post #8: Fine art packing ─────────────────────────────────
  {
    slug: 'how-to-pack-fine-art-antiques-miami-move',
    title: 'How to Pack Fine Art and Antiques for a Miami Move',
    metaTitle: 'Packing Fine Art for Miami Moves — Crating & Climate | Easy Move Florida',
    metaDescription: 'Professional guide to packing fine art and antiques for South Florida moves: custom crating, climate considerations, insurance, what to DIY vs hire out.',
    excerpt: 'Miami heat, humidity, and freight handling can damage art and antiques in ways most people don\'t anticipate. Here\'s what actually protects them.',
    publishedAt: '2026-03-28',
    updatedAt: '2026-11-09',
    author: 'Eugene Romanov',
    readTime: '8 min',
    category: 'Specialty',
    heroImage: '/images/Real/5.png',
    body: [
      { type: 'p', text: 'Most furniture survives a move with basic packing — moving blankets, padded transport, careful loading. Fine art and antiques are different. Oil paintings, antique wood, marble, bronze, mirrors, and high-value collectibles require specific protection — and the consequences of getting it wrong are usually permanent. A torn canvas, cracked veneer, or chipped marble corner can\'t be undone.' },
      { type: 'p', text: 'This guide covers how art and antiques are packed and prepared for a move in and around Miami, where heat, humidity, and dense building access add complications most general movers don\'t plan for.' },

      { type: 'h2', text: 'Step 1: Inventory and document everything' },
      { type: 'p', text: 'Before any packing happens, photograph every piece — multiple angles, close-ups of any existing condition issues (scratches, hairlines, edge wear). Create a written inventory with rough dimensions and estimated values. This protects you in two ways: it documents pre-move condition for insurance purposes, and it gives the mover essential information for proper handling.' },
      { type: 'p', text: 'For art over $10,000 in value, get a recent appraisal if you don\'t have one. Most fine art insurance requires it.' },

      { type: 'h2', text: 'Step 2: Determine custom crating needs' },
      { type: 'p', text: 'Some pieces can be safely transported with proper padding alone. Others need custom-built wood crates. The dividing line is usually:' },
      { type: 'h3', text: 'Custom crate required' },
      { type: 'ul', items: [
        'Oil paintings over 40" in any dimension',
        'Pastels, watercolors, and works on paper (any size — these are extremely fragile)',
        'Original art valued over $10,000',
        'Stretched canvas without a frame',
        'Antique mirrors and large framed mirrors',
        'Marble or stone sculpture over 25 lbs',
        'Antique furniture with original finish that can\'t be repaired',
      ]},
      { type: 'h3', text: 'Padded transport sufficient' },
      { type: 'ul', items: [
        'Modern framed prints',
        'Bronze sculpture (medium weight, sturdy)',
        'Most antique furniture in stable condition',
        'Reproduction art and decorative pieces',
      ]},
      { type: 'p', text: 'A custom crate is priced per piece, by size and complexity. They\'re built on-site by your moving company in the day or two before move day.' },

      { type: 'h2', text: 'Step 3: Climate considerations' },
      { type: 'p', text: 'South Florida heat (often 95°F+ inside a parked truck) and humidity damage art and antiques in specific ways:' },
      { type: 'ul', items: [
        'Oil paintings: heat softens paint and varnish, making surface easier to mark',
        'Wood antiques: rapid temperature/humidity swings cause veneer lifting and cracking',
        'Pastel and chalk: heat melts the binder, smearing the work',
        'Wax sculpture: melts at relatively low temperatures',
        'Photographs: fade and stick together in high humidity',
        'Wine: any temp swing over 5°F damages aging',
      ]},
      { type: 'p', text: 'Mitigation: minimize time on a hot truck. Load specialty items last (so they\'re unloaded first). For long-distance moves, use a climate-controlled truck — adds 25-50% to base cost but worth it for valuable collections.' },

      { type: 'h2', text: 'Step 4: Painting-specific packing' },
      { type: 'p', text: 'For framed paintings going into a custom crate:' },
      { type: 'ol', items: [
        'Tape glass with painter\'s tape in an X pattern (prevents glass shards from damaging the canvas if it breaks)',
        'Wrap in glassine paper (acid-free, doesn\'t stick to surfaces)',
        'Add layer of bubble wrap with bubble side OUT (bubble side in can leave indentation marks)',
        'Wrap in moving blanket',
        'Place in custom crate with 1-inch foam padding on all sides',
        'Mark crate "FINE ART — DO NOT LAY FLAT" if it\'s a deep-frame piece',
      ]},

      { type: 'h2', text: 'Step 5: Antique furniture' },
      { type: 'p', text: 'For antique pieces with original finish:' },
      { type: 'ol', items: [
        'Wrap in clean moving blankets — never tape directly to wood (residue and finish damage)',
        'Use plastic stretch wrap OUTSIDE the blankets to secure them — never directly on wood',
        'Pad drawers and doors so they don\'t open during transport',
        'For glass-front cabinets, remove glass shelves and pack separately',
        'Photograph hardware before removal if disassembly is needed',
      ]},

      { type: 'h2', text: 'Step 6: Sculpture and three-dimensional art' },
      { type: 'p', text: 'Bronze and stone sculptures need different protection from paintings:' },
      { type: 'ul', items: [
        'Smaller pieces (under 20 lbs): wrapped in soft cloth, then bubble wrap, then padded box with 2 inches of packing material on all sides',
        'Medium pieces (20-100 lbs): custom crate with foam-cut interior matching the piece\'s shape',
        'Large pieces: custom crate with internal bracing and floor anchoring; usually require disassembly into base + sculpture if possible',
        'Marble and limestone: extremely heavy and brittle. Custom crate, foam interior, packed by hand never thrown',
      ]},

      { type: 'h2', text: 'Step 7: Insurance' },
      { type: 'p', text: 'Standard mover\'s cargo insurance pays a per-pound limit (typically $0.60/lb) — useless for valuable art. For high-value pieces, you have options:' },
      { type: 'ul', items: [
        'Declared value coverage from your mover — covers up to a stated amount per piece, premium based on value',
        'Full replacement coverage from your mover — covers actual replacement or repair cost',
        'Standalone fine art insurance — separate policy through carriers like AXA Art, Chubb, or Crystal & Company. Best for collections over $50,000.',
        'Existing homeowner\'s rider — verify your homeowner\'s policy covers items in transit (most do not by default)',
      ]},
      { type: 'p', text: 'For any single piece worth over $25,000, we strongly recommend standalone fine art insurance for the move and storage period.' },

      { type: 'h2', text: 'Step 8: What to DIY vs hire out' },
      { type: 'h3', text: 'DIY-able' },
      { type: 'ul', items: [
        'Modern framed prints under 24"',
        'Reproduction art and decorative pieces',
        'Sturdy mid-century modern or contemporary furniture',
        'Bronze sculpture under 20 lbs',
      ]},
      { type: 'h3', text: 'Hire professional packers' },
      { type: 'ul', items: [
        'Anything original art over $5,000',
        'All works on paper, pastel, watercolor',
        'Oil paintings over 30"',
        'Antique furniture with delicate finish or instability',
        'Marble or stone sculpture',
        'Large mirrors',
        'Wine collections over 50 bottles',
      ]},

      { type: 'h2', text: 'When to call a fine art specialist (not a regular mover)' },
      { type: 'p', text: 'Some pieces are beyond what general moving companies — even good ones — should handle. Call a fine art specialist when:' },
      { type: 'ul', items: [
        'Single piece value over $100,000',
        'Museum-grade works requiring specialized environmental control',
        'Pieces requiring rigging (oversized installations, heavy sculpture moving through restricted access)',
        'Works on loan from museums or galleries',
      ]},
      { type: 'p', text: 'Reputable Miami fine art handlers include Cooke\'s Crating, US Art, and Atelier Art Services. We\'re happy to refer when a piece is beyond what we should handle — and we\'ll tell you upfront, not take the job and figure it out later.' },

      { type: 'callout', title: 'Specialty move? Talk to us.', text: 'Easy Move Florida packs and prepares art and antiques for shipping, and the shipping itself is done by partner carriers. Each job is quoted individually because every collection is different. Call 786-305-1844 for an in-person consultation.' },
    ],
    related: ['miami-moving-cost-2026', 'how-to-choose-moving-company-miami'],
  },

  // ─── Long-tail post #9: Miami → Orlando long-distance ────────────────────
  {
    slug: 'moving-from-miami-to-orlando-cost-guide',
    title: 'Moving from Miami to Orlando: Cost Factors and What to Expect in 2026',
    metaTitle: 'Miami to Orlando Moving Cost 2026 | Easy Move Florida',
    metaDescription: 'Miami to Orlando moves in 2026: what drives the cost, transit time, routes, neighborhoods, best season to move. Quoted per job, in writing, within 24 hours.',
    excerpt: 'What affects the price, 1-2 day transit, route options, and which Orlando neighborhoods people leaving Miami pick. We quote this route per job, in writing.',
    publishedAt: '2026-05-15',
    updatedAt: '2026-11-09',
    author: 'Eugene Romanov',
    readTime: '8 min',
    category: 'Long-Distance',
    heroImage: '/images/Real/Miami.jpg',
    body: [
      { type: 'p', text: 'Miami to Orlando is a common in-state long-distance move. About 235 miles depending on route, one tank of gas, an easy day of driving, but the move itself is rarely as simple as the drive. People make it for schools, cost of living or remote work, and retirees make it to step away from the coast. Here\'s what drives the cost in 2026 and what you need to know before booking.' },
      { type: 'p', text: 'We publish no price range for this route. Long distance inside Florida is quoted per job, in writing, within 24 hours.' },

      { type: 'h2', text: 'How this route is priced' },
      { type: 'p', text: 'Miami → Orlando is over 50 miles, so we quote it per job rather than by the hour. The figure depends on volume (cubic feet of goods) and access at both ends (stairs, long carries, high-rise vs single family).' },
      { type: 'p', text: 'Packing is quoted on top if you want it. A piano, safe or marble piece is a separate line on the estimate, agreed before you book. The certificate of insurance for a high-rise at either end is free.' },
      { type: 'callout', title: 'Watch the lowball quote', text: 'A quote far below the others is usually a deposit trap. Get any quote in writing with binding language, and check the mover\'s registration before paying anything.' },

      { type: 'h2', text: 'How long the move takes' },
      { type: 'p', text: 'Pure drive time Miami → Orlando is 3.5-4.5 hours depending on traffic and route. But the move itself is rarely a same-day load-and-deliver.' },
      { type: 'h3', text: 'Dedicated truck (most common for this route)' },
      { type: 'p', text: 'Your goods, your truck, one driver and crew. Load in Miami in the morning, drive same day, unload in Orlando late afternoon or next morning. Most 1-3 bedroom Miami → Orlando moves are completed inside 24-36 hours from load start to unload finish.' },
      { type: 'h3', text: 'Shared / consolidated truck (national van lines)' },
      { type: 'p', text: 'Your goods loaded with 2-4 other families\' loads heading north. Pickup window 1-3 days, delivery window 3-10 days from pickup. Cheaper on paper, far less predictable in practice. For a short in-state move, we almost always recommend dedicated.' },

      { type: 'h2', text: 'What affects your final price' },
      { type: 'p', text: 'Two same-size apartments can have very different totals. The main variables:' },
      { type: 'ul', items: [
        'Total volume — every cubic foot adds cost. Decluttering before the move is the single biggest price lever.',
        'Access at origin — Brickell high-rise with COI and elevator slot vs single family with driveway parking is a 1-3 hour difference in load time, which shows up in the quote.',
        'Access at destination — Lake Nona house with wide driveway vs Winter Park historic with no truck-friendly street parking',
        'Long carries (over 75 ft from truck to door) at either end',
        'Stairs (they add carry time, and there is no stair fee)',
        'Season: May through August is peak demand, so scheduling is tighter. We add no seasonal surcharge',
        'Heavy specialty items (pianos, safes over 400 lbs, marble tables, treadmills)',
        'Full-pack service vs you packing your own boxes',
      ]},

      { type: 'h2', text: 'Route options: I-95 vs Florida Turnpike' },
      { type: 'p', text: 'Two main routes, both about 235 miles, both about 4 hours.' },
      { type: 'h3', text: 'Florida Turnpike (we use this)' },
      { type: 'p', text: 'Slightly faster on average, fewer trucks, less stop-and-go through urban areas. Tolls for the truck are part of your written quote, not an extra. The Turnpike is the cleaner, more predictable route for a loaded truck, and it skips the I-95 corridor through Fort Lauderdale and the Treasure Coast where traffic can collapse without warning.' },
      { type: 'h3', text: 'I-95 + I-4' },
      { type: 'p', text: 'No tolls, but more traffic risk, especially through Broward and around Daytona where I-4 starts. A 4-hour drive can stretch to 6-7 hours in heavy traffic. Some movers default to I-95 to save toll cost — ask which route your mover plans, and why.' },

      { type: 'h2', text: 'Where Miami movers actually settle in Orlando' },
      { type: 'p', text: 'Three Orlando-area neighborhoods come up often for people leaving Miami:' },
      { type: 'h3', text: 'Lake Nona' },
      { type: 'p', text: 'Master-planned, modern, lots of healthcare and remote-work professionals. Newer construction (most homes 2010+), good schools, easy airport access. The closest Orlando has to a "South Beach moves north" demographic.' },
      { type: 'h3', text: 'Winter Park' },
      { type: 'p', text: 'Older, walkable, tree-lined. The Coral Gables of Orlando. Strong public and private schools, mature neighborhoods, brick streets in the historic core. Popular with families moving from Coral Gables, Pinecrest, and Coconut Grove.' },
      { type: 'h3', text: 'Dr. Phillips' },
      { type: 'p', text: 'Established suburb with larger lots, gated communities, and quick I-4 access to downtown and theme parks. Popular with families who want space without sacrificing convenience — the closest Orlando equivalent to West Kendall or Doral.' },
      { type: 'p', text: 'Other common landing spots: Baldwin Park, College Park, Maitland, Windermere (for higher-end), and the corridor north of downtown around Audubon Park.' },

      { type: 'h2', text: 'Best season to move Miami → Orlando' },
      { type: 'p', text: 'October through April is the sweet spot. Cooler temperatures protect your furniture and crew, lower demand leaves more open dates, and hurricane risk is mostly behind you.' },
      { type: 'p', text: 'May, June, July, August are peak demand because of school transitions and snowbird turnover, so expect tighter scheduling. We add no seasonal surcharge. June through November is also Atlantic hurricane season, and any move with a named storm in the cone risks weather delays.' },
      { type: 'p', text: 'September is the single worst month for Florida moves. Peak hurricane risk, leftover summer heat, and the start of school complications. If you can avoid it, do.' },

      { type: 'h2', text: 'Hurricane and weather considerations' },
      { type: 'p', text: 'If your move falls inside hurricane season (June 1 - November 30), here\'s what we do and what to expect:' },
      { type: 'ul', items: [
        'We monitor National Hurricane Center updates daily during active systems',
        'If a named storm enters the cone within 72 hours of your move, we proactively call to reschedule — no fee, no rate change',
        'For moves the day before a forecasted landfall, we postpone — your goods do not belong in a truck on I-95 in a tropical storm',
        'Storage in a public self-storage unit in Miami is available if your Orlando closing is delayed by weather, from $200/month. A climate-controlled unit is booked with a third party',
        'We do not move during active tropical storm warnings, period',
      ]},

      { type: 'h2', text: 'Packing tips for the I-95 / Turnpike run' },
      { type: 'p', text: 'Even a short long-distance is rougher on your goods than a local move. The truck spends 4-6 hours on highway with normal jostling, and Florida heat inside a parked or moving truck regularly hits 100°F+ in summer. Plan accordingly:' },
      { type: 'ul', items: [
        'Pack books tight in small boxes — half-empty boxes shift in transit',
        'Wine and high-end chocolates do not survive a summer truck — ship separately, climate-controlled',
        'Electronics in original boxes if you have them; otherwise heavily padded',
        'Mattresses in mattress bags, no exceptions — Florida humidity + 4 hours on a truck = potential mold',
        'Liquid containers (shampoo, cleaning products) in sealed plastic bins, not boxes — pressure changes cause leaks',
        'Photograph any high-value electronics, art, and antiques before pickup',
      ]},

      { type: 'h2', text: 'Two-week checklist for Miami → Orlando' },
      { type: 'ol', items: [
        'Confirm move date with your moving company and both buildings (origin Miami building + Orlando destination if condo)',
        'Get COI requirements from both buildings if applicable — forward to mover',
        'Reserve elevator and loading dock in Miami; confirm parking at Orlando destination',
        'Schedule USPS mail forwarding (form 3575) — takes 7-10 days to activate',
        'Cancel Miami utilities for day after move; activate Orlando utilities (Duke Energy, OUC, or Lake Apopka depending on address) for day of arrival',
        'Update driver\'s license address with FLHSMV (you have 30 days after physical move)',
        'Re-register vehicle in your new Orange/Seminole/Osceola county within 10 days of move',
        'Update voter registration and insurance addresses',
      ]},

      { type: 'callout', title: 'Get a written estimate for your Miami → Orlando move', text: 'Long distance inside Florida is quoted per job, in writing, within 24 hours. Call 786-305-1844 or send your details at /quote.' },
    ],
    related: ['miami-moving-cost-2026', 'moving-from-new-york-to-miami-guide'],
  },

  // ─── Long-tail post #10: Hurricane season moving ─────────────────────────
  {
    slug: 'moving-during-hurricane-season-florida',
    title: 'Moving During Hurricane Season in Florida: What Actually Happens',
    metaTitle: 'Moving During Hurricane Season Florida 2026 | Easy Move Florida',
    metaDescription: 'Real guide to moving in Florida during hurricane season (June-November): what happens if a storm hits, insurance, our cancellation policy, what to pack first.',
    excerpt: 'A storm in the cone changes everything. Here\'s what we do 72 hours out, what your insurance actually covers, and why September is the worst month to move in Florida.',
    publishedAt: '2026-05-20',
    updatedAt: '2026-11-09',
    author: 'Eugene Romanov',
    readTime: '7 min',
    category: 'Moving Guide',
    heroImage: '/images/Real/3.png',
    body: [
      { type: 'p', text: 'Atlantic hurricane season runs June 1 through November 30. That\'s six months of the year when any Florida move carries some level of weather risk. Most moves in that window go fine. Some don\'t, and the ones that don\'t usually go wrong because somebody didn\'t plan for the obvious: this is Florida, in summer, and storms happen.' },
      { type: 'p', text: 'Here\'s what actually happens to a move when a hurricane enters the picture, what we do about it, and what you should know before booking inside the June-November window.' },

      { type: 'h2', text: 'What happens if a storm threatens your move date' },
      { type: 'p', text: 'When a named storm enters the National Hurricane Center cone within 72 hours of a scheduled move, here\'s our actual process:' },
      { type: 'ul', items: [
        'We call you directly — not text, not email. A real call.',
        'We discuss reschedule options. First available open slot, locked at your original rate.',
        'No reschedule fee for a named storm — we move the date and hold your original rate.',
        'If your origin or destination falls inside an evacuation zone, we postpone — no exceptions',
        'We confirm in writing the new date and that pricing is unchanged',
      ]},
      { type: 'p', text: 'Most reputable Florida movers have a version of this policy. Read the fine print on whoever you book: ask what happens to your booking if a storm moves the date.' },

      { type: 'h2', text: 'Our 72-hour rule' },
      { type: 'p', text: 'Once a system is named and enters the Atlantic with any Florida forecast probability, we start monitoring. At 72 hours from your move date:' },
      { type: 'ol', items: [
        'If the storm is in your area\'s cone of uncertainty, we call you to discuss options',
        'If the storm is forecasted to make landfall within 24 hours of your move, we automatically reschedule',
        'If a tropical storm or hurricane warning is issued for your origin OR destination, we do not move that day',
        'If a hurricane watch is in effect, we move the load 24 hours earlier when possible to clear before conditions worsen',
      ]},
      { type: 'callout', title: 'Why we err on the side of caution', text: 'A loaded 26-foot truck in tropical storm-force winds is a serious hazard to the driver, your goods, and everyone else on the road. We don\'t move into weather, period.' },

      { type: 'h2', text: 'What insurance actually covers' },
      { type: 'p', text: 'Most homeowners and renters policies have weather coverage gaps that surprise people during a move:' },
      { type: 'ul', items: [
        'Standard renters insurance does NOT cover goods in transit during a move — most people learn this only when they file a claim',
        'Homeowners policies often cover goods up to 10% of policy limit in transit, but exclude flood damage by default',
        'Moving company cargo coverage is per-pound by default ($0.60/lb under federal law) — useless for a $3,000 mattress',
        'Hurricane damage to goods in a moving truck during transit is rarely covered by any policy — it falls between cargo, auto, and weather exclusions',
        'Ask any mover, in writing and before you book, what is covered if goods are damaged in transit',
      ]},
      { type: 'p', text: 'Practical answer: if you\'re moving June through November in Florida, ask about coverage in writing before you book, and check what your own homeowners or renters policy covers in transit.' },

      { type: 'h2', text: 'What gets damaged during hurricane season moves' },
      { type: 'p', text: 'Hurricane season damage to a move doesn\'t usually look like a tree falling on the truck. It\'s subtler and more common:' },
      { type: 'h3', text: 'Humidity surge damage' },
      { type: 'p', text: 'In the 24-48 hours before a tropical system, dew points and humidity spike. Goods sitting in a non-climate-controlled truck or staging area absorb that moisture. Wood furniture (especially veneer, particleboard, mid-century original finish) swells and warps within days. Books mold. Leather darkens.' },
      { type: 'h3', text: 'Wind damage to wood and glass' },
      { type: 'p', text: 'Even outside an active storm, the squalls that precede a system bring 30-50 mph gusts. Moving blankets blow off, glass-front cabinets catch wind during carry, antique mirrors crack from temperature shock when carried from a 95°F outdoor environment into 70°F AC.' },
      { type: 'h3', text: 'Water in trucks' },
      { type: 'p', text: 'Older trucks with worn door seals leak in sudden Florida downpours. Boxes packed at the bottom of a load sit in standing water for hours before unload. It is a real risk with poorly maintained trucks.' },
      { type: 'h3', text: 'Closing and delivery delays' },
      { type: 'p', text: 'A storm doesn\'t need to hit your route to ruin your timeline. A storm in the Gulf can close interstate trucking corridors for 24-48 hours. A direct hit on Florida can close I-95, I-75, the Turnpike, and most local roads for 2-5 days. If your move requires a specific Monday delivery for a closing, build in buffer.' },

      { type: 'h2', text: 'What to pack first vs last when a storm threatens' },
      { type: 'p', text: 'If a storm enters the cone and your move is happening regardless (close-in dates, lease ends), here\'s the priority order:' },
      { type: 'h3', text: 'Pack and load first (least risk during a delay)' },
      { type: 'ul', items: [
        'Dishes, kitchenware, non-essential clothing',
        'Books (in small, tightly packed boxes)',
        'Decor, art (if professionally crated)',
        'Garage and storage items',
      ]},
      { type: 'h3', text: 'Pack and load last (most weather-sensitive)' },
      { type: 'ul', items: [
        'Mattresses and bedding (humidity = mold risk)',
        'Electronics (heat and humidity damage)',
        'Important documents (always carry these with you, never on the truck)',
        'Wine and temperature-sensitive items (better to ship separately)',
        'Medications and medical equipment',
      ]},

      { type: 'h2', text: 'Storage as a hurricane buffer' },
      { type: 'p', text: 'If you have flexibility in your timeline, storage is a tactical option during hurricane season. We arrange it in a public self-storage unit from $200/month, and a climate-controlled unit is booked with a third party.' },
      { type: 'p', text: 'Common scenarios where storage helps:' },
      { type: 'ul', items: [
        'Origin lease ends Aug 31, destination closing delayed by storm: we load Aug 31, hold goods in a public self-storage unit, deliver when destination is ready',
        'You want to move in early June (before peak season) but new home doesn\'t close until September — we hold inventory through the worst months',
        'Storm forecasted for move day — we can load early, hold for 1-3 days in storage, deliver after the storm clears',
      ]},
      { type: 'p', text: 'This is one of those services that costs less than people assume and solves problems that would otherwise cost a lot more.' },

      { type: 'h2', text: 'Pre-storm vs post-storm rates' },
      { type: 'p', text: 'During the 5-7 days after a major Florida storm, moving demand spikes — displaced families, delayed moves rebooked, evacuees returning. Rates do not officially rise (reputable movers don\'t price gouge after disasters, and Florida law specifically prohibits it), but scheduling tightens drastically. The first available slots are typically 7-14 days out.' },
      { type: 'p', text: 'Pre-storm rates are normal. Some lower-tier movers run "evacuation specials" before a forecasted storm — be careful. These often come with surprise charges when the storm misses and they want to fill the truck.' },

      { type: 'h2', text: 'Best and worst months inside hurricane season' },
      { type: 'h3', text: 'Best: early June' },
      { type: 'p', text: 'Hurricane season technically starts June 1, but the first 3-4 weeks of June are historically quiet. Atlantic water temperatures are still warming, wind shear is high, and named storms in this window are rare and weak. Open dates are also easier to find than later in the summer.' },
      { type: 'h3', text: 'Worst: late August through September' },
      { type: 'p', text: 'Atlantic peak. Water temps at maximum, wind shear minimal, MDR (Main Development Region) most active. September 10 is statistically the single highest-activity day of the hurricane season. If you can avoid moving in late August, all of September, and the first week of October, do.' },
      { type: 'h3', text: 'Mid-tier: October and November' },
      { type: 'p', text: 'Storm activity tapers but never to zero. Late-season storms (Eta, Iota, Michael) can still be catastrophic. Move-ability is better than September but not as safe as June.' },

      { type: 'h2', text: 'How we monitor and communicate' },
      { type: 'p', text: 'During an active hurricane season, our internal process:' },
      { type: 'ul', items: [
        'Daily check of NHC tropical weather outlook',
        'Tracking any invest area that enters the Atlantic',
        'For any system reaching 30% formation probability, we pull a list of moves in the cone',
        '72 hours out, we call every client with a scheduled move in the cone',
        '48 hours out, we make rescheduling decisions and confirm in writing',
        '24 hours out, we either complete the move ahead of weather or postpone',
      ]},
      { type: 'p', text: 'You don\'t have to chase us for updates. If you booked with us and a storm enters the picture, we\'ll be the ones calling you.' },

      { type: 'callout', title: 'Booking inside hurricane season?', text: 'Easy Move Florida reschedules named-storm moves without a fee and holds your original rate. Call 786-305-1844 to talk through your timeline, or ask for a written estimate at /quote: it comes within 24 hours, with our hurricane policy in writing.' },
    ],
    related: ['south-florida-pre-move-checklist', 'miami-moving-cost-2026'],
  },

  // ─── Long-tail post #11: Snowbird season (Russian) ───────────────────────
  {
    slug: 'snowbird-pereezd-florida-osen-zima',
    title: 'Сезон snowbirds в Южной Флориде: когда и как переезжать',
    metaTitle: 'Snowbird переезд во Флориду 2026 — когда, цены, советы | Easy Move Florida',
    metaDescription: 'Полный гид по переезду snowbird в Южную Флориду: лучшие месяцы (октябрь-март), цены, дефицит лифтовых окон, бронирование за 2-3 недели. Говорим по-русски.',
    excerpt: 'Лучшие месяцы для приезда и отъезда, цены без сезонной надбавки, дефицит лифтов в Авентуре и Санни-Айлс, и почему storage между сезонами часто выгоднее, чем возить вещи туда-сюда.',
    publishedAt: '2026-05-22',
    updatedAt: '2026-11-09',
    author: 'Евгений Романов',
    readTime: '8 мин',
    category: 'Russian-Speaking',
    heroImage: '/images/Real/4.png',
    body: [
      { type: 'p', text: 'Snowbird-сезон в Южной Флориде — это период с октября по март, когда десятки тысяч людей переезжают на зиму из Нью-Йорка, Нью-Джерси, Бостона, Чикаго, Торонто, Москвы и Тель-Авива. Пик — ноябрь, декабрь и январь. В Авентуре, Санни-Айлс и Холливуде в это время переезжают чаще, чем в любой другой период года. И всё это давит на одну инфраструктуру: грузовые лифты, ограниченные окна для переездов, и одни и те же дни недели, на которые все хотят попасть.' },
      { type: 'p', text: 'Этот гид — для тех, кто живёт сезонами: октябрь приехал, март-апрель уехал, и так из года в год. Что важно знать про логистику, цены и тайминг, чтобы не платить лишнего и не застрять без лифтового окна.' },

      { type: 'h2', text: 'Цены в сезон vs межсезонье' },
      { type: 'p', text: 'Ставка у нас одна круглый год: сезонной надбавки нет. Но в snowbird-окно переезд сложнее запланировать, и он может занять больше часов. Вот почему.' },
      { type: 'ul', items: [
        'Пик-сезон (ноябрь-январь): ставка та же, что и в любой другой месяц',
        'Выходные в пик-сезон забронированы за 3-4 недели вперёд — если хотите субботу, бронируйте сейчас',
        'Самые востребованные часы (9-13 в субботу) уходят первыми и закрываются за 4-6 недель',
        'Здания вроде Williams Island, Acqualina, Trump Tower или Hemispheres требуют дополнительной координации с management: COI, окно лифта, правила дока. Мы делаем это до дня переезда и отдельно за это не берём',
      ]},
      { type: 'p', text: 'Цены 2026 на переезд внутри Южной Флориды в любой сезон считаются одинаково: часы на почасовую ставку плюс трак по ставке бригады.' },
      { type: 'ul', items: [
        'Студия: $516-$645 (3-4 часа, 2 грузчика)',
        '1 спальня: $516-$774 (3-5 часов, 2 грузчика)',
        '2 спальни: $645-$1,253 (4-6 часов, 2-3 грузчика)',
        '3 спальни: $1,253-$1,611 (6-8 часов, 3 грузчика)',
        'Упаковка, если мы пакуем всё: от $99 в час за двух упаковщиков, считается отдельно',
      ]},
      { type: 'p', text: 'Это всё с прозрачной письменной сметой, без депозита и без сюрпризов в день переезда.' },

      { type: 'h2', text: 'Бронирование лифтов: ключевой момент сезона' },
      { type: 'p', text: 'У каждого здания свои правила брони грузового лифта и свои окна для переездов. Мы узнаём актуальные правила у управляющей компании до дня переезда.' },
      { type: 'p', text: 'Что нужно делать:' },
      { type: 'ol', items: [
        'Как только знаете дату приезда (или отъезда) — связываетесь с building management',
        'Запрашиваете доступные окна на нужную неделю',
        'Бронируете окно письменно и оплачиваете депозит за лифт, если здание его требует',
        'Передаёте дату и окно вашей мувинговой компании — мы у себя фиксируем и планируем график',
        'За 5-7 дней до переезда подтверждаете с management ещё раз',
      ]},
      { type: 'callout', title: 'Совет на основе опыта', text: 'Если ваше здание предлагает переезд во вторник или среду — берите. В будни конкуренция за лифт ниже, переезд идёт быстрее, и часто получается дешевле общая сумма (за счёт того, что бригада не тратит часы в ожидании лифта).' },

      { type: 'h2', text: 'Крупные комплексы: правила у каждого свои' },
      { type: 'p', text: 'Не все здания одинаковы. В пик snowbird-сезона окна лифта в крупных комплексах расходятся быстро, а сроки и правила у каждого свои, поэтому уточняйте их у своего management заранее:' },
      { type: 'ul', items: [
        'Williams Island',
        'Acqualina и Mansions at Acqualina',
        'Trump Tower I, II, III',
        // Hemispheres, four towers: https://www.bexrealty.com/real-estate/Hallandale-Beach/The-Hemispheres/ (checked 2026-11-09)
        'Hemispheres (Hallandale Beach): комплекс из четырёх башен',
        // Porto Vita, two towers (North and South): https://www.sunnyislesmiamirealestate.com/aventura-condos/porto-vita.htm (checked 2026-11-09)
        'Porto Vita: две башни, North и South',
        'Turnberry Ocean Colony, Turnberry Ocean Club',
      ]},
      { type: 'p', text: 'То же относится к Continuum (South Beach), L\'Atelier, Faena House и малоэтажным кондо в Бал-Харбор и Surfside: бронь лифта уточняйте у management заранее.' },

      { type: 'h2', text: 'Когда лучше переехать: оптимальные окна' },
      { type: 'h3', text: 'Приезд осенью' },
      { type: 'p', text: 'Лучшее время для приезда — первая половина октября. Сезон только начинается, окна лифтов ещё свободны, погода уже комфортная, а главное — вы попадаете в Флориду до того как все остальные snowbirds начнут заполнять здания. Со второй половины октября спрос растёт, к ноябрю — пик.' },
      { type: 'h3', text: 'Возвращение весной' },
      { type: 'p', text: 'Лучшее время для отъезда — март или первая половина апреля. К концу марта пик уже прошёл, но погода ещё комфортная для переезда (вы не таскаете вещи в 35°C). Май уже ближе к hurricane season и к школьным каникулам, всё сложнее. Июнь-август — пик жары, отдельная история.' },
      { type: 'h3', text: 'Чего избегать' },
      { type: 'ul', items: [
        'Конец ноября (День Благодарения и окружающие недели) — везде всё забито',
        'Конец декабря (Рождество и Новый Год) — здания работают по holiday-расписанию, окна сокращены',
        'Первые две недели января — все приезжают разом после праздников',
        'Конец марта — все уезжают разом, особенно если совпадает с Песахом или весенними каникулами',
      ]},

      { type: 'h2', text: 'Логистика приезда после долгого отсутствия' },
      { type: 'p', text: 'Если квартира стояла закрытой 6-7 месяцев, есть несколько вещей, которые нужно сделать ДО приезда мебели или вашего собственного приезда:' },
      { type: 'ul', items: [
        'Включить AC заранее (за 24-48 часов) — иначе влажность за лето поднимется, и мебель сразу сядет в сырое',
        'Проверить, что вода и электричество включены — за день до приезда',
        'Договориться с building management о доступе для cleaning crew за 1-2 дня до вашего приезда',
        'Если у вас есть продукты длительного хранения в шкафах — проверить на предмет вредителей (особенно во Флориде)',
        'Заранее заказать groceries delivery (Instacart, Amazon Fresh) на день приезда',
      ]},
      { type: 'p', text: 'Если вы привозите ключевую мебель из основного дома — картины, любимые кресла, личные вещи — само плечо из NYC или Boston везёт межштатный перевозчик: на это нужно федеральное разрешение, которого у нас нет, и такие рейсы мы не берём и не оцениваем. Наша часть — флоридская: встретить доставку, согласовать со зданием COI и окно грузового лифта, занести и расставить.' },

      { type: 'h2', text: 'Storage между сезонами: часто выгоднее, чем возить вещи' },
      { type: 'p', text: 'Один из самых распространённых вопросов: возить ли определённые вещи туда-сюда каждый сезон, или хранить здесь?' },
      { type: 'p', text: 'Считаем так. Хранение у нашего партнёра стоит от $200 в месяц. Бокс с климат-контролем бронируется у третьей стороны, и цену называет сам склад.' },
      { type: 'p', text: 'Возить small load NY → Miami → NY дважды в год значит дважды платить межштатному перевозчику, плюс износ вещей, плюс время на координацию двух переездов. Storage обычно выходит проще, особенно если в storage идёт сезонная одежда, спортивное оборудование, какие-то предметы быта, которые не нужны на севере летом.' },
      { type: 'p', text: 'Что хорошо хранить здесь:' },
      { type: 'ul', items: [
        'Зимняя одежда (если не нужна летом дома)',
        'Велосипеды, теннисные ракетки, пляжное оборудование',
        'Дополнительная посуда, белье, кухонная утварь',
        'Лёгкие предметы мебели (тумбочки, лампы, столики) если квартира меньше дома',
        'Чемоданы, ёлочные украшения, документы для подачи taxes',
      ]},
      { type: 'p', text: 'Что НЕ стоит хранить (даже в климат-контроле):' },
      { type: 'ul', items: [
        'Вино — нужен специализированный wine storage с контролем температуры 55-65°F',
        'Дорогие меха — нужен специализированный fur storage',
        'Произведения искусства музейного уровня — нужны специализированные art storage facilities',
        'Документы (паспорта, оригиналы) — всегда с собой',
      ]},

      { type: 'h2', text: 'Чек-лист snowbird переезда' },
      { type: 'p', text: 'Для каждого сезонного переезда — приезд осенью или отъезд весной — пройдитесь по списку:' },
      { type: 'ol', items: [
        'COI оформлен и подтверждён зданием за 5-7 дней до переезда',
        'Окно лифта зарезервировано письменно, depozit оплачен',
        'Парковка для грузовика подтверждена с security/dock manager',
        'Проверено, что покрывает ваша собственная страховка (homeowners или renters) при переезде',
        'Утилиты включены/отключены на правильные даты',
        'USPS mail forwarding оформлен (форма 3575) за 7-10 дней',
        'Список вещей в storage актуализирован — что забрать, что оставить, что добавить',
        'Наш номер, 786-305-1844, сохранён в телефоне на день переезда',
        'AC включён за 24-48 часов до приезда',
        'Cleaning crew забронирован за 1-2 дня до приезда (если квартира стояла закрытой)',
      ]},

      { type: 'h2', text: 'Почему важна русскоязычная команда' },
      { type: 'p', text: 'Snowbird переезды — это не разовая операция. Это процесс, который повторяется год за годом. И между вами, нами и building management должно быть быстрое и точное общение — на всех уровнях.' },
      { type: 'p', text: 'Конкретные примеры, где это даёт реальное преимущество:' },
      { type: 'ul', items: [
        'Обсуждение деталей размещения мебели — "вот эту картину в библиотеку, аккуратнее с правым углом" звучит на русском короче и точнее',
        'Согласование с management здания — в Авентуре много русскоязычных concierge и dock managers, прямая коммуникация ускоряет процессы',
        'Объяснения по упаковке хрупких вещей — terminology на русском убирает риск недопонимания',
        'Координация на следующий сезон: требования вашего здания, ваши окна и особенности квартиры у нас уже записаны, и в следующем году часть организационной работы уже сделана',
      ]},
      { type: 'p', text: 'Владелец, Евгений Романов, сам отвечает на звонки по-русски, и старший бригады говорит по-русски.' },

      { type: 'callout', title: 'Бесплатная смета на snowbird переезд', text: 'Звоните 786-305-1844: владелец сам ответит по-русски. Бесплатная письменная смета в течение 24 часов. Бронируем лифты, оформляем COI, координируем с management здания. Без депозита.' },
    ],
    related: ['pereezd-aventura-sunny-isles-russkogovoryashchih', 'brickell-condo-move-checklist'],
  },
];

export function getBlogPost(slug: string): BlogPost | null {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
