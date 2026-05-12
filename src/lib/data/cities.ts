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
      {
        title: 'Wynwood Loft Logistics',
        body: 'Wynwood\'s converted warehouse lofts come with their own quirks — freight elevators that share with neighboring tenants, narrow alleys, and no dedicated loading zones on NW 2nd Ave during Art Walk weekends. We schedule around the district\'s busy windows and bring smaller trucks when access requires it.',
      },
      {
        title: 'Coconut Grove Gated Communities',
        body: 'Cloisters, The Grove at Grand Bay, and Grove Isle each have their own gate-access procedures and curfew rules for service vehicles. We submit vehicle and crew names ahead of time so your guard list is set before move morning — no idling at the gate while paperwork gets sorted.',
      },
      {
        title: 'Miami Beach Parking Permits',
        body: 'South Beach and Mid-Beach moves usually require a temporary loading-zone permit from the City of Miami Beach. We pull these permits 48–72 hours in advance and post them on move day, which avoids meter maids and prevents the crew from having to carry boxes an extra block.',
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
      {
        q: 'How long does a typical move from Brickell to Coconut Grove take?',
        a: 'A standard 1- or 2-bedroom move from Brickell to Coconut Grove takes 3–5 hours total — about 25 minutes of driving plus loading, unloading, and the building-access steps on both sides. Late-afternoon moves can add 15–20 minutes due to US-1 traffic.',
      },
      {
        q: 'Can you move during hurricane season?',
        a: 'Yes. June through November we monitor NHC updates and reach out 72 hours before any move with a named storm in the cone. If we reschedule for safety, there is no fee — and we hold your original slot at the same rate.',
      },
      {
        q: 'Do you handle moves out of Wynwood live-work lofts?',
        a: 'Often. Most of these buildings have shared freight elevators with hour-window reservations. We book the elevator window before the job and bring a 16-foot truck instead of a 26-footer when alley access is tight.',
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
  {
    slug: 'aventura-movers',
    name: 'Aventura',
    state: 'FL',
    county: 'Miami-Dade',
    heroHeadline: "Aventura's Premium Moving Company",
    heroSub: 'Williams Island · Porto Vita · Turnberry · Hidden Bay',
    heroImage: '/images/Real/4.png',
    metaTitle: 'Aventura Movers — EasyMove Elite | High-Rise & Condo Moving',
    metaDescription:
      "Licensed & insured movers in Aventura, FL. High-rise specialists serving Williams Island, Porto Vita, Turnberry & every Aventura building. COI within 24 hours. Russian-speaking crew. Call 786-305-1844.",
    intro:
      "Aventura is a high-rise city. Almost every move here happens between the 15th and 50th floor of a building with strict COI rules, fixed elevator windows, and management offices that won't let a crew step on the loading dock without paperwork in hand. EasyMove Elite was built for buildings like Williams Island, Porto Vita, Turnberry Isle, and Hidden Bay — we know the dock managers by name and we issue building-compliant Certificates of Insurance within 24 hours. We also speak Russian, which matters in Aventura.",
    neighborhoods: [
      'Williams Island', 'Porto Vita', 'Turnberry Isle', 'Hidden Bay',
      'Aventura Lakes', 'The Point', 'Hamptons South', 'Mystic Pointe',
      'Marina Tower', 'Atlantic III', 'Bella Vista', 'Coronado',
    ],
    localFacts: [
      {
        title: 'Williams Island & Porto Vita Specialists',
        body: "Williams Island and Porto Vita are our two most-served Aventura properties. We know the gate-house registration process, the loading dock locations behind each tower, and the building-specific COI templates. Your crew arrives knowing the building — not learning it on your time.",
      },
      {
        title: 'Russian & English Crew',
        body: "Aventura, Sunny Isles, and Bal Harbour have one of the largest Russian-speaking populations in South Florida. Our coordinator and most of our crew speak Russian fluently. If your building staff or HOA board prefers Russian — мы говорим по-русски.",
      },
      {
        title: 'COI for Aventura Towers',
        body: "Every Aventura high-rise has its own COI requirements — Williams Island wants $2M general liability, Porto Vita requires the building specifically named as additional insured, Turnberry has its own format. We've handled them all and we issue within 24 hours of confirmed booking.",
      },
    ],
    faqs: [
      {
        q: 'Do you move into and out of Williams Island?',
        a: "Yes. Williams Island is one of our most common service locations. We're registered with the gate house and familiar with the loading dock, COI requirements ($2M general liability minimum), and elevator reservation process for all five towers.",
      },
      {
        q: 'Do you speak Russian?',
        a: 'Yes — наш координатор и большая часть бригады свободно говорит по-русски. Если вам или управлению здания удобнее по-русски — без проблем.',
      },
      {
        q: 'How do you handle Aventura building elevator reservations?',
        a: "Once your move date is confirmed, we contact your building management directly to reserve the freight elevator and loading dock window. We arrive within the reserved window — no late arrivals that would push you outside the building's permitted hours.",
      },
      {
        q: 'Do you serve Bal Harbour and Bay Harbor Islands?',
        a: 'Yes. Bal Harbour, Bay Harbor Islands, Surfside, and Sunny Isles Beach are all within our daily service area — same crew, same standards.',
      },
      {
        q: 'Can you store items between move-out and move-in?',
        a: "Yes. We coordinate climate-controlled storage when there's a gap between your move-out and move-in dates — common in Aventura when buildings have specific move-in days.",
      },
    ],
  },
  {
    slug: 'coral-gables-movers',
    name: 'Coral Gables',
    state: 'FL',
    county: 'Miami-Dade',
    heroHeadline: "Coral Gables's Trusted Moving Company",
    heroSub: 'Gables Estates · Old Cutler · Cocoplum · Granada',
    heroImage: '/images/Real/5.png',
    metaTitle: 'Coral Gables Movers — EasyMove Elite | Estate & Historic Home Moving',
    metaDescription:
      'Licensed & insured movers in Coral Gables, FL. Specialists in historic homes, gated estates, and HOA-compliant moves. Serving Gables Estates, Cocoplum, Old Cutler. Call 786-305-1844.',
    intro:
      "Moving in Coral Gables is not the same as moving in Brickell. The streets are narrow, the trees are protected, the historic-preservation rules are real, and the HOAs in Cocoplum, Gables Estates, and Old Cutler are some of the strictest in South Florida. Most moving companies don't know what a Mediterranean Bonus is or why the Garden Club cares about your moving truck idling on Granada Boulevard. We do. EasyMove Elite handles Coral Gables estates, historic single-family homes, and Miracle Mile condos with the patience and protocol they require.",
    neighborhoods: [
      'Gables Estates', 'Cocoplum', 'Old Cutler', 'Granada',
      'Hammock Lakes', 'Riviera', 'High Pines', 'Snapper Creek',
      'Coral Gables Country Club', 'Coral Bay', 'Old Spanish Village', 'Miracle Mile',
    ],
    localFacts: [
      {
        title: 'Gated Estate Communities',
        body: "Gables Estates, Cocoplum, Hammock Lakes, and Snapper Creek all require advance vehicle registration, certificate of insurance with the community named, and crew identification at the gate. We submit everything 48 hours before your move so there's no holdup at the gate house.",
      },
      {
        title: 'Historic Home Specialists',
        body: "Coral Gables's historic Mediterranean and Spanish-Colonial homes have narrow doorways, original tile floors, and built-in furniture that wasn't designed to be moved. We pad door frames, lay floor runners, and handle antique pieces with the protocol they deserve.",
      },
      {
        title: 'HOA & Permit Compliance',
        body: "Many Coral Gables neighborhoods restrict moving truck parking, idle times, and weekend hours. Our coordinator confirms restrictions for your address before scheduling and arranges any required permits — you don't need to navigate City Hall yourself.",
      },
    ],
    faqs: [
      {
        q: 'Do you move into Gables Estates and Cocoplum?',
        a: "Yes. We're familiar with both communities — the gate procedures, COI requirements (typically $1M-$2M with the association named as additional insured), and approved move-in windows. We submit paperwork in advance so the gate clears your crew on arrival.",
      },
      {
        q: 'Can you handle a historic Coral Gables home with original tile?',
        a: "Yes. We protect original tile, terrazzo, and wood floors with breathable padding and runners, pad all door frames, and brief the crew specifically on the home's preservation requirements. We move museum-grade pieces — your antique pieces are in safe hands.",
      },
      {
        q: 'Do you handle Coral Gables permit requirements for moving trucks?',
        a: "Yes. Some Coral Gables streets restrict truck parking and require a permit from the City. We confirm requirements for your specific address and arrange permits in advance when needed.",
      },
      {
        q: 'Do you serve Old Cutler and Pinecrest as well?',
        a: 'Yes. Old Cutler, Pinecrest, Palmetto Bay, and South Miami are all within our daily service area.',
      },
      {
        q: 'How do you protect a Steinway or other piano?',
        a: 'Pianos are wrapped in moving blankets, secured to a piano dolly, and transported on a truck with air-ride suspension. Our crew is trained on upright, baby grand, and concert grand transport. We also coordinate with piano tuners post-move when requested.',
      },
    ],
  },
  {
    slug: 'sunny-isles-movers',
    name: 'Sunny Isles Beach',
    state: 'FL',
    county: 'Miami-Dade',
    heroHeadline: "Sunny Isles Beach's High-Rise Moving Specialists",
    heroSub: 'Trump Towers · Acqualina · Jade Beach · Porsche Design Tower',
    heroImage: '/images/Real/6.png',
    metaTitle: 'Sunny Isles Movers — EasyMove Elite | Luxury High-Rise Moving',
    metaDescription:
      'Licensed & insured movers in Sunny Isles Beach. Trump Towers, Acqualina, Jade Beach & Porsche Design Tower specialists. Russian-speaking crew. COI within 24 hours. Call 786-305-1844.',
    intro:
      "Sunny Isles Beach is Miami's vertical city — a strip of oceanfront luxury towers where every move happens through a freight elevator on a fixed time window with a dock manager watching the clock. Trump Tower I, II, and III, Acqualina, Mansions at Acqualina, Jade Beach, Jade Ocean, Porsche Design Tower, Chateau Beach — we've worked them all. We know which buildings allow weekend moves, which require a $5M COI, and which want the crew in branded uniforms. We also speak Russian, which matters in this neighborhood.",
    neighborhoods: [
      'Trump Tower I', 'Trump Tower II', 'Trump Tower III', 'Acqualina',
      'Mansions at Acqualina', 'Jade Beach', 'Jade Ocean', 'Porsche Design Tower',
      'Chateau Beach', 'Regalia', 'Muse Sunny Isles', 'Estates at Acqualina',
    ],
    localFacts: [
      {
        title: 'Tower-Specific Move Protocols',
        body: "Every oceanfront tower in Sunny Isles has its own protocol. Trump Towers require detailed advance scheduling and crew lists. Acqualina mandates specific COI language and insurance limits. Porsche Design Tower has a vehicle elevator that needs its own coordination. Our coordinator knows each building's process by heart.",
      },
      {
        title: 'Russian-Speaking Coordination',
        body: 'Sunny Isles has the largest concentration of Russian-speaking residents in South Florida. Our coordinator and crew speak Russian — мы спокойно работаем с русскоязычными клиентами и зданиями где удобнее общаться по-русски.',
      },
      {
        title: 'White-Glove Standard',
        body: "Sunny Isles residents expect — and pay for — white-glove service. Floor protection in every common area, padded blankets on every piece, photo inventory before transport, full insurance documentation. That's our default, not an upgrade.",
      },
    ],
    faqs: [
      {
        q: 'Do you move into Trump Tower I, II, or III?',
        a: "Yes. All three Trump Towers are part of our regular service. We know the dock procedures, security check-in, COI templates, and elevator reservation process for each tower.",
      },
      {
        q: 'Do you handle Acqualina and Mansions at Acqualina moves?',
        a: "Yes. Both properties are familiar to our crew. Acqualina requires specific insurance limits and COI language addressed to the association — we handle the paperwork before your move date.",
      },
      {
        q: 'Вы работаете на русском?',
        a: 'Да. Координатор и большая часть бригады свободно говорят по-русски. Если вам или управлению здания удобнее общаться по-русски — без проблем.',
      },
      {
        q: 'Can you move oversized items like artwork or sculpture?',
        a: 'Yes. Fine art, sculpture, large mirrors, and oversized installations are handled as a dedicated service — custom crating, climate-controlled transport when needed, and specialized rigging for items that require it.',
      },
      {
        q: 'Do you serve Bal Harbour and Surfside?',
        a: 'Yes. Bal Harbour, Bay Harbor Islands, Surfside, and Indian Creek are all within our daily service area.',
      },
    ],
  },
  {
    slug: 'hollywood-movers',
    name: 'Hollywood',
    state: 'FL',
    county: 'Broward',
    heroHeadline: "Hollywood's Trusted Local Moving Company",
    heroSub: 'Hollywood Beach · Emerald Hills · Hillcrest · Lakes',
    heroImage: '/images/Real/9.jpg',
    metaTitle: 'Hollywood FL Movers — EasyMove Elite | Local & Long-Distance',
    metaDescription:
      'Licensed & insured movers in Hollywood, FL. Local & long-distance specialists serving Hollywood Beach, Emerald Hills, Hillcrest & all of Hollywood. Call 786-305-1844.',
    intro:
      "Hollywood, Florida sits between Fort Lauderdale and Miami — close enough to both that most moves here are short hops, but with its own neighborhoods, building rules, and traffic quirks. Whether you're moving to Hollywood Beach, Emerald Hills, the Lakes, or one of the historic single-family neighborhoods west of US-1, EasyMove Elite handles your move with the same standards we apply in Brickell and Aventura. We're based in Hollywood — this is our home.",
    neighborhoods: [
      'Hollywood Beach', 'Emerald Hills', 'Hillcrest', 'Hollywood Lakes',
      'Oakwood Hills', 'Beverly Park', 'Park East', 'Park Side',
      'Driftwood', 'Boulevard Heights', 'Royal Poinciana', 'Stirling',
    ],
    localFacts: [
      {
        title: 'Locally Based',
        body: "EasyMove Elite is based in Hollywood. Our crews start their day here, our trucks are stored here, and many of our clients are our neighbors. That means faster response times, lower travel surcharges, and a real local presence — not a Miami company that sometimes drives north.",
      },
      {
        title: 'Hollywood Beach Condo Experience',
        body: "Hollywood Beach has dozens of condo buildings — from older oceanfront walk-ups to modern high-rises. We know the loading-dock-vs-front-entrance rules, COI requirements, and weekend move restrictions for most properties along the Boardwalk and A1A.",
      },
      {
        title: 'Single-Family Home Moves',
        body: "Emerald Hills, the Lakes, and Hollywood's historic neighborhoods have driveways, garages, and yard layouts that make full-house moves efficient. Our crew handles disassembly, padded loading, and reassembly — bed frames, dining tables, and entertainment units are put back together at destination.",
      },
    ],
    faqs: [
      {
        q: 'How long does a Hollywood-to-Miami move take?',
        a: 'A standard local move from Hollywood to Miami takes 4-6 hours total including loading, transport, and unloading. From Hollywood to Fort Lauderdale or Aventura is typically 3-5 hours. Our quote includes a written time estimate based on your specific addresses.',
      },
      {
        q: 'Do you move on Hollywood Beach?',
        a: 'Yes. Hollywood Beach is part of our daily service area. We coordinate parking and elevator access with your building management and arrive within the approved window.',
      },
      {
        q: 'How much does a local move in Hollywood cost?',
        a: "Local moves are billed hourly: $99/hr for 2 movers or $139/hr for 3 movers, with a 3-hour minimum. Truck fee starts at $79. A typical 1-bedroom move in Hollywood runs $396-$496 total. You'll see the exact estimate before booking — no surprise fees on move day.",
      },
      {
        q: 'Do you provide a COI for Hollywood condo buildings?',
        a: 'Yes. We issue Certificates of Insurance within 24 hours of your confirmed move date — addressed to your building management exactly as required. Most Hollywood Beach buildings require $1M general liability minimum.',
      },
      {
        q: 'Do you serve Hallandale Beach and Dania Beach?',
        a: 'Yes. Hallandale Beach, Dania Beach, Davie, and Pembroke Pines are all within our regular service area.',
      },
    ],
  },
  {
    slug: 'coconut-grove-movers',
    name: 'Coconut Grove',
    state: 'FL',
    county: 'Miami-Dade',
    heroHeadline: "Coconut Grove's Local Moving Company",
    heroSub: 'Center Grove · South Grove · Northeast Grove · Camp Biscayne',
    heroImage: '/images/Real/10.png',
    metaTitle: 'Coconut Grove Movers — EasyMove Elite | Historic Homes & High-Rises',
    metaDescription:
      'Licensed & insured movers in Coconut Grove, FL. Specialists in historic Grove homes, Park Grove, Grove at Grand Bay & all Coconut Grove buildings. Call 786-305-1844.',
    intro:
      "Coconut Grove is Miami's oldest neighborhood — banyan-lined streets, historic single-family homes from the 1920s, and a recent wave of luxury high-rises like Park Grove, One Park Grove, and Grove at Grand Bay. Moving here means knowing both worlds: the narrow streets and tree-canopy restrictions of Center Grove, and the loading dock protocols of the new towers along South Bayshore Drive. EasyMove Elite handles both with the same standard.",
    neighborhoods: [
      'Center Grove', 'South Grove', 'Northeast Grove', 'Camp Biscayne',
      'Park Grove', 'Grove at Grand Bay', 'One Park Grove', 'Grovenor House',
      'CocoPlum (Grove)', 'Silver Bluff', 'The Moorings', 'Fair Isle',
    ],
    localFacts: [
      {
        title: 'Historic Grove Homes',
        body: "Many Coconut Grove homes are original 1920s construction with narrow doorways, wood floors, and built-in features. We pad doorframes, lay floor runners on every walking surface, and brief the crew on protecting historic finishes. We also know which streets in Center Grove restrict moving truck access during certain hours.",
      },
      {
        title: 'Park Grove & Bay Tower Specialists',
        body: "Park Grove, One Park Grove, and Grove at Grand Bay all have specific COI requirements, freight elevator reservations, and loading dock windows. Our coordinator handles building paperwork before your move date so the crew arrives ready to work.",
      },
      {
        title: 'Tree Canopy & Street Permit',
        body: "Coconut Grove has strict tree-canopy protections — large trucks can't park under low branches in many residential blocks. We scout the address before scheduling, choose appropriate truck sizes, and arrange street permits when needed.",
      },
    ],
    faqs: [
      {
        q: 'Do you move into Park Grove and Grove at Grand Bay?',
        a: "Yes. Both properties are part of our regular service. We know the COI requirements, freight elevator process, and dock manager preferences for both buildings.",
      },
      {
        q: 'Can you handle a 1920s Coconut Grove home with narrow doorways?',
        a: "Yes. We measure doorways and stairwells in advance, pre-disassemble large pieces that won't clear, and use floor protection on original wood and tile. We've moved into and out of historic Grove homes for years.",
      },
      {
        q: 'Do Coconut Grove streets allow large moving trucks?',
        a: "Some don't — particularly in Center Grove and Camp Biscayne where tree canopy is low and streets are narrow. We confirm truck size suitability for your specific address before scheduling and arrange a smaller shuttle vehicle if your block requires it.",
      },
      {
        q: 'How does pricing work for a Coconut Grove move?',
        a: "Local moves are hourly: $99/hr for 2 movers, $139/hr for 3 movers, 3-hour minimum, plus $79 truck fee. A typical 2-bedroom Grove home runs $625-$825. Estate-sized moves get a custom flat-rate estimate. No surprise fees.",
      },
      {
        q: 'Do you serve Coral Gables and Brickell as well?',
        a: 'Yes. Coral Gables, Brickell, Downtown Miami, and Key Biscayne are all within our daily service area.',
      },
    ],
  },
];

export function getCityData(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
