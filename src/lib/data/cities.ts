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
    metaTitle: 'Miami Movers, FL | Easy Move Florida',
    metaDescription:
      'Licensed Miami movers — Brickell, Coral Gables, Miami Beach, Coconut Grove high-rises. Founder-led, COI in 24h. From $129/hr. Call 786-305-1844.',
    intro:
      "Moving in Miami means navigating some of the most demanding logistics in the country — Brickell's loading dock windows, Coral Gables HOA requirements, South Beach elevator reservations, and I-95 at the wrong hour. Easy Move Florida was built in Miami-Dade and every crew we send is briefed on your building before they arrive.",
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
        // [TODO: confirm exact named-storm reschedule policy with Evgenii]
        q: 'Can you move during hurricane season?',
        a: 'Yes. June through November we monitor NHC updates and reach out 72 hours before any move with a named storm in the cone. Named-storm reschedules are handled without penalty — call us and we work out a new date at your locked rate.',
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
    metaTitle: 'Fort Lauderdale Movers | Easy Move Florida',
    metaDescription:
      'Licensed & insured movers in Fort Lauderdale & Broward County. Serving Las Olas, Victoria Park, Wilton Manors & all of Broward. Founder-led, COI available.',
    intro:
      "Fort Lauderdale's mix of waterfront estates, mid-rise condos, and historic bungalows each require different expertise. Easy Move Florida has served Broward County clients across every neighborhood — from Las Olas Boulevard high-rises to Plantation family homes — with the same crew, the same standards, and direct access to the founder.",
    neighborhoods: [
      'Las Olas', 'Victoria Park', 'Wilton Manors', 'Lauderdale-by-the-Sea',
      'Hollywood', 'Hallandale Beach', 'Deerfield Beach', 'Pompano Beach',
      'Plantation', 'Davie', 'Weston', 'Cooper City', 'Miramar',
    ],
    // [TODO: Evgenii — real FTL/Boca building specifics: named Las Olas towers we regularly serve, actual dock/elevator quirks]
    localFacts: [
      {
        title: 'Two Kinds of Fort Lauderdale Moves',
        body: "Most Fort Lauderdale work falls into two patterns: waterfront single-family homes along the canals (Rio Vista, Las Olas Isles, Coral Ridge, Seven Isles) and condo moves in the towers on and around Las Olas Boulevard. The homes need truck-access planning — narrow drives, low tree canopy, sometimes a smaller shuttle truck. The condos need paperwork — COI, freight elevator reservation, dock window. We plan for the right one before move day, not on it.",
      },
      {
        title: 'Waterfront & Canal Homes — Check Access First',
        body: "Canal-front streets in Rio Vista and Las Olas Isles often can't take a 26-foot truck to the door. Before we schedule, we review your street and driveway by map and video; if access is tight we bring a 16-footer or plan a short shuttle. If any items arrive or leave by boat dock, tell us in advance — dock rules vary by property, and we confirm access with your HOA or management before move day.",
      },
      {
        title: 'Las Olas Condo Paperwork',
        body: "Las Olas-area towers require a COI and a reserved freight elevator window before a crew is allowed in. Building rules vary — we confirm your building's exact COI format, elevator schedule, and dock location with management before move day, and we issue the COI within 24 hours of your confirmed booking.",
      },
      {
        title: 'Broward HOA Compliance',
        body: 'Many Broward communities — from Weston to Cooper City — have strict move-in windows, elevator reservations, and insurance requirements. We confirm all details with your HOA before arrival.',
      },
      {
        title: 'Convenient Staging for Long-Distance',
        body: "Fort Lauderdale is a common staging point for moves up I-95 or across the state.",
      },
    ],
    faqs: [
      {
        q: 'How much does a move in Fort Lauderdale cost?',
        a: 'Local moves are hourly: $129/hr for 2 movers or $179/hr for 3, with a 3-hour minimum, plus a truck fee per day charged at the crew rate ($129 with two movers, $179 with three), a separate line on your estimate (fuel, tolls, and mileage are inside it — no fuel surcharge). A 1-bedroom Las Olas condo typically takes 3–5 hours: $516–$774 all-in. A 2-bedroom runs 4–6 hours with 2–3 movers: $645–$1,253. A 3-bedroom canal-front home usually takes 6–8 hours with 3 movers: $1,253–$1,611. The rate is locked — it does not go up for weekends or if the job runs long.',
      },
      {
        q: 'How long does a waterfront home move in Fort Lauderdale take?',
        a: "A 3-bedroom single-family home in Rio Vista or Coral Ridge usually takes 6–8 hours with a 3-mover crew — about $1,253–$1,611 at $179/hr plus the $179 truck line. Tight canal-street access can add time (a shuttle truck or longer carry is priced as hours, not fees), which is why we check your street before scheduling and put a realistic range in your written estimate.",
      },
      {
        q: 'Do you serve all of Broward County?',
        a: 'Yes — from Hollywood and Hallandale Beach in the south to Deerfield Beach and Pompano Beach in the north, and inland through Plantation, Davie, Weston, and Cooper City.',
      },
      {
        q: 'Can you handle waterfront property moves in Fort Lauderdale?',
        a: "Yes. We work waterfront and marina-adjacent properties regularly — limited dock access, narrow drives, and the requirements common to Las Olas-area towers. Building and dock rules vary, so we confirm specifics with your HOA or management before move day.",
      },
      {
        q: 'What should I check with my building or HOA before a Fort Lauderdale move?',
        a: "Three things: your building's COI requirements (send them to us — we issue within 24 hours of booking), the freight elevator reservation window, and any move-in day or hour restrictions. For gated or waterfront communities, ask whether service vehicles need advance registration. We handle all of this paperwork for you once you share your management contact.",
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
    metaTitle: 'Boca Raton Movers, FL | Easy Move Florida',
    metaDescription:
      'Boca Raton movers — Boca West, Mizner Park, Delray Beach estate and gated community specialists. Fully insured, COI in 24h. Call 786-305-1844.',
    intro:
      "Boca Raton's gated communities, estate homes, and luxury condos demand a level of care that most moving companies simply cannot provide. Easy Move Florida specializes in high-value residential moves throughout Palm Beach County — with crews trained in fine art handling, furniture protection, and the discretion that Boca Raton clients expect.",
    neighborhoods: [
      'East Boca Raton', 'Mizner Park', 'Royal Palm Yacht & Country Club', 'Boca West',
      'Broken Sound', 'Delray Beach', 'Boynton Beach', 'Lake Worth',
      'Wellington', 'Palm Beach Gardens', 'West Palm Beach',
    ],
    // [TODO: Evgenii — real FTL/Boca building specifics: which gated communities we've actually worked, their registration lead times]
    localFacts: [
      {
        title: 'Gated Communities Drive the Schedule',
        body: "The typical Boca move happens inside a gated community — Boca West, Broken Sound, Royal Palm, Woodfield, St. Andrews. These communities require advance vehicle registration, crew ID lists, and approved move windows, and each sets its own rules — we confirm the exact requirements with your HOA or management before move day, so the gate clears your crew instead of stalling it.",
      },
      {
        title: 'Estate & Luxury Home Moves',
        body: "Boca Raton's estates often contain fine art, antiques, custom furniture, and high-value collections. Every item is inventoried, wrapped to our standard, and handled by experienced movers — not day laborers. Larger estates get a video or in-person walkthrough first, so the written estimate reflects the real scope, including garage, patio, and storage rooms.",
      },
      {
        title: 'What to Check Before Move Day',
        body: "Before booking, ask your HOA three questions: does the community require vehicle/crew registration and how far in advance; what are the permitted move days and hours; and does the association require a COI naming it. Community rules vary — we confirm the answers with your HOA or management directly once you share the contact, and we issue the COI within 24 hours of booking.",
      },
      {
        title: 'Discretion & Privacy',
        body: "Many of our Palm Beach County clients include executives, collectors, and families who value privacy. We operate with full confidentiality and never disclose client information.",
      },
    ],
    faqs: [
      {
        q: 'How much does a move in Boca Raton cost?',
        a: 'Hourly, like all our local work: $129/hr for 2 movers, $179/hr for 3, 3-hour minimum, plus a truck fee per day at the crew rate ($129 with two movers, $179 with three), shown as its own line on the estimate — fuel, tolls, and mileage are inside it. Typical totals: a 1-bedroom condo takes 3–5 hours ($516–$774), a 2-bedroom takes 4–6 hours with 2–3 movers ($645–$1,253), and a 3-bedroom home in a gated community takes 6–8 hours with 3 movers ($1,253–$1,611). Larger estates get a custom written estimate after a walkthrough. No weekend or peak-season surcharges — the rate is locked.',
      },
      {
        q: 'Do you move within gated communities in Boca Raton?',
        a: 'Yes — Boca West, Broken Sound, Royal Palm, and similar communities are part of our service area. We register vehicles and crew in advance, provide required insurance certificates, and work within your community\'s move windows. Rules differ by community, so we confirm the specifics with your HOA before move day.',
      },
      {
        q: 'How long does a Boca Raton estate move take?',
        a: "A 3-bedroom single-family home typically takes 6–8 hours with a 3-mover crew — $1,253–$1,611 at $179/hr plus the $179 truck line. Larger estates with fine art or a pre-pack day are scoped individually: some are one day, others two. We give a realistic timeline in the written estimate rather than rushing the job to fit a number.",
      },
      {
        q: 'What does my HOA need from you before the move?',
        a: "Usually three things: a COI naming the association (we issue it within 24 hours of booking), the truck plate and crew names for the gate list, and confirmation that the move falls inside approved hours. Requirements vary by community — we contact your HOA or management directly and handle the paperwork before move day.",
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
    metaTitle: 'Aventura Movers — High-Rise & Condo | Easy Move Florida',
    metaDescription:
      "Licensed & insured movers in Aventura, FL. High-rise specialists serving Williams Island, Porto Vita, Turnberry & every Aventura building. COI within 24 hours. Russian-speaking crew. Call 786-305-1844.",
    intro:
      "Aventura is a high-rise city. Almost every move here happens between the 15th and 50th floor of a building with strict COI rules, fixed elevator windows, and management offices that won't let a crew step on the loading dock without paperwork in hand. Easy Move Florida was built for buildings like Williams Island, Porto Vita, Turnberry Isle, and Hidden Bay — we know the dock managers by name and we issue building-compliant Certificates of Insurance within 24 hours. We also speak Russian, which matters in Aventura.",
    neighborhoods: [
      'Williams Island', 'Porto Vita', 'Turnberry Isle', 'Hidden Bay',
      'Aventura Lakes', 'The Point', 'Hamptons South', 'Mystic Pointe',
      'Marina Tower', 'Atlantic III', 'Bella Vista', 'Coronado',
    ],
    localFacts: [
      {
        title: 'Williams Island & Porto Vita Specialists',
        body: "We work in Williams Island and Porto Vita regularly — gate-house registration, the loading dock locations behind each tower, and building-specific COI paperwork are part of the standard prep. Your crew arrives knowing the process — not learning it on your time.",
      },
      {
        title: 'Russian & English Crew',
        body: "Aventura, Sunny Isles, and Bal Harbour have one of the largest Russian-speaking populations in South Florida. Our coordinator and most of our crew speak Russian fluently. If your building staff or HOA board prefers Russian — мы говорим по-русски.",
      },
      {
        // [TODO: confirm exact building COI limits with Evgenii]
        title: 'COI for Aventura Towers',
        body: "Every Aventura high-rise has its own COI requirements — many buildings here require limits in the $1M–$2M range, and some want the association specifically named as additional insured. We confirm your building's exact requirements before move day and issue the COI within 24 hours of confirmed booking.",
      },
          {
        title: 'Furniture & Single-Item Delivery',
        body: 'Bought a sofa, a dining set or a mattress and just need it brought up the tower? Single-item and furniture delivery is a standing service, not a favor — pickup, wrapping, transport and placement by the same insured crews that run full moves. Pick-up-and-deliver jobs are one of the services clients hire us for most on Thumbtack.',
      },
      {
        title: 'Mystic Pointe, Hidden Bay & the East Towers',
        body: 'The towers off Country Club Dr — Mystic Pointe, Hidden Bay, the Peninsula, Bella Vista — each run their own service-elevator diary and guard-gate list. We book the elevator window, send the COI to management, and get crew names to the front desk before move morning, so the truck is not idling at a guardhouse while paperwork gets sorted.',
      },
      {
        title: 'Packing Crews Before Moving Day',
        body: 'For tower apartments we usually pack the day before, so the reserved elevator window on move day is spent moving, not boxing. Tell the coordinator what stays and what goes; fragile pieces, art and mirrored furniture get wrapped first.',
      },
    ],
    faqs: [
      {
        q: 'How much do movers in Aventura cost?',
        a: 'Two movers are $129 per hour and three are $179, with a three-hour minimum, plus the truck as its own line at the crew rate per day. A studio or one-bedroom inside Aventura typically lands near the minimum. The full math with examples is on our Aventura moving-cost page.',
      },
      {
        q: 'Can you deliver a single piece of furniture in Aventura?',
        a: 'Yes — single-item and furniture delivery is part of what we do daily, with the same wrapping and the same insured crew as a full move. Call 786-305-1844 with the pickup and drop-off addresses and we will quote it in minutes.',
      },
      {
        // [TODO: confirm exact building COI limits with Evgenii]
        q: 'Do you move into and out of Williams Island?',
        a: "Yes. Williams Island is one of our most common service locations. We handle the gate-house registration, loading dock coordination, and elevator reservation process. Many buildings here require COI limits in the $1M–$2M range — we confirm your building's exact requirements before move day.",
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
    metaTitle: 'Coral Gables Movers, FL | Easy Move Florida',
    metaDescription:
      'Coral Gables movers — historic homes & gated estates. Gables Estates, Cocoplum, Old Cutler. HOA-compliant, fully insured. Call 786-305-1844.',
    intro:
      "Moving in Coral Gables is not the same as moving in Brickell. The streets are narrow, the trees are protected, the historic-preservation rules are real, and the HOAs in Cocoplum, Gables Estates, and Old Cutler are some of the strictest in South Florida. Most moving companies don't know what a Mediterranean Bonus is or why the Garden Club cares about your moving truck idling on Granada Boulevard. We do. Easy Move Florida handles Coral Gables estates, historic single-family homes, and Miracle Mile condos with the patience and protocol they require.",
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
        // [TODO: confirm exact building COI limits with Evgenii]
        q: 'Do you move into Gables Estates and Cocoplum?',
        a: "Yes. We work in both communities — gate procedures, COI paperwork, and approved move-in windows. Many communities here require COI limits in the $1M–$2M range with the association named as additional insured — we confirm your community's exact requirements before move day and submit paperwork in advance so the gate clears your crew on arrival.",
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
    metaTitle: 'Sunny Isles Movers, FL | Easy Move Florida',
    metaDescription:
      'Sunny Isles movers — Acqualina, Trump Towers, Jade Beach, Porsche Design specialists. Russian-speaking crew. COI in 24h. Call 786-305-1844.',
    // [TODO: confirm exact building COI limits with Evgenii]
    intro:
      "Sunny Isles Beach is Miami's vertical city — a strip of oceanfront luxury towers where every move happens through a freight elevator on a fixed time window with a dock manager watching the clock. Trump Tower I, II, and III, Acqualina, Mansions at Acqualina, Jade Beach, Jade Ocean, Porsche Design Tower, Chateau Beach — we work in these buildings. Each tower sets its own rules on weekend moves, COI limits (many here require $1M–$2M coverage — we confirm your building's exact requirements before move day), and crew presentation. We also speak Russian, which matters in this neighborhood.",
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
          {
        title: 'Winston Towers & the Older Collins Ave Buildings',
        body: 'Not every Sunny Isles building is a new glass tower. Winston Towers and the older Collins Ave co-ops come with smaller freight cabs, longer service corridors and stricter move hours — so we book longer elevator windows there, bring floor runners and door-frame protection, and keep the crew size matched to the corridor, not just the apartment.',
      },
      {
        title: 'Furniture & Single-Item Delivery Along Collins',
        body: 'A single sofa to the 30th floor is a real job here: service elevator, building paperwork, wrapping. We run single-item and furniture deliveries along Collins Ave with the same insured crews that handle full moves — pick-up-and-deliver work is one of the services clients hire us for most on Thumbtack.',
      },
      {
        title: 'Packing for Oceanfront Apartments',
        body: 'Oceanfront units are heavy on glass, mirrors and art. We usually send a packing crew the day before the move, wrap fragile pieces first, and leave the reserved elevator window for moving rather than boxing.',
      },
    ],
    faqs: [
      {
        q: 'How much do movers in Sunny Isles Beach cost?',
        a: 'Two movers are $129 per hour and three are $179, three-hour minimum, plus the truck as its own line at the crew rate per day. Tower moves usually run with three movers because of elevator windows. Worked examples are on our Sunny Isles moving-cost page.',
      },
      {
        q: 'Do you move people out of Winston Towers?',
        a: 'Yes — regularly. Winston Towers has its own freight-elevator booking and move-hour rules, and the cabs are smaller than in the new towers, so we plan the load order around them. The COI goes to management ahead of the date, and the crew arrives already briefed.',
      },
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
    metaTitle: 'Hollywood FL Movers | Easy Move Florida',
    metaDescription:
      'Hollywood FL movers — Hollywood Beach, Emerald Hills, Hillcrest. From $129/hr. Call 786-305-1844.',
    intro:
      "Hollywood, Florida sits between Fort Lauderdale and Miami — close enough to both that most moves here are short hops, but with its own neighborhoods, building rules, and traffic quirks. Whether you're moving to Hollywood Beach, Emerald Hills, the Lakes, or one of the historic single-family neighborhoods west of US-1, Easy Move Florida handles your move with the same standards we apply in Brickell and Aventura. We're based in Hollywood — this is our home.",
    neighborhoods: [
      'Hollywood Beach', 'Emerald Hills', 'Hillcrest', 'Hollywood Lakes',
      'Oakwood Hills', 'Beverly Park', 'Park East', 'Park Side',
      'Driftwood', 'Boulevard Heights', 'Royal Poinciana', 'Stirling',
    ],
    localFacts: [
      {
        title: 'Locally Based',
        body: "Easy Move Florida is based in Hollywood. Our crews start their day here, our trucks are stored here, and many of our clients are our neighbors. That means faster response times, lower travel surcharges, and a real local presence — not a Miami company that sometimes drives north.",
      },
      {
        title: 'Hollywood Beach Condo Experience',
        body: "Hollywood Beach has dozens of condo buildings — from older oceanfront walk-ups to modern high-rises. We know the loading-dock-vs-front-entrance rules, COI requirements, and weekend move restrictions for most properties along the Boardwalk and A1A.",
      },
      {
        title: 'Single-Family Home Moves',
        body: "Emerald Hills, the Lakes, and Hollywood's historic neighborhoods have driveways, garages, and yard layouts that make full-house moves efficient. Our crew handles disassembly, padded loading, and reassembly — bed frames, dining tables, and entertainment units are put back together at destination.",
      },
          {
        title: 'Based at 2130 Stirling Rd — Hollywood Is Home',
        body: 'Our shop and trucks live on Stirling Rd, which means a Hollywood crew is not fighting I-95 from Miami to reach you. Morning slots start on time, and if a job runs long, the next crew is minutes away — not an hour of traffic away.',
      },
      {
        title: 'Same-Day & Last-Minute Moves',
        body: 'Closings slip, leases end early, plans change. Short-notice and last-minute jobs are a normal part of our week, not an exception — it is one of the things our Thumbtack profile is hired for. Call before early afternoon and we will tell you honestly whether today is still possible, and with which crew.',
      },
      {
        title: 'Young Circle & Downtown Walk-Ups',
        body: 'The apartments around Young Circle and along Hollywood Blvd are often walk-ups with street loading. Stairs cost time, not surcharges — the rate stays $129 or $179 per hour, and the crew brings shoulder straps and door protection sized for older stairwells.',
      },
    ],
    faqs: [
      {
        q: 'Can you move me on short notice in Hollywood?',
        a: 'Often, yes. We keep short-notice work as a normal part of the schedule, and being based on Stirling Rd means a crew can reach any Hollywood address quickly. Call 786-305-1844 — if today is not honest, we will say so and hold tomorrow’s first slot instead.',
      },
      {
        q: 'Do you deliver single furniture items in Hollywood?',
        a: 'Yes. Single-item and furniture delivery — a couch, an appliance, a marketplace find — runs with the same insured crews as full moves. Pickup, wrapping, transport and placement, quoted over the phone in minutes.',
      },
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
        a: "A typical 1-bedroom move in Hollywood runs $516–$774 all-in. Here's the math: $129/hr for 2 movers (or $179/hr for 3), 3-hour minimum, plus a truck fee per day charged at the crew rate ($129 with two movers, $179 with three), a separate line on your estimate — fuel, tolls, and mileage are inside it, no fuel surcharge. A 2-bedroom takes 4–6 hours with 2–3 movers ($645–$1,253); a 3-bedroom home runs 6–8 hours with 3 movers ($1,253–$1,611). The rate is locked — it doesn't go up for weekends or long jobs.",
      },
      {
        // [TODO: confirm exact building COI limits with Evgenii]
        q: 'Do you provide a COI for Hollywood condo buildings?',
        a: "Yes. We issue Certificates of Insurance within 24 hours of your confirmed move date — addressed to your building management exactly as required. Many buildings here require COI limits in the $1M–$2M range — we confirm your building's exact requirements before move day.",
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
    metaTitle: 'Coconut Grove Movers, FL | Easy Move Florida',
    metaDescription:
      'Coconut Grove movers — historic Grove homes, Park Grove, Grove at Grand Bay specialists. Fully insured, COI in 24h. Call 786-305-1844.',
    intro:
      "Coconut Grove is Miami's oldest neighborhood — banyan-lined streets, historic single-family homes from the 1920s, and a recent wave of luxury high-rises like Park Grove, One Park Grove, and Grove at Grand Bay. Moving here means knowing both worlds: the narrow streets and tree-canopy restrictions of Center Grove, and the loading dock protocols of the new towers along South Bayshore Drive. Easy Move Florida handles both with the same standard.",
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
        a: "Yes. We measure doorways and stairwells in advance, pre-disassemble large pieces that won't clear, and use floor protection on original wood and tile. Historic Grove homes are a regular part of our work.",
      },
      {
        q: 'Do Coconut Grove streets allow large moving trucks?',
        a: "Some don't — particularly in Center Grove and Camp Biscayne where tree canopy is low and streets are narrow. We confirm truck size suitability for your specific address before scheduling and arrange a smaller shuttle vehicle if your block requires it.",
      },
      {
        q: 'How does pricing work for a Coconut Grove move?',
        a: "Expect $645–$1,253 all-in for a typical 2-bedroom Grove home — that's 4–6 hours at $129/hr (2 movers) or $179/hr (3 movers), 3-hour minimum, plus the truck on its own estimate line, charged per day at that crew's rate ($129 with two movers, $179 with three) (fuel, tolls, and mileage included in it). A 1-bedroom runs 3–5 hours: $516–$774. Stairs, long carries from narrow streets, and elevator waits cost time, not fees — they're priced into the hours we estimate. Estate-sized moves get a custom written estimate.",
      },
      {
        q: 'Do you serve Coral Gables and Brickell as well?',
        a: 'Yes. Coral Gables, Brickell, Downtown Miami, and Key Biscayne are all within our daily service area.',
      },
    ],
  },
  {
    slug: 'doral-movers',
    name: 'Doral',
    state: 'FL',
    county: 'Miami-Dade',
    heroHeadline: "Doral's Corporate & Residential Moving Company",
    heroSub: 'Doral Isles · Vintage Estates · Doral Park · Trump National',
    heroImage: '/images/Real/2.png',
    metaTitle: 'Doral Movers, FL | Easy Move Florida',
    metaDescription:
      'Doral movers — Doral Isles, Vintage Estates, Trump National. Corporate relocations, MIA-adjacent logistics, trilingual EN/RU/Spanish crew. COI in 24h. Call 786-305-1844.',
    intro:
      "Doral is unlike any other city in Miami-Dade. It's part residential boomtown, part Latin American corporate headquarters, and part industrial logistics corridor — all wedged between Miami International Airport and the Everglades. Moving here means juggling three very different jobs at once: corporate relocations into Trump National Doral and Costa Del Sol townhouses, family moves into Doral Isles and Vintage Estates, and warehouse-to-warehouse business moves along NW 36th Street and the airport industrial belt. Our crew speaks English, Russian, and Spanish — which matters more in Doral than anywhere else in Miami-Dade, because the building managers, gate guards, and HOA boards here often default to Spanish. We handle the COI paperwork, the gate clearances, and the cross-border corporate paperwork that comes with relocating an executive from Caracas, Bogotá, or São Paulo into a Doral home.",
    neighborhoods: [
      'Doral Isles', 'Vintage Estates', 'Doral Park', 'Trump National Doral',
      'Costa Del Sol', 'Grand Bay', 'Doral Cay', 'Islands at Doral',
      'Doral Estates', 'Downtown Doral', 'CityPlace Doral', 'Doral Meadow Park',
    ],
    localFacts: [
      {
        title: 'Corporate & Executive Relocations',
        body: "Doral hosts the Latin American headquarters of dozens of multinationals — Univision, Carnival, Ryder, Perry Ellis, and most major Latin American bank branches. We handle inbound executive relocations from Caracas, Bogotá, Mexico City, and São Paulo into Doral Isles and Trump National. We coordinate with relocation managers, issue corporate COIs naming the employer, and provide itemized inventory for expense reimbursement.",
      },
      {
        title: 'Trilingual Crew — English, Spanish, Russian',
        body: "Doral is roughly 80% Latino, and most gate guards, HOA boards, and building managers operate in Spanish by default. Our coordinator and lead crew members are fluent in Spanish — hablamos español con su HOA, los guardias de la garita, y la administración del edificio. We also handle Russian-speaking clients (мы говорим по-русски) and of course English. No interpreter needed, no message lost in translation.",
      },
      {
        title: 'MIA Airport-Adjacent Logistics',
        body: "Doral sits directly north of Miami International Airport, which makes it the natural staging point for international relocations. We coordinate Miami-side handling for clients shipping in from Latin America, the Caribbean, and Europe — receiving containers at the freight forwarder, last-mile delivery into your Doral home, and unpacking on arrival. International inbound moves are part of our regular Doral work.",
      },
      {
        title: 'Gated Community Protocols',
        body: "Doral Isles, Vintage Estates, Costa Del Sol, and Trump National all have full gate-house registration, vehicle/crew name submission requirements, and approved move-in windows. Our coordinator submits all paperwork 48 hours in advance — vehicle plates, crew IDs, COI in the format the community requires — so your crew clears the gate without a 20-minute wait that eats your hourly billing.",
      },
      {
        title: 'Doral Industrial & Warehouse Corridor',
        body: "Doral's northwest quadrant — along NW 36th, NW 41st, and the airport industrial belt — is one of the largest light-industrial corridors in Florida. We handle small-office and warehouse relocations within Doral, coordinating with loading dock managers, freight elevator schedules, and after-hours building access. Most commercial moves here happen overnight or on weekends to avoid disrupting business operations.",
      },
      {
        title: 'Downtown Doral & CityPlace Tower Moves',
        // [TODO: confirm exact building COI limits with Evgenii]
        body: "Downtown Doral and CityPlace Doral have brought a new wave of mid-rise residential towers to a city that was historically single-family. These newer buildings — 5500 University, Doral View, Park Square — come with COI requirements (many in the $1M–$2M range), freight elevator reservations, and specific move-in/move-out windows. We confirm your building's exact requirements before move day.",
      },
    ],
    faqs: [
      {
        q: '¿Hablan español? Do you have Spanish-speaking movers?',
        a: 'Sí, claro. Nuestro coordinador y la mayoría del equipo hablan español con fluidez — coordinamos con el HOA, la administración del edificio, y los guardias de la garita sin problema. We coordinate the entire move in Spanish if that\'s your preference, including the written estimate, COI request, and on-site direction with the crew.',
      },
      {
        q: 'Do you handle corporate relocations into Doral?',
        a: 'Yes — corporate and executive relocations are one of our most common Doral jobs. We work with HR departments, global mobility teams, and relocation management companies. Corporate COIs (naming the employer as additional insured), itemized inventory for expense reports, and white-glove handling are standard. We\'ve relocated executives into Trump National Doral, Doral Isles, Costa Del Sol, and Grand Bay from Caracas, Bogotá, Mexico City, and São Paulo.',
      },
      {
        q: 'Do you move into Trump National Doral residences?',
        a: 'Yes. Trump National Doral residences have gate-house registration, advance vehicle clearance, and specific COI requirements. We submit all paperwork 48 hours before your move so the crew clears security without delay.',
      },
      {
        q: 'Can you handle an international inbound move from Latin America into Doral?',
        a: 'Yes — this is one of our specialties. We coordinate with your overseas freight forwarder, receive your container at the Miami port or airport, handle Miami-side customs paperwork coordination, and deliver and unpack at your Doral home. Common inbound origins: Caracas, Bogotá, Mexico City, São Paulo, Buenos Aires, Lima, Santiago, Madrid.',
      },
      {
        q: 'How does pricing work for a Doral move?',
        a: 'Local moves are hourly: $129/hour for 2 movers or $179/hour for 3, 3-hour minimum, plus a truck fee per day at the crew rate ($129 with two movers, $179 with three) as its own line on the estimate — fuel, tolls and mileage are inside it. A typical 2-bedroom Doral Isles townhouse takes 4–6 hours with 2–3 movers: $645–$1,253 all-in. The rate is the same seven days a week. Corporate relocations get an itemized written estimate with line items suitable for HR reimbursement.',
      },
      {
        q: 'Do you serve Doral Isles and Vintage Estates?',
        a: 'Yes — both are part of our regular Doral service. We know the gate-house registration process for each community, the COI formats their HOAs require, and the approved move-in windows. Same-day crew availability is often possible — call 786-305-1844 to check.',
      },
      {
        q: 'Do you handle small-office and warehouse moves in the Doral industrial corridor?',
        a: 'Yes. We handle commercial moves along NW 36th, NW 41st, and the airport industrial belt — after-hours and weekend windows are common to avoid disrupting business operations. We coordinate loading dock access, freight elevator reservations, and crew scheduling around your building manager\'s requirements.',
      },
    ],
  },
  {
    slug: 'hallandale-beach-movers',
    name: 'Hallandale Beach',
    state: 'FL',
    county: 'Broward',
    heroHeadline: "Hallandale Beach's Oceanfront Moving Specialists",
    heroSub: 'Diplomat · Beach Club · Hyde Resort · Hemispheres · Olympus',
    heroImage: '/images/Real/6.png',
    metaTitle: 'Hallandale Beach Movers, FL | Easy Move Florida',
    metaDescription:
      'Hallandale Beach movers — Diplomat, Beach Club Towers, Hyde Resort, Hemispheres. Oceanfront tower COI specialists, Russian-speaking crew. Call 786-305-1844.',
    intro:
      "Hallandale Beach is a half-mile-wide strip of oceanfront towers, casino-adjacent condo complexes, and the dense snowbird buildings on the west side of the Intracoastal. Every move here is a high-rise move — Diplomat Beach Resort residences, Beach Club Towers, Hyde Resort, Hemispheres, Olympus, Three Islands — and every one of these buildings has its own COI requirements, freight elevator reservation system, and parking permit rules for A1A and Hallandale Beach Boulevard. We're based in Hollywood, ten minutes north, which makes us the most efficient mover for Hallandale work: no I-95 surcharge, same-day crew availability, and we know the dock manager at the Diplomat by name. Russian-speaking residents from Sunny Isles and Aventura have been spilling north into Hallandale's oceanfront towers for years — мы говорим по-русски и работаем с русскоязычной аудиторией постоянно.",
    neighborhoods: [
      'Diplomat Beach Resort', 'Beach Club Towers', 'Hyde Resort & Residences',
      'Hemispheres', 'Olympus', 'Three Islands', 'The Plaza',
      'Parc Central', 'Beach Walk', 'Eastside', 'Golden Isles', 'Gulfstream Park',
    ],
    localFacts: [
      {
        // [TODO: confirm exact building COI limits with Evgenii]
        title: 'Oceanfront Tower COI Requirements',
        body: "Hallandale Beach's oceanfront towers set some of the strictest COI requirements in Broward County. Beach Club Towers, the Diplomat residences and Hyde Resort each specify their own format — many buildings here require limits in the $1M–$2M range, and some ask for the association named exactly as written in their bylaws plus a waiver of subrogation. We confirm your building's exact requirements before move day and issue the COI within 24 hours of your confirmed booking.",
      },
      {
        title: 'A1A & Hallandale Beach Blvd Parking Permits',
        body: "Parking a moving truck on A1A or Hallandale Beach Boulevard requires a temporary loading-zone permit from the city — meter maids are aggressive here, especially in the November-April high season. We pull permits 48-72 hours in advance and post them on the truck the morning of your move. That avoids the $50-150 ticket and prevents the crew from having to carry boxes an extra block in the heat.",
      },
      {
        title: 'Snowbird Season Specialists (October–March)',
        body: "Hallandale Beach has one of the highest snowbird concentrations in Broward County. From October through March we run weekly inbound moves from New York, New Jersey, Massachusetts, Quebec, and Ontario into Hemispheres, Olympus, Three Islands, and the Beach Club. Return-trip storage between seasons, climate-controlled storage for snowbird furniture, and partial-pack services for the items that stay behind are all part of the package.",
      },
      {
        title: 'Russian-Speaking Crew',
        body: 'Sunny Isles, Aventura, and Hallandale Beach form the largest Russian-speaking corridor in South Florida — and the Russian community has been spilling north into Hallandale\'s oceanfront towers and the Three Islands condos for a decade. Наш координатор и большая часть бригады свободно говорят по-русски. Если вам или управлению здания удобнее по-русски — без проблем.',
      },
      {
        title: 'Hollywood-Based — No I-95 Surcharge',
        body: "We're based ten minutes north in Hollywood, which makes us the most efficient mover for Hallandale Beach jobs. No travel surcharge from Miami, same-day crew availability, and our trucks are already on this side of the county line. Most Miami-based movers add a travel charge for Broward jobs — we don't, because this is our backyard.",
      },
      {
        title: 'Gulfstream Park & West-Side Buildings',
        body: "The west side of Hallandale — Gulfstream Park, Three Islands, the Hemispheres complex — has its own logistics. Three Islands is a sprawling four-tower property with shared dock access and a strict elevator reservation system. We know which tower entrance to use, the dock window for each building, and the security desk's preferred check-in process.",
      },
          {
        title: 'Furniture & Single-Item Delivery',
        body: 'A new dining set to a Beach Club tower or a marketplace sofa across Three Islands — single-item delivery is a standing service with the same insured crews that run full moves: pickup, wrapping, transport, placement. It is one of the services clients hire us for most on Thumbtack.',
      },
    ],
    faqs: [
      {
        q: 'Do you move into the Diplomat Beach Resort residences?',
        a: "Yes. The Diplomat residences are part of our regular service. We know the loading dock location, the security check-in process, the COI format the building requires, and the freight elevator reservation window. The Diplomat is also a working hotel — we coordinate with hotel operations to avoid the bell-staff loading zone during peak check-in hours.",
      },
      {
        q: 'Do you handle Beach Club Towers and Hyde Resort moves?',
        // [TODO: confirm exact building COI limits with Evgenii]
        a: 'Yes — both buildings are in our service area. Each has its own COI format, additional-insured language and freight elevator reservation system; many buildings here require limits in the $1M–$2M range. We confirm your building\'s exact requirements before move day, submit the COI within 24 hours of booking, and reserve the elevator window ahead of your move date.',
      },
      {
        q: 'Do you handle snowbird seasonal moves?',
        a: 'Yes — October through March is our peak season for snowbird inbound moves into Hallandale Beach. We also offer climate-controlled storage for off-season items and partial-pack service for clients who keep some belongings in their northern home.',
      },
      {
        q: 'Вы работаете на русском?',
        a: 'Да, конечно. Координатор и большая часть бригады свободно говорят по-русски. Холлендейл-Бич, Авентура, Санни-Айлс — для русскоязычных клиентов это привычные для нас районы. Можем общаться с управлением здания по-английски, а с вами по-русски — без проблем.',
      },
      {
        q: 'Do you pull parking permits for A1A and Hallandale Beach Blvd?',
        a: 'Yes. Parking on A1A or Hallandale Beach Boulevard requires a temporary loading-zone permit from the city — we pull it 48-72 hours in advance and post it on the truck the morning of your move. The permit is included in the truck fee for residential moves on those streets.',
      },
      {
        q: 'How does pricing work for a Hallandale Beach move?',
        a: 'Local moves are hourly: $129/hour for 2 movers or $179/hour for 3, 3-hour minimum, plus a truck fee per day at the crew rate ($129 with two movers, $179 with three), shown separately on the estimate — fuel, tolls and mileage included in it. A 1-bedroom oceanfront condo move (Beach Club, Hyde, Diplomat) takes 3–5 hours: $516–$774 all-in. No weekend or seasonal surcharge — the hourly rate is locked.',
      },
      {
        q: 'Do you serve Three Islands, Hemispheres, and Olympus?',
        a: "Yes — all three are part of our regular service. We know the dock access, security desk procedures, and elevator reservation systems for each. Three Islands in particular has multiple towers sharing dock infrastructure, and we know which tower entrance and window to use for each address.",
      },
      {
        q: 'Do you serve Hollywood, Aventura, and Sunny Isles as well?',
        a: 'Yes. Hollywood (where we\'re based), Aventura, Sunny Isles Beach, Bal Harbour, and the rest of north Miami-Dade and south Broward are all part of our daily service area — same crew, same standards, no travel surcharge.',
      },
    ],
  },

  // ── Added 2026-08-24 ───────────────────────────────────────────────────────
  // Nine cities that had a Russian page but no English one. Adding the English
  // side doubles the surface and lets every one of them carry hreflang, so the
  // two languages reinforce each other instead of the RU page standing alone.
  // Named communities are areas served, never a claimed client list, and no COI
  // dollar limit is attached to any named property.
  {
    slug: 'miami-beach-movers',
    name: 'Miami Beach',
    state: 'FL',
    county: 'Miami-Dade',
    heroHeadline: "Miami Beach's High-Rise Moving Company",
    heroSub: 'South Beach · Mid-Beach · North Beach · Collins Avenue · West Avenue · Sunset Harbour',
    heroImage: '/images/Real/Miami.jpg',
    metaTitle: 'Miami Beach Movers | Easy Move Florida',
    metaDescription: 'Movers in Miami Beach from $129/hour for 2 movers. Free COI, no weekend or fuel surcharge, no deposit. Call or WhatsApp 786-305-1844 for a same-day quote.',
    intro: "Miami Beach is two moving jobs in one city. On the ocean side you have towers along Collins Avenue with freight elevators, loading docks and a building office that wants a certificate of insurance before anyone touches a hand truck. A few blocks west you have Art Deco walk-ups on Jefferson, Meridian and Euclid with no elevator at all, a narrow stair and a street where a 26-foot truck cannot legally sit without a permit from the City of Miami Beach. We plan for both. Before your date we look at your street, your building rules and your elevator situation, then we quote hours that reflect what the job actually takes. Two movers and a truck are $129 per hour each, with a three-hour minimum, and there is no weekend or seasonal surcharge on that rate. Our crew works in English and Russian. Owner Evgenii Romanov answers the phone at 786-305-1844.",
    neighborhoods: ['South Beach', 'Mid-Beach', 'North Beach', 'South of Fifth', 'Sunset Harbour', 'Flamingo Park', 'West Avenue', 'Belle Isle', 'Venetian Islands', 'La Gorce', 'Normandy Isle', 'Collins Park'],
    localFacts: [
      {
        title: 'Loading zones and city permits',
        body: 'Most of South Beach has metered parking right up to the building line, and a 26-foot truck parked at a meter is a ticket waiting to happen. The City of Miami Beach issues temporary loading-zone permits for exactly this, and they take lead time. When we survey your address we tell you whether your street needs one, and we handle the application rather than leaving it to you to discover on move morning.',
      },
      {
        title: 'Causeway timing decides your start time',
        body: 'Everything on the beach arrives over a bridge. The MacArthur, Julia Tuttle and Venetian causeways all back up at predictable hours, and the Venetian has a toll and a drawbridge on top of that. We stage crews out of Hollywood and start early enough that the truck is at your door before the queue builds. If your building only releases the freight elevator mid-morning, we plan the drive around that window instead of the other way round.',
      },
      {
        title: 'Art Deco walk-ups have no elevator',
        body: 'The 1930s and 1940s buildings west of Washington Avenue are beautiful and completely stair-dependent. Landings are tight, stairwells turn hard, and a queen box spring often will not make the corner. We measure before we quote, bring wardrobe boxes and disassembly tools, and add crew rather than hours where a third mover makes the carry faster. There is no stairs fee on our estimate. Stairs cost time, and time is already in the number you were quoted.',
      },
      {
        title: 'Certificates of insurance, issued free',
        body: 'Nearly every doorman building on the beach asks for a COI naming the association and the management company as additional insured, in their own format, before they will book the elevator. We issue yours at no charge and send it to management within 24 hours of booking. Many buildings here ask for limits in the $1M-$2M range - we confirm your building requirements before move day, so nobody is arguing with a front desk at eight in the morning.',
      },
      {
        title: 'What a Miami Beach move actually costs',
        body: 'Two movers with a truck are $129 per hour, three movers $179, four movers $219, with a three-hour minimum. The truck is a separate line at the same daily figure as your crew rate. A studio on the beach usually lands between $516 and $645 all in; a one-bedroom $516 to $774; a two-bedroom $645 to $1,253. After the minimum we bill in 15-minute increments. No deposit, and free cancellation more than 48 hours out.',
      },
      {
        title: 'Hurricane season and the summer calendar',
        body: 'June through November changes how we schedule. Buildings restrict elevator use when a storm watch is posted, and a truck on a barrier island during an evacuation order is not a plan. If your date falls in that window we build in a backup day at no cost and move earlier in the morning when we can. Rescheduling for weather is free, the same as any cancellation made more than 48 hours ahead.',
      },
    ],
    faqs: [
      {
        q: 'Do you handle the loading-zone permit for South Beach streets?',
        a: 'Yes. Where your address has no dock and no legal space for a truck, the City of Miami Beach can authorise a temporary loading zone, and we apply for it as part of preparing your move. We tell you at quote stage whether your street needs one so it is not a surprise. Applications take lead time, which is the main reason we ask for your exact address early rather than just the neighbourhood.',
      },
      {
        q: 'Can you work with the freight elevator hours in my building?',
        a: 'Yes, and we plan the whole day around them. Most Collins Avenue and West Avenue towers release the freight elevator in a reserved block, and typically a padded elevator has to be booked with management days in advance. Tell us your building and we will call the office, confirm the window and the dock rules, and set your crew arrival so the truck is loaded and waiting when the elevator opens rather than idling on the clock.',
      },
      {
        q: 'My building is a 1940s walk-up with three flights. Is there a stairs charge?',
        a: 'No. We do not charge for stairs, elevators, long carries or heavy items. Those things cost time, and the time is already built into the hours we estimate for you. What we do instead is look at your stairwell before quoting - a turn that a sofa cannot make changes the plan, not the rate. Sometimes the cheaper answer is three movers at $179 an hour rather than two at $129 taking twice as long.',
      },
      {
        q: 'How much does it cost to move within Miami Beach?',
        a: 'The smallest possible invoice is $516 - two movers, a truck, three hours. Studios generally finish between $516 and $645, one-bedrooms between $516 and $774, two-bedrooms between $645 and $1,253, three-bedrooms between $1,253 and $1,611. Larger homes run $1,611 to $2,327. Those are all-in figures including the truck line. There is no weekend rate, no seasonal rate and no fuel surcharge, so a Saturday in March costs the same per hour as a Tuesday in September.',
      },
      {
        q: 'Do you provide a certificate of insurance for the building?',
        a: 'Yes, free of charge, issued in the format your management company requires and naming the building as additional insured. We send it directly to the building office within 24 hours of you booking, and we follow up to confirm they have accepted it. If your association returns it asking for different wording, we reissue it. You should never have to act as the messenger between your movers and your front desk.',
      },
      {
        q: 'Do you move between Miami Beach and other states?',
        a: 'Yes. You get a written estimate within 24 hours of the survey and there is no deposit. Miami Beach to New York, Chicago, Texas and the Carolinas are routes we run regularly. The written figure is the figure - we do not reweigh at the far end and hand you a different number.',
      },
      {
        q: 'Do you speak Russian?',
        a: 'Yes. Our crew works in English and Russian, and the owner, Evgenii Romanov, handles quotes personally in both. That matters on the beach more than people expect - a lot of our clients here are more comfortable discussing what is fragile, what is valuable and what needs crating in Russian. There is a Russian version of this page if you would rather read it that way, and WhatsApp at 786-305-1844 works in either language.',
      },
      {
        q: 'Can you pack for me as well?',
        a: 'Yes. Packing is $79 per hour for two packers, and a studio packing package starts at $237. On the beach we most often pack kitchens, artwork and closets while the client handles the rest, which keeps the bill down. We bring materials with us. If your building has a tight elevator window, packing the day before is usually the difference between a comfortable move and a rushed one.',
      },
    ],
  },
  {
    slug: 'bal-harbour-movers',
    name: 'Bal Harbour',
    state: 'FL',
    county: 'Miami-Dade',
    heroHeadline: 'Bal Harbour Luxury Condo Movers',
    heroSub: 'Bal Harbour · Surfside · Bay Harbor Islands · Harbour Way · Kane Concourse',
    heroImage: '/images/Real/Miami.jpg',
    metaTitle: 'Bal Harbour Movers | Easy Move Florida',
    metaDescription: 'Bal Harbour, Surfside and Bay Harbor Islands movers. From $129/hour, free COI for your building, no deposit. Call or WhatsApp 786-305-1844 for a quote today.',
    intro: "Bal Harbour runs on presentation. The towers along Collins have service entrances that residents never see, and management expects a moving crew to use them without being asked twice: shoe covers, floor protection, no cardboard in the lobby, no raised voices at the valet stand. Surfside sits a few blocks south with lower buildings and a mix of oceanfront condos and single-family homes. Bay Harbor Islands is different again - two small islands connected by the Broad Causeway, streets barely wide enough for a full-size truck, and low-rise buildings where the parking is under the structure. One quote covers all three, but the plan behind it is not the same. We survey the property, confirm what your association requires in writing, and give you a written number before your date. Our crew works in English and Russian. Reach Evgenii Romanov at 786-305-1844.",
    neighborhoods: ['Bal Harbour Village', 'Bal Harbour Shops district', 'Surfside', 'Bay Harbor Islands', 'East Island', 'West Island', 'Kane Concourse', 'Harbour Way', 'Harding Avenue', 'Collins Avenue oceanfront', 'Indian Creek Drive', 'Bal Bay Drive'],
    localFacts: [
      {
        title: 'Service entrances, not the front door',
        body: 'We serve the oceanfront towers along Collins near the Shops - addresses such as St. Regis Bal Harbour and the Ritz-Carlton Residences - and buildings of that type route moves through a service corridor with rules of their own. Crews arrive in uniform, lay floor runners, use pads on the lift walls and keep packing waste out of resident areas. We treat that as the baseline, not an upgrade you pay extra for.',
      },
      {
        title: 'Bay Harbor Islands street width',
        body: 'The residential blocks on East Island were laid out long before 26-foot trucks, and with cars parked on both sides there is often no way to get one to the door without blocking the street. We check your block by map and by video walkthrough before scheduling. Where the access is genuinely tight we bring a 16-footer instead, or park legally nearby and shuttle. Either way you know the plan before move day, not on it.',
      },
      {
        title: 'Building approval takes longer than you think',
        body: 'In this part of Miami-Dade, associations typically want the move registered in advance: an approved vendor form, a certificate of insurance in their exact format, an elevator reservation and sometimes a refundable deposit held by management. As a rule they will not release the elevator until all of it is on file. We start that paperwork the day you book and follow it up ourselves, so your approval is not sitting in someone inbox the night before.',
      },
      {
        title: 'Certificates of insurance for Surfside associations',
        body: 'Surfside buildings ask for the same documentation as their Bal Harbour neighbours, and the format is rarely identical between two associations on the same street. Yours is issued free, naming the building as additional insured, and sent to management within 24 hours of booking. Many buildings here ask for limits in the $1M-$2M range - we confirm your building requirements before move day rather than assuming last month wording still applies.',
      },
      {
        title: 'Art, mirrors and high-value pieces',
        body: 'Homes here often contain framed art, large mirrors, glass tables and pieces that cost more than the move. We crate and blanket-wrap those rather than trusting a pad and hope. Packing runs $79 per hour for two packers and we usually recommend it for exactly these items even when clients pack the rest themselves. Tell us what needs special handling when you call and we will price the time for it up front instead of discovering it in your living room.',
      },
      {
        title: 'A transparent invoice, no surcharges',
        body: 'Three movers with a truck are $179 per hour each, four movers $219, with a three-hour minimum and 15-minute billing after that. The truck appears as its own line at the same daily figure as the crew rate. Nothing is added for weekends, high season, fuel, elevators or long carries from a service entrance to a unit at the far end of a corridor. No deposit is taken, and cancelling more than 48 hours out costs nothing.',
      },
    ],
    faqs: [
      {
        q: 'Can a full-size truck reach my house on Bay Harbor Islands?',
        a: 'Sometimes, and we check rather than guess. The interior streets on both islands are narrow, cars park on both kerbs, and the Broad Causeway is the only approach. We review your block by satellite and ask for a short video of your driveway before scheduling. Where a 26-footer would block traffic or cannot turn, we send a 16-foot truck or plan a short shuttle from a legal parking position. The rate does not change either way.',
      },
      {
        q: 'What does my Bal Harbour building typically require before a move?',
        a: 'As a rule: an approved moving vendor registered with management, a certificate of insurance naming the association as additional insured, a reserved freight elevator slot and a move confirmed for a permitted day and time. Some associations also hold a refundable damage deposit. We contact your management office once you book, get the exact list in writing and complete it. What we never do is claim to know a specific building rules before we have confirmed them.',
      },
      {
        q: 'How do your crews behave in a luxury building?',
        a: 'Uniformed, quiet, floor runners down before the first box, elevator pads confirmed with the front desk, and all packing waste removed rather than left in a service corridor. We use the service entrance and loading area management designates, not the residential lobby. Buildings at this level tend to remember which movers respect that, and it is the reason we get invited back into the same towers.',
      },
      {
        q: 'What will a two-bedroom in Surfside cost?',
        a: 'Two-bedroom moves generally land between $645 and $1,253 all in, depending on volume, packing and how far the carry runs from the service entrance. Three movers at $179 an hour is the usual crew for a two-bedroom condo here, plus the truck at the same daily figure, with a three-hour minimum. You get a written estimate before booking, and after the minimum we bill in quarter hours rather than rounding up to the next full hour.',
      },
      {
        q: 'Do you charge more for a Saturday or for high season?',
        a: 'No. The hourly rate is locked - $129 for two movers, $179 for three, $219 for four - and it is the same in January as in August, the same on Saturday as on Wednesday. There is no fuel surcharge and no seasonal adjustment. The only thing that changes your total is how long the job takes and whether you add packing or storage. That is why we spend time on the survey rather than on the fine print.',
      },
      {
        q: 'Can you store our things between closings?',
        a: 'Yes. Storage starts at $200 per month. Closing dates in this market slip often enough that we plan for it - furniture is inventoried, wrapped and held, then delivered when your new place is ready. You are quoted the outbound move, the storage period and the delivery separately so you can see what each stage costs. No deposit is required to reserve the space.',
      },
      {
        q: 'Do you move to Bal Harbour from out of state?',
        a: 'No — we are a local mover and work inside Miami-Dade, Broward and Palm Beach. Moving household goods across a state line requires federal operating authority that we do not hold, so we neither quote nor take those jobs. Call 786-305-1844 anyway and we will point you toward a licensed carrier; we can also still pack your home, or handle a local move into storage on the Florida side.',
      },
      {
        q: 'Is anyone on the crew Russian-speaking?',
        a: 'Yes. We work in English and Russian, and Evgenii Romanov, the owner, takes quote calls in both. In Bal Harbour, Surfside and Bay Harbor Islands that comes up constantly, and it makes the practical conversations easier - which pieces are valuable, what gets crated, what goes to storage. There is a Russian version of this page, and WhatsApp on 786-305-1844 is often the quickest way to reach us.',
      },
    ],
  },
  {
    slug: 'north-miami-beach-movers',
    name: 'North Miami Beach',
    state: 'FL',
    county: 'Miami-Dade',
    heroHeadline: 'North Miami Beach Movers You Can Book Today',
    heroSub: 'Eastern Shores · Highland Village · Sunkist Grove · Fulford-by-the-Sea · Uleta',
    heroImage: '/images/Real/Miami.jpg',
    metaTitle: 'North Miami Beach Movers | Easy Move Florida',
    metaDescription: 'North Miami Beach movers from $129/hour for two movers and a truck. Free COI, no deposit, no hidden fees. Call or text 786-305-1844 for a written estimate.',
    intro: "North Miami Beach has more housing stock built before 1975 than almost anywhere else in the county, and that shapes every move here. Eastern Shores is canal-front single-family homes on cul-de-sacs, where the question is whether a truck can turn around at the end of your street. West of Biscayne you have Highland Village and Sunkist Grove, older single-story houses with carports and mature trees over the driveway. In between sit the mid-century condo buildings along 163rd Street and Biscayne Boulevard - solid buildings with small elevators, tight lobbies and associations that still want paperwork on file before you move a stick of furniture. We look at yours before quoting. Two movers and a truck start at $129 per hour each with a three-hour minimum, no deposit, and nothing added for weekends. The crew works in English and Russian. Call Evgenii Romanov on 786-305-1844.",
    neighborhoods: ['Eastern Shores', 'Highland Village', 'Sunkist Grove', 'Fulford-by-the-Sea', 'Uleta', 'Skylake', 'Greynolds Park area', 'Oak Grove', 'Biscayne Boulevard corridor', 'NE 163rd Street corridor', 'Maule Lake', 'Sans Souci Estates'],
    localFacts: [
      {
        title: 'Small elevators in 1960s condo buildings',
        body: 'A lot of the condo stock along Biscayne and 163rd Street dates from the 1960s and early 1970s, and the passenger elevators are genuinely small - many will not take a full-size sofa or a king mattress upright. We measure the cab before quoting where we can, and plan for disassembly, a balcony hoist alternative or a stair carry when it will not fit. Knowing that in advance is the difference between a four-hour job and a seven-hour one.',
      },
      {
        title: 'Eastern Shores cul-de-sacs and canal frontage',
        body: 'The waterfront streets off NE 35th Avenue end in cul-de-sacs, and several have no room for a 26-foot truck to turn without using a neighbour driveway. Before scheduling we review your street and driveway by map and video. If access is tight we bring a 16-footer or stage the truck on a wider cross-street and shuttle in. Seawall and dock areas we treat as off-limits for truck weight unless you tell us otherwise.',
      },
      {
        title: 'Older buildings still ask for a COI',
        body: 'People assume the paperwork is only a high-rise thing. It is not - plenty of the older associations here require a certificate of insurance and a scheduled move window just as strictly as a new tower does. Yours is free, in your management company required format, naming the building as additional insured, sent within 24 hours of booking. Many buildings here ask for limits in the $1M-$2M range, and we confirm your building requirements before move day.',
      },
      {
        title: 'Carports, low branches and driveway clearance',
        body: 'Single-story houses in Highland Village and Sunkist Grove often have a carport with under ten feet of clearance and mature ficus or oak over the drive. A box truck will not fit under either. We park on the street, run a longer carry from the door, and put that walking distance into the estimated hours rather than adding a long-carry fee afterwards. There is no long-carry line on our invoices because there is no long-carry charge.',
      },
      {
        title: 'What the hours actually cost',
        body: 'Two movers and a truck are $129 per hour each; three movers $179; four movers $219. Three-hour minimum, then 15-minute increments. The smallest invoice possible is $516 with a two-man crew. A typical NMB one-bedroom finishes between $516 and $774, a two-bedroom between $645 and $1,253, a three-bedroom house between $1,253 and $1,611. Nothing extra for stairs, heavy items, weekends or fuel, and no deposit to book the date.',
      },
      {
        title: 'Traffic on 163rd Street and Biscayne',
        body: 'The 163rd Street corridor and Biscayne Boulevard both slow to a crawl in the late afternoon, and the William Lehman Causeway adds beach traffic on top. We start early for this reason. If your move crosses the city during the afternoon, we tell you at quote stage what that adds in hours instead of letting you find out when the truck is sitting still with the meter running.',
      },
    ],
    faqs: [
      {
        q: 'My condo elevator is tiny. Will my furniture fit?',
        a: 'That is the first thing we check in the older buildings here. Many 1960s and 1970s elevators in North Miami Beach cannot take a sectional or a king mattress upright, and there is often no separate freight cab at all. We measure or ask you to measure the cab depth and door width before quoting, then plan disassembly or a stair carry accordingly. It changes the hours we estimate, not the hourly rate you were quoted.',
      },
      {
        q: 'Can your truck get into an Eastern Shores cul-de-sac?',
        a: 'Usually, but we confirm it first. Several of the canal-front streets end without room for a 26-foot truck to turn, and reversing the full length of a residential block is not something we will do with parked cars either side. We review your street on satellite and ask for a short video. Where it is genuinely tight we bring a smaller truck or stage nearby and shuttle. The rate is unchanged either way.',
      },
      {
        q: 'What is the cheapest a move here can be?',
        a: '$516. That is two movers at $129 an hour for the three-hour minimum, plus the truck at $129 for the day, and it is the floor - nothing bills below it. With three movers the minimum is $716, with four it is $876. A larger crew often finishes a job for less overall because the hours drop, which is why we recommend crew size based on your inventory rather than defaulting to the cheapest-looking number.',
      },
      {
        q: 'Do you charge for stairs in a walk-up building?',
        a: 'No. There is no stairs fee, no elevator fee, no long-carry fee and no heavy-item fee anywhere on our estimates. Those factors cost time, and the time is already priced into the hours we quote you. A second-floor walk-up with a straight run of stairs may cost nothing extra at all; one with a hard landing turn may add an hour. We tell you which when we survey, not after.',
      },
      {
        q: 'How far in advance should I book?',
        a: 'A week is comfortable, and end-of-month dates fill first because most leases here turn over on the first. If your building requires a reserved elevator window, book earlier - associations typically want the certificate of insurance and the elevator request days ahead. There is no deposit, so booking early costs you nothing, and cancelling more than 48 hours out is free. We do take same-week jobs when the calendar allows.',
      },
      {
        q: 'Do you move from North Miami Beach to another state?',
        a: 'No — we are a local mover and work inside Miami-Dade, Broward and Palm Beach. Moving household goods across a state line requires federal operating authority that we do not hold, so we neither quote nor take those jobs. Call 786-305-1844 anyway and we will point you toward a licensed carrier; we can also still pack your home, or handle a local move into storage on the Florida side.',
      },
      {
        q: 'Can you help with packing and boxes?',
        a: 'Yes. Two packers are $79 per hour, and a studio packing package starts at $237. Most clients here have us pack the kitchen and any glass or artwork and handle bedrooms and closets themselves. We bring boxes, paper, tape and wardrobe cartons with us. For an older building with a slow elevator, packing the day before is often what keeps the move day inside its window.',
      },
      {
        q: 'Do you have Russian-speaking movers?',
        a: 'Yes. The crew works in English and Russian, and the owner, Evgenii Romanov, handles estimates in both languages himself. North Miami Beach has a large Russian-speaking community and it comes up on most jobs here. There is a Russian version of this page if that is easier for you or for a family member handling the move. Call or WhatsApp 786-305-1844 in either language.',
      },
    ],
  },
  {
    slug: 'pembroke-pines-movers',
    name: 'Pembroke Pines',
    state: 'FL',
    county: 'Broward',
    heroHeadline: 'Movers for Pembroke Pines Communities',
    heroSub: 'Chapel Trail · Silver Lakes · Pembroke Falls · Grand Palms · Towngate · Century Village',
    heroImage: '/images/Real/Fort-Lauderdale.jpg',
    metaTitle: 'Pembroke Pines Movers | Easy Move Florida',
    metaDescription: 'Pembroke Pines movers for houses, townhouses and 55+ communities. 2 movers $129/hr, 3-hour minimum, free COI, no weekend surcharge. Call 786-305-1844.',
    intro: "Pembroke Pines is a city of master-planned communities, and a move here is usually a house move: a three or four bedroom single-family home or a two-storey townhouse inside a gated section with its own management office. That changes the job. There is more furniture than a condo carries, the garage is full, and the walk from the front door to where a 26-foot truck can legally park is often longer than the drive between the two addresses. We plan for that distance before quoting hours instead of discovering it on the day. Easy Move Florida is owned and run by Evgenii Romanov out of Hollywood, twenty minutes east. Two movers are $129 per hour, three are $179, four are $219, with a three-hour minimum and the truck billed per day at the same figure as the crew. A typical three-bedroom house runs six to eight hours with three movers, $1,253 to $1,611 all in. Call or WhatsApp 786-305-1844.",
    neighborhoods: [
      'Chapel Trail',
      'Silver Lakes',
      'Pembroke Falls',
      'Grand Palms',
      'Towngate',
      'Century Village Pembroke Pines',
      'Pembroke Shores',
      'Walnut Creek',
      'Raintree',
      'Spring Valley',
      'Pembroke Isles',
      'Flamingo Road corridor',
    ],
    localFacts: [
      {
        title: 'The long carry is the real cost here',
        body: 'In Chapel Trail, Silver Lakes and Pembroke Isles the truck often stops at visitor parking or a cul-de-sac, not at your door. That walk decides your hours far more than how much you own. We measure it on the map first and, where it is long, plan a shuttle or bring dollies and ramps sized for the run. There is no long-carry fee on our estimates; the distance is priced as time, at the same hourly rate.',
      },
      {
        title: 'Townhouse driveways and the 26-foot truck',
        body: 'Townhouse sections around Towngate, Walnut Creek and parts of Pembroke Falls have short driveways and narrow interior lanes where a full-size truck cannot turn or would block neighbours for hours. Before we schedule, we look at your street and driveway by map and video. If access is tight we bring a 16-footer instead, or stage a smaller vehicle between the door and a truck parked on the main road.',
      },
      {
        title: '55+ sections have their own clock',
        body: 'Century Village and other age-restricted sections in Pembroke Pines typically set quiet hours, weekday-only move windows, and a fixed cut-off in the afternoon. As a rule the office wants the elevator or the service door booked in advance. We ask for those rules at booking, build the schedule around the window rather than against it, and start early enough that a house move finishes inside it.',
      },
      {
        title: 'What the association gets before move day',
        body: 'Most communities here want a certificate of insurance from the mover before they will open the gate. Ours is free and issued to the association or the management company within 24 hours of booking, in the format they ask for, naming the association as additional insured. Many associations here ask for limits in the $1M–$2M range — we confirm your HOA’s exact requirements before move day, so nothing stalls at the guard house.',
      },
      {
        title: 'Gate house lists and crew names',
        body: 'Gated sections typically want the mover on an access list before the truck arrives: company name, crew names, vehicle and plate, and a time window. We send that to whoever your community asks for as soon as the date is set. The crew works in English and Russian, so the paperwork and the conversation at the guard house go the same way in either language, and nothing is lost while a truck idles at the gate.',
      },
      {
        title: 'Between closings, and during the school year',
        body: 'Plenty of Pembroke Pines moves fall in a gap: the new house closes a week after the old one, or the family wants the move inside a school break. Storage starts at $200 per month, so we can load, hold and deliver without you renting a unit or hiring twice. Packing is from $79 per hour for two packers. Booking needs no deposit, and cancelling more than 48 hours out is free.',
      },
    ],
    faqs: [
      {
        q: 'What does a three-bedroom house in Pembroke Pines usually cost to move?',
        a: 'Most three-bedroom houses here run six to eight hours with three movers, which is $1,253 to $1,611 including the truck. Three movers are $179 per hour and the truck is billed at $179 for the day as its own line. A four-bedroom or larger house is generally $1,611 to $2,327. The variables that move you inside that range are the carry distance from the truck to your door, stairs in a two-storey townhouse, and how much of the garage is coming.',
      },
      {
        q: 'My community requires a certificate of insurance. How fast can you send one?',
        a: 'Within 24 hours of booking, at no charge. Tell us the association or management company name, the email or portal they use, and any wording they insist on. We issue the certificate in their required format and name the association as additional insured. We also check the limits and wording your management office insists on before the document goes out, so what arrives is something they will accept rather than something that comes back for corrections a day before the move.',
      },
      {
        q: 'The truck cannot reach my door in Silver Lakes. Do you charge extra for the walk?',
        a: 'No. There is no long-carry fee, no stairs fee and no heavy-item fee on our estimates. A long walk costs time, and time is already what you are paying for at the hourly rate. What we do is measure that walk before quoting, so the hours we give you reflect it. Where the run is very long we bring extra equipment or park a smaller vehicle closer and shuttle, which usually costs less in hours than carrying the whole load by hand.',
      },
      {
        q: 'Can you work inside a 55+ community’s move-in window?',
        a: 'Yes, and we plan the day around it. Age-restricted sections here typically allow moves on weekdays only, inside set hours, with quiet time before and after. Give us the window when you book and we will start early enough to finish a house move inside it. If the community also books a service entrance or elevator, tell us the slot they gave you. We would rather adjust the crew size to fit the window than run past it and be stopped mid-load.',
      },
      {
        q: 'Do you charge more for a Saturday or for moving in summer?',
        a: 'No. There is no weekend surcharge, no seasonal surcharge and no fuel surcharge. The rate you are quoted is the rate you pay whether the date is a Tuesday in September or a Saturday in July. Two movers are $129 per hour, three are $179, four are $219, with a three-hour minimum and the truck billed per day at the same figure as the crew size. After the minimum we bill in 15-minute increments, so you pay for the time actually used.',
      },
      {
        q: 'We close on the new house a week after we leave the old one. What then?',
        a: 'We load your home, keep everything in storage, and deliver when the new place is yours. Storage starts at $200 per month. That is one crew handling your furniture twice instead of two companies handling it four times, and it removes the pressure to rent a unit for a gap of a few days. Tell us the likely delivery week when you book; if the closing date shifts, we reschedule the delivery rather than charging you to hold it longer than needed.',
      },
      {
        q: 'How much notice do you need, and do I pay a deposit?',
        a: 'No deposit at any point, and cancelling more than 48 hours before the move is free. A week of notice is comfortable for a house move in Pembroke Pines because it gives the association time to process the certificate of insurance and put the crew on the gate list. We do take shorter notice when the calendar allows. The estimate is written and sent before you commit, so you know the crew size, the hours and the truck line in advance.',
      },
      {
        q: 'Does your crew speak Russian?',
        a: 'Yes. Easy Move Florida is owner-led by Evgenii Romanov, and the crews work in English and Russian, which matters when part of a household is more comfortable in one language than the other. There is a Russian version of this page if you would rather read the details there. Calls and WhatsApp messages to 786-305-1844 are answered in either language, and the written estimate can be sent in whichever one you prefer.',
      },
    ],
  },
  {
    slug: 'weston-movers',
    name: 'Weston',
    state: 'FL',
    county: 'Broward',
    heroHeadline: 'Weston Movers Who Handle the HOA',
    heroSub: 'Weston Hills · Windmill Ranch Estates · Savanna · The Ridges · Bonaventure · Weston Isles',
    heroImage: '/images/Real/Fort-Lauderdale.jpg',
    metaTitle: 'Weston Movers | Easy Move Florida',
    metaDescription: 'Weston movers for large gated single-family homes. Free COI for your HOA, 3 movers $179/hr, no deposit, no surcharges. Written estimate. Call 786-305-1844.',
    intro: "Weston runs on rules. Almost every address sits inside a gated community with an active association, and the paperwork around a move day here is stricter than anywhere else in Broward: an access list at the guard house, an approved window, an insurance certificate on file before a truck is allowed through. The homes are large too, mostly single-family with four bedrooms and up, garages, offices and outdoor furniture that has to travel. That combination punishes movers who show up unprepared and rewards planning. We deal with the association side first and treat move day as the easy part. Easy Move Florida is run by its owner, Evgenii Romanov, from a base in Hollywood, half an hour away. Three movers are $179 an hour, four are $219, with a three-hour minimum and the truck as its own daily line at the same figure. Large Weston houses commonly land between $1,611 and $2,327. Reach us on 786-305-1844.",
    neighborhoods: [
      'Weston Hills',
      'Windmill Ranch Estates',
      'The Ridges',
      'Savanna',
      'Bonaventure',
      'Weston Isles',
      'Country Isles',
      'Emerald Estates',
      'The Falls',
      'Indian Trace',
      'Sector 7',
      'Riverstone',
    ],
    localFacts: [
      {
        title: 'The guard house decides whether the day starts',
        body: 'Communities across Weston typically require the moving company on an access list days ahead: legal company name, each crew member by name, vehicle description and plate, plus the approved arrival window. We submit that as soon as your date is fixed and confirm it landed. A truck turned away at the gate at eight in the morning is the most expensive thing that can happen to a move here, and it is entirely avoidable.',
      },
      {
        title: 'Approved windows are usually weekday windows',
        body: 'As a rule, associations in Weston restrict moves to weekdays inside a set band of hours, and some close the gate to trucks entirely on Sundays and holidays. That shapes crew size more than anything else. For a large house inside a tight window we send four movers at $219 an hour rather than three, because finishing inside the approved hours matters more than a lower rate on a day that gets cut short.',
      },
      {
        title: 'Insurance paperwork in the association’s own format',
        body: 'Management companies here rarely accept a generic certificate. They want their own entity named as additional insured, the correct address, and sometimes a specific upload portal. Ours is free and issued within 24 hours of booking in the format requested. We ask what limits and wording your management office requires before we produce it, rather than sending a document and hoping it clears their review.',
      },
      {
        title: 'Large homes, long inventories, honest hours',
        body: 'A four or five bedroom Weston house is not a bigger apartment. It is a garage, a home office, patio and pool furniture, wardrobes with fitted contents, and often a second floor. We walk the whole property on video before quoting, including the garage and outside, so the hour range you are given covers what actually exists. Houses of this size generally run $1,611 to $2,327 all in.',
      },
      {
        title: 'Driveways, pavers and where the truck stands',
        body: 'Many Weston homes have long paver driveways, low-hanging trees over the entrance and landscaping that a loaded 26-foot truck should not cross. We check clearance and surface before the date and, where the driveway is not suitable, park on the street and plan the carry, or bring a smaller vehicle. Protecting a driveway you will still own after closing costs nothing if it is planned, and a lot if it is not.',
      },
      {
        title: 'Owner-led, and working in two languages',
        body: 'Evgenii Romanov owns the company and runs the schedule, so the person quoting your move is the person answerable for it. Crews work in English and Russian, which is useful in Weston households where those are both spoken. There is no deposit to book, cancelling more than 48 hours out is free, and billing after the three-hour minimum is in 15-minute increments rather than rounded up to the hour.',
      },
    ],
    faqs: [
      {
        q: 'What does my HOA need from a mover before move day in Weston?',
        a: 'Typically three things: a certificate of insurance on file with management, the company and crew on the gate access list, and an approved move window. We handle the first two directly if you give us the management contact and any portal details. The certificate is free and goes out within 24 hours of booking, naming the association as additional insured. Many associations here ask for limits in the $1M–$2M range — we confirm your HOA’s exact requirements before move day.',
      },
      {
        q: 'Our community only allows moves Monday to Friday within set hours. Can you finish in time?',
        a: 'That is the normal situation in Weston and we plan crew size around it. For a large house inside a restricted band we usually recommend four movers at $219 an hour instead of three, because the extra crew buys hours back at the only point where hours are scarce. Tell us the exact window when you book. We arrive at the start of it, not partway through, and stage the load so that the heaviest and slowest items are done first.',
      },
      {
        q: 'How much does a five-bedroom Weston house cost to move?',
        a: 'Four-bedroom and larger houses generally run $1,611 to $2,327 all in. That covers the crew, the truck as its own daily line at the same figure as the crew rate, and the protection materials used on the day. What decides where you land is the garage, the outdoor furniture, and whether there is a second floor. We do a video walkthrough of the whole property, garage and patio included, before writing the estimate so the range is grounded in what you actually have.',
      },
      {
        q: 'Will a 26-foot truck damage my paver driveway?',
        a: 'It can, which is why we look at the driveway before the date rather than on it. We check surface, width, gradient and tree clearance over the entrance. If the driveway is not suitable for a loaded full-size truck, we park on the street and plan the carry into the estimated hours, or bring a 16-footer that can stand closer to the door. Either way you are told the plan before you book, not after the truck is parked.',
      },
      {
        q: 'Do you charge for stairs, heavy items or a long walk from the truck?',
        a: 'No. There are no stairs, elevator, long-carry or heavy-item fees on our estimates, and no weekend, seasonal or fuel surcharge either. Those conditions cost time, and time is already what the hourly rate covers, so we build them into the estimated hours instead of adding lines at the end. Three movers are $179 per hour, four are $219, three-hour minimum, then 15-minute increments. The rate is locked at booking.',
      },
      {
        q: 'We are moving out of Weston to another state. How does that work?',
        a: 'No — we are a local mover and work inside Miami-Dade, Broward and Palm Beach. Moving household goods across a state line requires federal operating authority that we do not hold, so we neither quote nor take those jobs. Call 786-305-1844 anyway and we will point you toward a licensed carrier; we can also still pack your home, or handle a local move into storage on the Florida side.',
      },
      {
        q: 'Can you pack the house as well as move it?',
        a: 'Yes. Packing is from $79 per hour for two packers, and it can be a full pack or only the parts that eat the most time on move day: kitchens, wardrobes, art and glass. In houses this size, packing the day before usually shortens the move itself enough to be worth the cost, particularly when the association window is tight. We bring materials and can pack only what you name, leaving the rest to you.',
      },
      {
        q: 'Who actually shows up, and what languages do they speak?',
        a: 'Easy Move Florida is owner-led by Evgenii Romanov from Hollywood, and he runs the schedule himself rather than passing bookings to whichever crew is free. The movers work in English and Russian, so households that use both get one crew that follows either. There is a Russian version of this page. If you prefer to sort details in writing, WhatsApp 786-305-1844 and the estimate comes back in the language you wrote in.',
      },
    ],
  },
  {
    slug: 'coral-springs-movers',
    name: 'Coral Springs',
    state: 'FL',
    county: 'Broward',
    heroHeadline: 'Family Movers in Coral Springs',
    heroSub: 'Eagle Trace · Wyndham Lakes · Ramblewood · Turtle Run · Heron Bay · Coral Creek',
    heroImage: '/images/Real/Fort-Lauderdale.jpg',
    metaTitle: 'Coral Springs Movers | Easy Move Florida',
    metaDescription: 'Coral Springs movers for family homes and townhouses. 3 movers $179/hr, 3-hour minimum, free HOA certificate, no deposit, no surcharges. Call 786-305-1844.',
    intro: "Coral Springs moves are family moves. The households we load here are usually three or four bedroom homes and townhouses with children in them, which shapes the whole day: the date is chosen around a school calendar, the kids’ rooms are packed last and unpacked first, and the garage holds a decade of bicycles, sports gear and holiday boxes that nobody counted when they thought about how big the job was. Townhouse sections add a second problem, because interior lanes and short driveways in this city were not laid out with a 26-foot truck in mind. We plan both before quoting. Easy Move Florida is owned by Evgenii Romanov and based in Hollywood. Three movers cost $179 an hour, the truck is a separate daily line at the same $179, and the minimum is three hours. A typical three-bedroom home takes six to eight hours, so $1,253 to $1,611 all in. Call 786-305-1844 or send the details over WhatsApp.",
    neighborhoods: [
      'Eagle Trace',
      'Wyndham Lakes',
      'Ramblewood',
      'Turtle Run',
      'Heron Bay',
      'Coral Creek',
      'Maplewood',
      'Cypress Run',
      'Whispering Woods',
      'Westview',
      'Kensington',
      'Riverside Estates',
    ],
    localFacts: [
      {
        title: 'Townhouse lanes were not built for full-size trucks',
        body: 'Around Ramblewood, Maplewood and several Turtle Run sections the interior lanes are narrow, the driveways are short, and a 26-foot truck parked at the door blocks every neighbour behind it. We review the street, the turning circle and the driveway by map and video before scheduling. Where it will not work we bring a 16-footer or park on the through road and plan a short shuttle, which keeps the day moving instead of stalling it.',
      },
      {
        title: 'Timing a move around the school calendar',
        body: 'Most families here want the move inside a break or immediately after the last day of term, which means the good dates cluster and disappear early. Book as soon as your closing or lease end is firm; there is no deposit, and cancelling more than 48 hours out costs nothing, so an early booking carries no risk. If the closing slips, we move the date rather than charge for the change.',
      },
      {
        title: 'The garage is usually the surprise',
        body: 'In a Coral Springs family home the garage often holds more volume than a bedroom: bikes, tools, sports equipment, storage shelving and years of boxes. It is also the part people forget to mention when estimating. We walk it on video with everything else, so the hour range we quote already includes it. A garage discovered on the morning of the move is the most common reason an estimate elsewhere turns into a bigger invoice.',
      },
      {
        title: 'What most associations here ask for',
        body: 'Townhouse and gated communities in Coral Springs typically want the mover registered before arrival and an insurance certificate on file with management. Ours is free and issued to the association or management company within 24 hours of booking, in their required format, naming the association as additional insured. Many associations here ask for limits in the $1M–$2M range — we confirm your HOA’s exact requirements before move day, along with any approved hours.',
      },
      {
        title: 'Hurricane season and the storage gap',
        body: 'From June onward a date can be overtaken by weather, and closings in this city slip for the usual reasons as well. Storage starts at $200 a month, so a load can go into storage and come out when the new home is ready, handled by one crew rather than two companies. If a named storm forces a change of date, we reschedule; nothing about the rate changes because the calendar did.',
      },
      {
        title: 'What the price does and does not include',
        body: 'Two movers are $129 an hour, three $179, four $219, and the truck is billed per day at the same figure as the crew - $179 with three movers - shown as its own line. After the three-hour minimum we bill in 15-minute increments. There is no weekend, seasonal or fuel surcharge, and no stairs or long-carry fee. Crews work in English and Russian, and there is a Russian version of this page.',
      },
    ],
    faqs: [
      {
        q: 'When should I book if we are moving between school terms?',
        a: 'As early as your closing date or lease end is firm. Break weeks and the days right after term ends are the busiest dates in Coral Springs, and they fill first. Booking costs nothing to hold: there is no deposit at any stage, and cancelling more than 48 hours out is free. If your closing moves, tell us and we reschedule rather than charging a change fee. Holding a good date early and adjusting later is the cheapest way to do this.',
      },
      {
        q: 'Our townhouse lane is narrow. Will your truck fit?',
        a: 'We check before we schedule rather than finding out on the day. Using maps and a short video from you, we look at the lane width, the turning circle and how much driveway there is. If a 26-foot truck cannot get in or would block your neighbours, we bring a 16-footer, or park on the through road and shuttle the load in with a smaller vehicle. You are told which plan applies before booking, and it is reflected in the estimated hours.',
      },
      {
        q: 'What does a three-bedroom Coral Springs home cost to move?',
        a: 'Six to eight hours with three movers is typical, which is $1,253 to $1,611 including the truck. Three movers are $179 an hour and the truck is a separate daily line at $179. A two-bedroom townhouse more often lands between $645 and $1,253. The garage, the number of stairs and the carry distance from the truck decide where you sit in the range, which is why we look at all three before writing the estimate.',
      },
      {
        q: 'Do you move the contents of the garage and the shed?',
        a: 'Yes, and we would rather quote them than be surprised by them. Bikes, tools, shelving, sports gear and stored boxes take real time to carry and load, and in a family home the garage is frequently the single largest room by volume. Show it to us on the video walkthrough with everything else. Anything with fuel in it - mowers, generators, propane - needs to be drained or disposed of before the day, and we will flag what falls into that group.',
      },
      {
        q: 'Can you pack the children’s rooms and the kitchen only?',
        a: 'Yes. Packing is from $79 an hour for two packers and can be scoped to whatever you want done, which for families is usually the kitchen, the fragile items and the children’s rooms. A studio-sized packing package starts at $237. Packing those rooms the day before shortens move day noticeably, and it means the boxes that need to be opened first are labelled and loaded last, so they come off the truck first at the new house.',
      },
      {
        q: 'Is Saturday more expensive, or the summer?',
        a: 'No. The rate is locked when you book: no weekend surcharge, no seasonal surcharge, no fuel surcharge. A July Saturday costs the same per hour as a February Tuesday. Two movers are $129, three $179, four $219, all with a three-hour minimum and the truck billed per day at the same figure as the crew size. After the minimum, billing is in 15-minute increments, so a job that runs six hours and fifteen minutes is charged as exactly that.',
      },
      {
        q: 'What happens if a storm lands on our move date?',
        a: 'We reschedule, and the rate does not change because the calendar did. Between June and November this is a real possibility in Broward and we plan for it: no deposit means nothing is at risk if the date has to shift, and storage from $200 per month is available if your load needs somewhere safe while a closing or a road reopens. We watch the forecast for booked dates and will contact you before you have to chase us.',
      },
      {
        q: 'Who runs the company, and do the movers speak Russian?',
        a: 'Easy Move Florida is owner-led by Evgenii Romanov, also spelled Eugene, working out of Hollywood in south Broward. He handles the estimates and the schedule directly. Crews work in English and Russian, and there is a Russian version of this page if that is easier for someone in your household.',
      },
    ],
  },
  {
    slug: 'sunrise-movers',
    name: 'Sunrise',
    state: 'FL',
    county: 'Broward',
    heroHeadline: 'Movers For Sunrise Condos And Homes',
    heroSub: 'Sunrise Lakes · Welleby · Sawgrass corridor · Sunrise Golf Village · Sunrise Bay · Village Green',
    heroImage: '/images/Real/Fort-Lauderdale.jpg',
    metaTitle: 'Sunrise Movers | Easy Move Florida',
    metaDescription: 'Movers in Sunrise FL for condos and houses. 2 movers $129/hr, 3 movers $179/hr, truck on its own line, free COI. English and Russian. Call 786-305-1844.',
    intro: "Sunrise runs from the older condo associations around Sunrise Lakes and Sunrise Golf Village to the single-family streets of Welleby and the newer developments along the Sawgrass corridor. Those are three different move days. A fourth-floor condo with one small elevator and a written loading rule is not the same job as a two-storey house with a driveway you can back a 26-foot truck into, and the estimate should not pretend otherwise. Easy Move Florida is owner-run by Evgenii Romanov and based in Hollywood, about 20 miles south, so we travel out to Sunrise rather than working from a yard in the city. That is not a problem — it means we start early and confirm access details before the truck rolls. Rates are $129 an hour for two movers, $179 for three, $219 for four, with a three-hour minimum and the truck billed as its own line at the same figure as the crew rate. The crew works in English and Russian.",
    neighborhoods: [
      'Sunrise Lakes',
      'Welleby',
      'Sunrise Golf Village',
      'Sawgrass Corporate Park area',
      'Springtree',
      'Village Green',
      'Sunrise Bay',
      'Sunset Strip',
      'Sunrise Lakes Phase IV',
      'Sawgrass Mills area',
      'Nob Hill Road corridor',
      'Flamingo Road corridor',
    ],
    localFacts: [
      {
        title: 'Older condo associations still run on paperwork',
        body: 'Buildings around Sunrise Lakes and Sunrise Golf Village were built long before online portals. As a rule the management office wants a signed move form, a certificate of insurance and a reserved window, and it wants them on paper a few days ahead. We ask for your association contact when you book, send the COI within 24 hours in their required format with the association named as additional insured, and follow up by phone if nobody replies. The COI costs nothing.',
      },
      {
        title: 'Elevator windows are usually shorter than people expect',
        body: 'Most Sunrise associations with an elevator will pad it and reserve it for you, but typically only for a block of two or three hours, often mid-morning on a weekday. That block sets the whole plan. We size the crew to finish inside it rather than sending two movers to a job that needs four, and we stage boxes in the hallway before the elevator is released so the reserved time is spent carrying, not walking.',
      },
      {
        title: 'Welleby houses are a truck-access question, not a stairs question',
        body: 'Single-family streets in Welleby and Springtree usually take a full-size truck, but cul-de-sacs, low branches and narrow swale strips catch people out. Before we schedule we look at your street and driveway by map and by a short video you send from your phone. If the approach is tight we bring a 16-footer or plan a short shuttle. There is no stairs fee and no long-carry fee — access affects the hours, and the hours are in the estimate.',
      },
      {
        title: 'Sawgrass traffic decides your start time',
        body: 'The stretch around Sawgrass Mills, the Sawgrass Expressway ramps and the arena is slow from mid-afternoon and worse on event days. Coming up from Hollywood we plan an early arrival — often 7 or 8 in the morning — so loading happens before the roads fill. Early starts also match the quiet-hours rules many associations here keep. If your building will not open before nine, we tell you that at the estimate stage and build the day around it.',
      },
      {
        title: 'Storage between a Sunrise closing and the next one',
        body: 'Closings rarely line up. If you hand over keys on a Friday and cannot take possession until the following week, we load, hold your goods in storage from $200 a month, and redeliver when you are ready. Everything is inventoried on the way in so you know what is there. It costs less than a hotel week with a truck sitting outside, and it removes the pressure to force two closings onto the same day.',
      },
      {
        title: 'What the invoice actually looks like',
        body: 'Two movers are $129 an hour, three are $179, four are $219, with a three-hour minimum and billing in 15-minute increments after it. The truck is its own line at the same figure as the crew rate for the day, so $129 with two movers or $179 with three. The smallest possible invoice is $516 with a two-mover crew. There is no weekend, seasonal or fuel surcharge, no deposit, and free cancellation more than 48 hours out.',
      },
    ],
    faqs: [
      {
        q: 'Do you actually cover Sunrise, or only the coast?',
        a: 'We cover Sunrise regularly. Our base is in Hollywood, roughly 20 miles south, and we drive out — we do not claim a yard or an office in Sunrise, because we do not have one. In practice the only difference it makes is the start time: crews leave early so they are at your door before the Sawgrass corridor slows down. Travel does not add a separate fee to your rate.',
      },
      {
        q: 'My association in Sunrise Lakes wants a certificate of insurance. What do you need from me?',
        a: "Send us the management company name, the exact association name as it should appear, the address the certificate goes to, and any sample or template they gave you. We issue the COI free within 24 hours of booking, in their required format, naming the association as additional insured. Many associations here ask for limits in the $1M–$2M range — we confirm your association's exact requirements before move day rather than guessing.",
      },
      {
        q: 'The building only gives me a two-hour elevator reservation. Can that work?',
        a: 'Usually, if the crew is sized for it. A two-bedroom condo with a two-hour elevator block is a three or four-mover job, not a two-mover job, because the constraint is the elevator rather than the total weight. We pre-stage on your floor, run continuously while the elevator is ours, and finish the truck-side work afterwards. If the window is genuinely too short we say so before you book instead of running over.',
      },
      {
        q: 'Is there an extra charge for stairs or a long carry from visitor parking?',
        a: 'No. Stairs, elevators, long carries from visitor parking and heavy items do not have their own fees on our estimates. They cost time, and time is already priced into the estimated hours. That is why we ask about the walk from the loading area to your door before quoting - a 200-foot carry across a parking lot is a real difference in hours, and we would rather show it in the estimate than surprise you with a line item.',
      },
      {
        q: 'What does a typical Sunrise move cost?',
        a: 'A studio generally lands between $516 and $645 all in. A one-bedroom is $516 to $774, a two-bedroom $645 to $1,253, a three-bedroom $1,253 to $1,611, and a four-bedroom or house $1,611 to $2,327. Those are total figures including the truck line, not hourly teasers. Where you fall in the range depends on access, packing and distance between addresses. We give you a written estimate before you commit.',
      },
      {
        q: 'Can you move a house in Welleby if the street will not take a big truck?',
        a: 'Yes. We check the approach first using a map view and a short video from your phone, and if a 26-foot truck cannot get in cleanly we bring a 16-footer or shuttle from a legal parking spot nearby. It adds hours rather than fees. Telling us about a tight cul-de-sac, a low branch or a gate at the estimate stage is what keeps the day predictable.',
      },
      {
        q: 'Do you pack, or only load what I have already boxed?',
        a: 'Either. Packing is $79 an hour for two packers, and a studio packing package starts at $237. Plenty of people in Sunrise pack their own clothes and books and hand us the kitchen, the artwork and the electronics, which is usually the sensible split. We bring materials, label by room and unpack at the other end if you want that too. Tell us which parts you want covered and it goes in the estimate.',
      },
      {
        q: 'Do you speak Russian?',
        a: 'Yes. The owner, Evgenii Romanov, and the crew work in English and Russian, so you can do the walkthrough, the quote and the move day itself in either language. There is a Russian version of this page. Call or message 786-305-1844 - the same number takes WhatsApp - and you will be talking to the person who runs the company rather than a call centre reading from a script.',
      },
    ],
  },
  {
    slug: 'delray-beach-movers',
    name: 'Delray Beach',
    state: 'FL',
    county: 'Palm Beach',
    heroHeadline: 'Delray Beach Moving, Downtown To Oceanfront',
    heroSub: 'Atlantic Avenue · Pineapple Grove · Lake Ida · Delray Beach Club area · Tropic Isle · Seagate',
    heroImage: '/images/Real/Boca-Raton.jpg',
    metaTitle: 'Delray Beach Movers | Easy Move Florida',
    metaDescription: 'Delray Beach movers: $129/hr for 2, $179/hr for 3, truck on its own line, free COI for your association. Owner-run, English and Russian. 786-305-1844.',
    intro: "Delray Beach is the hardest kind of move to guess at from a phone call. Downtown lofts sit above shops on Atlantic Avenue where the kerb is metered, the alley is shared and nobody wants a truck parked across a storefront at lunchtime. Oceanfront condos on the barrier island have freight elevators, dock windows and management offices with approval paperwork. West of the city, 55+ associations run their own rules on which days a move may happen at all. Easy Move Florida is owner-run by Evgenii Romanov out of Hollywood, roughly 40 miles south, so a Delray job is normally an early start with the crew on the road before dawn. We do not have a branch in Delray and will not pretend to. What we do have is a rate that does not move: $129 an hour for two movers, $179 for three, $219 for four, three-hour minimum, truck billed as its own line. English and Russian spoken.",
    neighborhoods: [
      'Atlantic Avenue downtown',
      'Pineapple Grove',
      'Lake Ida',
      'Seagate',
      'Tropic Isle',
      'Del-Ida Park',
      'Osceola Park',
      'Beach Drive area',
      'Sherwood Park',
      'Lake Forest',
      'Rainberry Bay',
      'Hamlet',
    ],
    localFacts: [
      {
        title: 'Atlantic Avenue is a loading problem before it is a moving problem',
        body: 'Along the Avenue the kerb is metered, deliveries share a rear alley and businesses need their access kept clear through the day. The practical answer is to be finished before the restaurants open. We normally start at first light for downtown addresses, confirm in advance where a 26-foot truck can legally sit, and bring a smaller vehicle when the alley will not take a full-size box. Nothing about that changes your hourly rate.',
      },
      {
        title: 'Downtown lofts often have one narrow interior stair',
        body: 'Apartments above the shopfronts on and around the Avenue frequently have a single stair, a turn at the landing and no elevator at all. Sofas and king mattresses have to be measured against that turn rather than against the doorway. We ask for photos of the stairwell and the landing before quoting, plan hoisting or disassembly if needed, and staff the job so nobody is carrying alone. Stairs cost time, which is in the estimate, not a fee.',
      },
      {
        title: 'Barrier island buildings run on dock and elevator windows',
        body: 'Oceanfront and near-ocean condos here typically assign a freight elevator and a service entrance for a fixed block, often on a weekday morning, and expect the truck gone before the afternoon. Some also want the crew names in advance at the front desk. We collect those details when you book, send the certificate of insurance free within 24 hours in the format management asks for, and plan the load order so the elevator time is used efficiently.',
      },
      {
        title: '55+ associations approve people, not just dates',
        body: 'West of the city many communities require the resident application to clear before anyone can move in, and the approval date, not your closing date, sets the earliest possible move day. As a rule they also restrict moves to weekdays inside set hours and want the vendor certificate on file first. We work backwards from their approval letter, hold your date, and reschedule at no charge if their committee runs late. Cancellation more than 48 hours out is free.',
      },
      {
        title: 'Season changes what a Delray move day looks like',
        body: 'From late autumn through spring the traffic, the parking and the association offices are all busier, and popular move dates go early. Summer is quieter but sits inside hurricane season, when a named storm can close a building to moves at short notice. We book further ahead for winter dates, keep an eye on the forecast for summer ones, and move your date rather than charging you if a building shuts. There is no seasonal surcharge either way.',
      },
      {
        title: 'What you pay, in plain figures',
        body: 'Two movers $129 an hour, three $179, four $219. Three-hour minimum, then billing in 15-minute increments. The truck is a separate line charged per day at the same figure as the crew rate. Typical all-in totals run $516 to $774 for a one-bedroom, $645 to $1,253 for a two-bedroom and $1,253 to $1,611 for a three-bedroom. No deposit, no weekend or fuel surcharge, and a written estimate before you commit.',
      },
    ],
    faqs: [
      {
        q: 'Can a moving truck park on Atlantic Avenue?',
        a: 'Not casually, and not for long. The kerb is metered, the rear alleys are shared with deliveries, and afternoon foot traffic makes a full-size truck unwelcome. We handle it by starting very early, checking your specific block in advance for a legal spot, and using a smaller truck with a short shuttle where the alley is too tight. Downtown moves that begin at six or seven in the morning are usually finished before the Avenue wakes up.',
      },
      {
        q: 'How early do you start a Delray Beach job?',
        a: 'Earlier than most. Our base is Hollywood, about 40 miles south, so the crew leaves before dawn for a morning start here. That is deliberate rather than reluctant: early starts beat the I-95 build-up, match the weekday morning windows most buildings assign, and get downtown loading done before the shops open. You are not charged a travel fee for the distance - the rate on your estimate is the same one anyone else pays.',
      },
      {
        q: 'My 55+ community has not approved my application yet. Should I book?',
        a: "Book the date, but tell us it is pending. Many associations here will not allow a move-in until the applicant is approved, and their committee schedule is outside everyone's control. We hold the date, prepare the certificate of insurance so it is on file when approval lands, and move your booking without penalty if the letter is late. Cancellation more than 48 hours out is free and we take no deposit, so there is nothing at risk in reserving early.",
      },
      {
        q: 'Do you provide a COI for a beachside condo association?',
        a: "Yes, free, within 24 hours of booking, issued in the format your management company requires and naming the association as additional insured. Send us the exact legal name, the management contact and any template they use. Many associations here ask for limits in the $1M–$2M range — we confirm your association's exact requirements before move day. Buildings that also want crew names at the desk get those in advance too.",
      },
      {
        q: 'What if my loft has a narrow stair and no elevator?',
        a: 'Common on and around the Avenue, and workable. Send photos of the stair, the landing turn and the doorway before we quote. We measure large pieces against the turn rather than the door, plan disassembly or a balcony hoist where that is the only way, and add crew so the carry stays safe. There is no stairs fee. A tight stair shows up as more estimated hours, which you see in writing beforehand.',
      },
      {
        q: 'Can you hold my things between closings?',
        a: 'Yes. Storage starts at $200 a month, with an inventory taken as we load so you can see exactly what went in. It is a common request in Delray, where a downtown sale and a new build west of town rarely close on the same day. We load, store, and redeliver on your date. You are not paying two crews - it is the same job split into two halves, and we quote both up front.',
      },
      {
        q: 'Do you move from Delray Beach to another state?',
        a: 'No — we are a local mover and work inside Miami-Dade, Broward and Palm Beach. Moving household goods across a state line requires federal operating authority that we do not hold, so we neither quote nor take those jobs. Call 786-305-1844 anyway and we will point you toward a licensed carrier; we can also still pack your home, or handle a local move into storage on the Florida side.',
      },
      {
        q: 'Who am I dealing with when I call?',
        a: 'Evgenii Romanov, who owns the company and answers the phone himself, in English or Russian. There is a Russian version of this page for clients who prefer it. Reach him on 786-305-1844, phone or WhatsApp. Sending photos of the parking situation, the stair or the elevator lobby with your first message is the fastest route to an accurate number, because those details are what actually decide the hours in Delray.',
      },
    ],
  },
  {
    slug: 'boynton-beach-movers',
    name: 'Boynton Beach',
    state: 'FL',
    county: 'Palm Beach',
    heroHeadline: 'Boynton Beach 55+ And Gated Moving',
    heroSub: 'Valencia communities · Hunters Run · Indian Spring · Ocean Ridge side · Quantum Village · Renaissance Commons',
    heroImage: '/images/Real/Boca-Raton.jpg',
    metaTitle: 'Boynton Beach Movers | Easy Move Florida',
    metaDescription: 'Boynton Beach movers for 55+, gated and beachside condo communities. $129/hr 2 movers, $179/hr 3, free COI, no deposit. Call or WhatsApp 786-305-1844.',
    intro: "More of Boynton Beach lives behind a gate than not. West of the turnpike the large 55+ and country-club communities set their own move rules, and those rules usually decide the day before the movers do: weekdays only in many of them, a vendor certificate on file before the gate will open, crew names left at the gate house, and quiet hours at both ends. East of Federal Highway the picture flips to beachside condo buildings with freight elevators, service entrances and a loading area shared with every other delivery in the building. Easy Move Florida is owner-run by Evgenii Romanov from a Hollywood base about 46 miles south, so Boynton jobs start early and we do not claim a local branch here. The rate does not change for the distance: $129 an hour for two movers, $179 for three, $219 for four, three-hour minimum, truck on its own line. Crew works in English and Russian.",
    neighborhoods: [
      'Hunters Run',
      'Indian Spring',
      'Valencia Isles',
      'Valencia Lakes',
      'Leisureville',
      'Quantum Village',
      'Renaissance Commons',
      'Sterling Village',
      'Chapel Hill',
      'Golfview Harbour',
      'Lake Worth Road corridor',
      'Boynton Beach Boulevard corridor',
    ],
    localFacts: [
      {
        title: 'The gate house needs your crew before the truck arrives',
        body: 'Most gated communities west of the turnpike will not wave a moving truck through on the day without a vendor already on the approved list. Typically that means the resident calls the gate or the management office ahead, the certificate of insurance is on file, and the crew is registered by name. We send you what you need to pass on as soon as you book, so the first ten minutes of the day are not spent arguing at a barrier.',
      },
      {
        title: 'Weekday-only rules are the single biggest scheduling factor',
        body: 'A large share of the 55+ communities here restrict moves to Monday through Friday, often within a set window such as mid-morning to mid-afternoon, and prohibit them on holidays. Because we charge no weekend premium, that restriction costs you nothing - but it does mean popular weekday dates fill early in season. Tell us your community rule when you first call and we book inside it rather than discovering it on the day.',
      },
      {
        title: 'Quiet hours are enforced more strictly than people assume',
        body: "In a 55+ community the neighbours are home during the day. As a rule that means no ramp noise before the permitted start, no shouting across the lot, and no equipment left running. Our crews work to that: dollies and pads rather than dragging, doors and hallways protected, and the truck positioned so the tail lift is not directly under someone's bedroom window. It is the difference between a smooth day and a complaint to management.",
      },
      {
        title: 'Long carries from visitor parking are normal here',
        body: 'Many buildings and villa clusters keep vendor and visitor parking well away from the units, so a 150 to 300-foot carry with a turn or two is common. There is no long-carry fee on our estimates. What a long carry does is add hours, so we measure the walk during the estimate - either from your photos or on a map - and reflect it in the quoted range instead of discovering it at eight in the morning and revising the price.',
      },
      {
        title: 'Beachside buildings run on a shared dock',
        body: 'East of Federal Highway, condo buildings typically assign the freight elevator and the service entrance in blocks, and your block competes with grocery deliveries, contractors and other residents. The window is usually a weekday morning. We confirm it with management when you book, arrive with enough crew to use it fully, and issue the certificate free within 24 hours naming the association as additional insured in whatever format they require.',
      },
      {
        title: 'Snowbird timing and storm season',
        body: 'Boynton fills up from November and empties from April, which moves both demand and building availability. Winter dates book out first and association offices run slower under the load. Summer is easier to schedule but falls in hurricane season, when a building may suspend moves at short notice. We reschedule for that without a fee, take no deposit, and allow free cancellation more than 48 hours out, so a storm watch does not cost you money.',
      },
    ],
    faqs: [
      {
        q: 'My community only permits moves on weekdays. Does that cost more?',
        a: 'No. We charge no weekend, seasonal or fuel surcharge, so a weekday-only rule has no effect on your rate at all - two movers are $129 an hour whichever day you move. The practical effect is on availability: weekday slots in season go first because so many Boynton communities restrict to them. Give us your community rule and preferred week when you first call and we work inside it.',
      },
      {
        q: 'What does the gate house need from you?',
        a: 'Usually the company name, the certificate of insurance on file with management, and the names of the crew arriving. Some communities also want the truck size or a plate number. We send you all of it as soon as the booking is confirmed so you can pass it to the gate or your management office in advance. Doing this a few days ahead is what keeps a Boynton move day from starting with a twenty-minute delay at the barrier.',
      },
      {
        q: 'How far is your crew travelling to reach Boynton Beach?',
        a: 'About 46 miles. We are based in Hollywood and do not have a yard, office or branch in Boynton Beach - we drive up. For you that means an early departure so the crew is at your door at the start of your permitted window, not in the middle of it. There is no travel surcharge on your estimate. The distance changes our start time, not your rate.',
      },
      {
        q: 'Do you handle the certificate of insurance for a 55+ association?',
        a: "Yes, and it is free. Within 24 hours of booking we issue it in the format your management company requires, naming the association as additional insured. Send us the exact association name, the management contact and any template they provided. Many associations here ask for limits in the $1M–$2M range — we confirm your association's exact requirements before move day rather than assuming one building's rule applies to the next.",
      },
      {
        q: 'The visitor parking is a long way from my villa. Is there a surcharge?',
        a: 'No. Long carries, stairs, elevators and heavy items carry no separate fee with us. They cost time, and time is what the estimate is built from. So we would rather know about the 250-foot walk from vendor parking in advance, because that is the difference between an accurate quoted range and a bad surprise. A photo or a map pin of where the truck can actually stop is enough for us to price it properly.',
      },
      {
        q: 'What will a two-bedroom in Boynton Beach cost?',
        a: 'Typically $645 to $1,253 all in, including the truck line. A one-bedroom runs $516 to $774, a three-bedroom $1,253 to $1,611, and a four-bedroom or single-family house $1,611 to $2,327. The range depends on access, how much is packed when we arrive and the distance between addresses. Billing is in 15-minute increments after the three-hour minimum, so a job that finishes early is billed as finishing early.',
      },
      {
        q: 'Can you move a few items now and the rest after my closing?',
        a: 'Yes, and it is a common request here when a sale and a purchase are weeks apart. We can run two smaller jobs, or load everything at once and hold it in storage from $200 a month with an inventory taken as we load. Downsizing into a 55+ community often means part of the household goes to family or donation as well - we can drop at more than one address on the same day.',
      },
      {
        q: 'Can I get help in Russian?',
        a: 'Yes. Evgenii Romanov owns and runs the company and works in both English and Russian, as does the crew, so the estimate, the walkthrough and the move day can all happen in whichever you prefer. A Russian version of this page is available. Reach us on 786-305-1844 by phone or WhatsApp - photos of your entrance, the parking and any elevator lobby with your first message get you an accurate number fastest.',
      },
    ],
  },
];

export function getCityData(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
