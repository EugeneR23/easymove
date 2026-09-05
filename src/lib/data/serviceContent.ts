/**
 * Long-form, SEO-rich content per service. Keyed by service slug.
 *
 * This lives separately from data/services.json (admin-managed) so that
 * marketing/SEO content doesn't conflict with admin CRUD operations.
 *
 * Each entry expands the service detail page beyond the short tagline/description
 * with: process steps, why-us reasoning, service-specific FAQs (with FAQPage schema),
 * pricing breakdown, and locally-relevant context. Target: 800+ unique words per
 * service page to clear thin-content thresholds.
 */

export interface ServiceContent {
  /** Long-form intro paragraph(s) — 150-300 words. Renders below the short description. */
  longIntro: string[];
  /** What makes us right for this service. 3-5 distinct paragraphs/blocks. */
  whyUs: { title: string; body: string }[];
  /** Step-by-step process for this service. 4-6 steps. */
  process: { step: number; title: string; body: string }[];
  /** Pricing breakdown specific to this service. Renders as a bulleted list. */
  pricingBreakdown: string[];
  /** Service-specific FAQs (rendered + emitted as FAQPage schema). */
  faqs: { q: string; a: string }[];
  /** Closing local-context paragraph. */
  localContext: string;
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'residential-moving': {
    longIntro: [
      "Residential and high-rise moving in South Florida is its own discipline. A move from a Brickell tower has nothing in common with a move from a Coral Gables single-family home — different access, different paperwork, different timing rules. Easy Move Florida handles both with the same standard: the crew arrives knowing the building, the floor protection goes down before any furniture moves, and the coordinator stays reachable from the moment you book until the last item is placed.",
      "We move clients into and out of every type of South Florida residence: 50-story oceanfront condos, gated estate communities, historic Coral Gables and Coconut Grove homes, and standard single-family neighborhoods across Miami-Dade, Broward, and Palm Beach counties. Every move is hourly-billed at $129/hour for two movers or $179/hour for three, with a transparent written estimate before booking. No deposit. No surprise fees on move day.",
    ],
    whyUs: [
      {
        title: 'Building paperwork handled before move day',
        body: "Every South Florida condo building has its own COI requirements, elevator reservation process, and loading dock rules. We submit COI to building management within 24 hours of your booking, addressed exactly as required (additional insured, specific limits, building name spelling). The crew arrives with paperwork already cleared at the dock.",
      },
      {
        title: 'Floor and surface protection on every job',
        body: "Hardwood floors, terrazzo, marble, original tile — all get padded runners or breathable protection from lobby to unit. Doorframes get pad-wrapped before any large piece moves through. This is default, not an upgrade.",
      },
      {
        title: 'Disassembly and reassembly included',
        body: "Bed frames, dining tables, desks, modular wall units — disassembled at origin and reassembled at destination at no additional charge. You don't end up with a truck full of parts and no help putting things back together.",
      },
      {
        title: 'Direct line to the founder',
        body: "Eugene Romanov is reachable throughout your move. Not a dispatcher, not a support line. If something needs attention — a delay, a building rule change, anything — you talk to the person responsible.",
      },
    ],
    process: [
      { step: 1, title: 'Free written estimate', body: 'Tell us your origin, destination, building details, and inventory. We send a written estimate the same day with the hourly rate, expected duration, and the truck fee — charged per day at the crew rate — as its own line. COI goes to your building management within 24 hours of booking, free. No deposit required.' },
      { step: 2, title: 'Building coordination', body: 'After booking, we contact your building management directly to reserve the freight elevator, schedule the loading dock window, and submit the COI. You confirm the move date — we handle the rest.' },
      { step: 3, title: 'Pre-move call', body: '24-48 hours before move day, your coordinator confirms timing, walks through any last-minute changes, and confirms crew size. Crew receives building briefing before departure.' },
      { step: 4, title: 'Move day', body: 'Crew arrives within a 2-hour window with a 30-minute heads-up call. Floor protection laid first. Inventory walk-through with you. Loading begins. Transport. Unloading with placement guidance from you.' },
      { step: 5, title: 'Reassembly and walk-through', body: 'Furniture reassembled, items placed where you want them. Final walk-through with you. Payment is collected on site roughly 45–60 minutes before the job wraps, once the final hour count is clear.' },
    ],
    pricingBreakdown: [
      '2-mover crew: $129/hour, 3-hour minimum',
      '3-mover crew: $179/hour, 3-hour minimum',
      'Truck: charged per day at the crew rate ($129 with 2 movers, $179 with 3, $219 with 4), always a separate line item — fuel, tolls and mileage included',
      'Studio (3-hour minimum, 2 movers): from $516 all-in',
      '1-bedroom (3–5 hours, 2 movers): $516–$774 all-in',
      '2-bedroom (4–6 hours, 2–3 movers): $645–$1,253 all-in',
      '3-bedroom (6–8 hours, 3 movers): $1,253–$1,611 all-in',
      'COI for building management: free, issued within 24 hours of booking',
      'Disassembly and reassembly of standard furniture: included',
      'Quality moving blankets and floor protection: included as loaners',
    ],
    faqs: [
      { q: 'How much does a high-rise move cost in Brickell or Aventura?', a: "A typical 1-bedroom high-rise move in Brickell or Aventura runs $516–$774 all-in. The base is hourly ($129/hr for 2 movers, 3-hour minimum) plus a truck fee per day at that same crew rate — a separate line on your estimate that covers fuel, tolls, and mileage. Add 30-60 minutes for elevator wait time on busier buildings. Your written estimate accounts for this — no surprise fees on move day." },
      { q: 'Do you provide a Certificate of Insurance for my building?', a: "Yes — within 24 hours of your confirmed booking, free of charge. Send us your building's COI requirements (named insured, specific limits, additional insured language) and we issue it directly to building management." },
      { q: 'Can you move on weekends?', a: 'Yes. Saturday is a regular operating day, billed at the same hourly rate. Sundays are case-by-case for buildings that allow Sunday moves (most Brickell and Aventura towers do not).' },
      { q: 'Do you handle gated communities like Cocoplum or Williams Island?', a: 'Yes. We submit gate paperwork (COI with community named, vehicle registration, crew identification) 48 hours in advance so the gate clears your crew on arrival.' },
      { q: 'What if my move takes longer than estimated?', a: "You're billed only for actual time worked, in 15-minute increments past the 3-hour minimum. We commit to realistic estimates — most moves come in within 15-30 minutes of estimate. If we underestimated significantly, we discuss it with you before continuing." },
    ],
    // [TODO: confirm with Evgenii] — per-building move history is unverified; phrased below as buildings we work in (service area), not claimed history.
    localContext: "We work in and out of most major South Florida buildings — Brickell City Centre, ICON Brickell, SLS Lux Brickell, 1010 Brickell, Aria on the Bay, Williams Island Towers I-V, Porto Vita, Turnberry Isle, Trump Towers I/II/III, Acqualina, Hollywood Beach Resort, Las Olas Riverhouse, and dozens more. If your building is in our service area, we know its rules.",
  },

  'long-distance-moving': {
    longIntro: [
      "Easy Move Florida does not do long-distance or interstate moves. This page exists so you get a straight answer instead of a quote we cannot honour: we are a local mover working inside Miami-Dade, Broward and Palm Beach, and taking household goods across a state line requires federal operating authority that we do not hold.",
      "That is the whole story. If you are leaving Florida, call 786-305-1844 anyway — we will point you toward a licensed carrier we would use ourselves. We can also still do the parts that are ours: packing your home before the long-haul truck arrives, or the local leg on the Florida side.",
    ],
    whyUs: [
      {
        title: 'Why we say no to this',
        body: "A mover who quotes an interstate job without the authority to run it is either subcontracting it silently or gambling. Both leave you with a company that cannot answer for your belongings once they are on the road. We would rather lose the booking than be that company.",
      },
      {
        title: 'What we can still do for an out-of-state move',
        body: "Packing is packing wherever the truck is going, from $79 per hour for two packers. If your long-haul carrier wants everything boxed and ready on the driveway, that is work we do well. Same for moving you into storage on this end while the interstate leg is arranged.",
      },
    ],
    process: [
      { step: 1, title: 'Tell us where you are going', body: 'Call or WhatsApp 786-305-1844. If the destination is outside Florida, we will say so on that first call rather than after you have booked.' },
      { step: 2, title: 'We point you somewhere real', body: 'We will name a licensed carrier rather than hand you a list. You can also check any mover yourself against the federal register before you pay anyone a deposit.' },
      { step: 3, title: 'We take the Florida-side work if you want it', body: 'Packing, a local move into storage, or getting a home ready for the long-haul crew — all priced the same way our local work is, hourly with the truck as its own line.' },
    ],
    pricingBreakdown: [
      'Long-distance and interstate moves: not offered, not quoted',
      'Packing before a long-haul carrier arrives: from $79/hour for two packers',
      'Local move into storage on the Florida side: standard hourly rates, from $129/hour for two movers',
      'Storage coordination: from $200/month through our storage partner',
    ],
    faqs: [
      { q: 'Can you move me from Miami to New York?', a: 'No. We do not hold the federal operating authority that interstate household moves require, so we do not quote or take them. Call us and we will point you toward a licensed carrier — that costs you nothing and saves you the round of calls.' },
      { q: 'Do you move within Florida but outside South Florida — say Miami to Orlando?', a: 'Our work is local: Miami-Dade, Broward and Palm Beach. We are registered and set up for that, and going further afield is a different service with different rules. Ask us and we will be straight with you about whether it is something we can do.' },
      { q: 'Can you pack for me even if another company drives?', a: 'Yes, and it is common. Packing runs from $79 per hour for two packers, with a studio package from $237. We box, wrap and label so the long-haul crew loads a home that is ready, which usually saves you money on their end too.' },
      { q: 'How do I check that a long-distance mover is legitimate?', a: 'Ask for their USDOT number and look it up in the federal register before you pay a deposit. A carrier that will not give you the number over the phone has told you something useful. This is the same check you could run on us, which is why we are telling you plainly that interstate is not ours.' },
    ],
    localContext: "We are a Hollywood-based local mover: Miami-Dade, Broward and Palm Beach. That focus is deliberate, and it is why the pages on this site quote hourly rates for local work and say nothing about per-mile interstate pricing.",
  },
  'international-moving': {
    longIntro: [
      "International relocation from Miami is one of the most logistically complex moves you can make. Customs documentation, ocean freight scheduling, country-specific import rules, destination delivery — these are specialized disciplines handled by licensed international freight forwarders. Easy Move Florida handles what we do best: professional packing to international shipping standards on the Miami end, loading onto your carrier or container, and coordinating the handoff. We're straightforward about our role.",
      "Miami is the gateway port for moves to Latin America (Panama, Colombia, Brazil, Argentina, Mexico), the Caribbean (Bahamas, Cayman Islands, Puerto Rico, Dominican Republic), and Europe (UK, Spain, Italy, France, Portugal). Our role is to make sure your belongings leave South Florida packed correctly, loaded correctly, and documented correctly. Once the freight forwarder takes over for ocean or air transport, your goods are in licensed international hands.",
    ],
    whyUs: [
      {
        title: 'International packing standards',
        body: "Ocean freight subjects belongings to humidity, temperature swings, and weeks of truck/ship vibration. We pack to standards that account for that: extra padding on fragile items, vacuum-sealed bags for textiles, custom crates for art and antiques, moisture barriers in containers.",
      },
      {
        title: 'Freight forwarder coordination',
        body: "We work with vetted licensed international freight forwarders (FMC-licensed NVOCCs) for the ocean or air portion. We can recommend partners based on destination — but we're transparent: we're the Miami-end mover, not the freight specialist.",
      },
      {
        title: 'Inventory documentation',
        body: "Every item is photographed, inventoried, and entered on a packing list that becomes part of your customs documentation. This protects you in the event of a claim and is required by most destination countries.",
      },
      {
        title: 'Single point of contact through handoff',
        body: "Eugene stays the point of contact through the moment your goods are handed off to the freight forwarder. After handoff, you work directly with the freight specialist for transport, customs, and destination delivery.",
      },
    ],
    process: [
      { step: 1, title: 'Consultation and forwarder coordination', body: 'We discuss destination country, timing, and volume. If you have a freight forwarder, we coordinate directly with them. If you need a recommendation, we suggest vetted partners.' },
      { step: 2, title: 'Custom written estimate', body: 'Quote includes packing labor, materials (international-grade), loading, and forwarder coordination. Ocean/air freight quoted separately by your forwarder.' },
      { step: 3, title: 'Pre-pack walk-through', body: '1-2 days before pack date, we confirm inventory and identify items requiring custom crating (art, antiques, fragile electronics, oversized).' },
      { step: 4, title: 'Pack day(s)', body: 'Most international packs take 1-2 days. Detailed inventory list created, photos of every box, custom crating built on-site for specialty items, vacuum-sealing for textiles.' },
      { step: 5, title: 'Container or LCL loading', body: 'For full container (FCL): loaded directly into 20ft or 40ft container at your address or at port warehouse. For less-than-container (LCL): delivered to forwarder warehouse for consolidation.' },
      { step: 6, title: 'Handoff to forwarder', body: 'Goods handed off to licensed freight forwarder with complete inventory, customs paperwork, and photos. We provide you with all documentation. After this point, freight forwarder is your contact.' },
    ],
    pricingBreakdown: [
      'Minimum charge: $4,500 (small partial pack + container load)',
      '1-bedroom, packed and loaded: typical range $6,000–$9,500',
      '2-bedroom, packed and loaded: typical range $9,000–$14,000',
      '3-bedroom, packed and loaded: typical range $14,000–$22,000',
      'Custom crating per piece (art/antique): $200–$800 depending on size',
      'Ocean freight: quoted separately by freight forwarder ($3,000–$15,000+ depending on route and volume)',
      'Inventory and packing-list documentation for customs: included in our cost',
      'Destination delivery: handled by destination agent, quoted separately',
    ],
    faqs: [
      { q: 'Do you handle the ocean or air freight portion?', a: "No — international transport requires an FMC-licensed freight forwarder (NVOCC). We handle the Miami-side packing, loading, and forwarder coordination. We can recommend vetted partners, but international transport is handled by specialists." },
      { q: 'How long does an international move take?', a: 'Pack and load: 1-2 days. Ocean transit: 2-6 weeks depending on destination (Caribbean: 1-2 weeks, Latin America: 2-4 weeks, Europe: 4-6 weeks). Customs clearance and destination delivery: add 1-3 weeks. Total door-to-door: typically 6-10 weeks.' },
      { q: 'Will I have a single contact through the whole move?', a: "Through the Miami-end (consultation, packing, loading, forwarder handoff): yes, Eugene is your contact. After freight forwarder takeover: you work with them directly for transport, customs, and destination. We can stay in the loop on request." },
      { q: 'Do I need to be in Miami for the pack?', a: "Strongly recommended. International moves involve customs paperwork, declarations, and decisions about what's shipped vs. what's stored or sold. Being present at the pack ensures nothing important is missed or mispacked." },
      { q: 'What documents do I need?', a: 'Passport, destination visa documentation, signed power of attorney for customs (provided by forwarder), inventory list (we create), proof of ownership for high-value items, and country-specific import permits if required.' },
    ],
    localContext: "Miami is the largest container port on the US East Coast and the gateway for nearly all moves to Latin America and the Caribbean. We work with several FMC-licensed freight forwarders specializing in different regions: Latin America, Europe, and the Caribbean each have specialists we trust. We coordinate, but we're the Miami movers — not the international freight specialists.",
  },

  'office-commercial': {
    longIntro: [
      "Office moves succeed or fail on scheduling. The actual moving labor is the easy part. The hard parts are: timing the move so your team has somewhere to work Monday morning, coordinating with building management at both ends (most office buildings require COI, after-hours scheduling, and specific freight elevator windows), handling IT and AV equipment without breaking it, and getting modular furniture disassembled and reassembled correctly. Easy Move Florida handles all of that.",
      "We work after-hours and weekends to keep your downtime short. Crews are briefed on your specific equipment, layout, and reassembly plan before they arrive. Eugene stays directly involved on every commercial move because office work has higher consequences for things going wrong — a missed Monday morning is a real cost. Our office and commercial pricing is custom-quoted based on crew size, scope, and scheduling requirements.",
    ],
    whyUs: [
      {
        title: 'After-hours and weekend scheduling',
        body: "We schedule around your business hours — most office moves happen Friday evening through Sunday so your team works in the new space Monday morning. After-hours rates apply, but the alternative is losing a workday across your entire team.",
      },
      {
        title: 'IT and AV equipment handled correctly',
        body: "Monitors, computers, servers, AV gear, and conference room equipment require specific packing and labeling so reassembly at destination is fast. We coordinate with your IT person (or recommend one) for proper disconnect/reconnect of complex setups.",
      },
      {
        title: 'Modular furniture disassembly and reassembly',
        body: "Cubicles, modular wall systems, and benching require disassembly with hardware tracking and a reassembly plan. We've handled Steelcase, Herman Miller, Knoll, and most major systems. Hardware bagged and labeled by station.",
      },
      {
        title: 'Direct owner involvement',
        body: "Eugene is on-site or in direct contact throughout commercial moves. Mistakes on office moves cost real money in lost productivity, so the owner stays involved.",
      },
    ],
    process: [
      { step: 1, title: 'Site walk-through', body: "We visit both origin and destination to confirm scope, identify equipment requiring special handling, and confirm building requirements (COI, freight elevator, parking, after-hours access)." },
      { step: 2, title: 'Custom written quote', body: 'Quote includes crew size, total hours, after-hours premium if applicable, IT coordination, modular furniture disassembly/reassembly, and any specialty handling. Itemized so you know exactly what you\'re paying for.' },
      { step: 3, title: 'Building paperwork', body: 'After booking, we coordinate COI submission, after-hours building access, freight elevator reservation, and parking arrangements at both addresses.' },
      { step: 4, title: 'Pre-move planning meeting', body: 'For larger moves (20+ workstations), we meet with your team or facilities lead 1 week before to confirm labeling system, reassembly plan, and contingencies.' },
      { step: 5, title: 'Move execution', body: 'Crew arrives on schedule. Floor protection. Disassembly with hardware tracking. Loading. Transport. Unloading. Reassembly per plan. Equipment placed in new layout.' },
      { step: 6, title: 'Punch list and handoff', body: 'Walk-through with you the morning your team returns. Anything that needs adjustment is fixed same-day. We don\'t leave until you confirm everything is in place.' },
    ],
    // [TODO: confirm with Evgenii] — office/commercial rates below need confirmation.
    pricingBreakdown: [
      'Minimum charge: $800 (small office, weekday)',
      'Small office (5-10 workstations, after-hours): typical $1,800–$3,500',
      'Mid-size office (15-30 workstations): typical $4,500–$9,500',
      'Large office (40-80 workstations): typical $12,000–$24,000',
      'After-hours premium: 25-40% over weekday rate',
      'Modular furniture disassembly/reassembly: included in quote',
      'IT coordination (basic disconnect/label): included',
      'Specialty AV/server equipment: case-by-case quote',
    ],
    faqs: [
      { q: 'Can you move our office over a weekend so we don\'t lose a workday?', a: "Yes — most of our office moves happen Friday evening through Sunday for exactly that reason. After-hours premium applies, but the productivity savings typically pay for it many times over." },
      { q: 'Do you handle IT equipment?', a: 'Yes — monitors, computers, AV gear, and basic disconnect/reconnect coordination. For complex server racks, network closets, or specialized equipment, we coordinate with your IT person or recommend a partner.' },
      { q: 'What about modular furniture like Steelcase or Herman Miller?', a: "Yes. We disassemble with hardware tracking, transport carefully, and reassemble per your reassembly plan. Most major systems (Steelcase, Herman Miller, Knoll, Teknion) are familiar to us." },
      // [TODO: confirm exact building COI limits with Evgenii]
      { q: 'Can you provide a Certificate of Insurance for our building?', a: "Yes — within 24 hours of booking, addressed to your building management. Commercial buildings commonly ask for limits in the $1M–$2M range, often with the building specifically named as additional insured. We confirm your building's exact requirements before move day and handle the paperwork." },
      { q: 'How far in advance should we book an office move?', a: 'Small offices (under 10 workstations): 2-3 weeks. Mid-size: 4-6 weeks. Large (40+): 6-8 weeks. The longer lead time is mostly about coordinating building access at both ends, not crew availability.' },
    ],
    // [TODO: confirm with Evgenii] — per-building office-move history is unverified; phrased below as buildings we work in (service area), not claimed history.
    localContext: "Most South Florida commercial buildings (Brickell, Downtown Miami, Las Olas, Boca Corporate Centre) have strict after-hours move-in windows and COI requirements. We work in and out of Brickell City Centre, Southeast Financial Center, Las Olas City Centre, and most major Class-A buildings in the region. We know the dock rules and plan around them.",
  },

  'specialty-items': {
    longIntro: [
      "Fine art, antiques, grand pianos, oversized sculpture, and collector items require more than moving blankets and a standard truck. They require custom crating where appropriate, climate-aware loading, slow and deliberate placement, and full documentation. Easy Move Florida handles specialty items as a dedicated service — quoted individually because every piece is different.",
      "We've moved oil-on-canvas paintings (small frames to museum-scale installations), bronze sculpture (tabletop to oversized garden pieces), grand and baby grand pianos (Steinway, Yamaha, Bösendorfer, and others), antique furniture (18th-century European, mid-century modern, oversized armoires), large mirrors, chandeliers, wine collections (climate-controlled when needed), and high-end electronics. If a piece requires equipment or expertise beyond what we offer, we'll tell you upfront — not take the job and figure it out later.",
    ],
    whyUs: [
      {
        title: 'Custom crating built on-site',
        body: "For art, antiques, and fragile sculpture, we build custom protective crates on-site. Foam-lined, padded, secured for transport. For pieces continuing with an interstate carrier or overseas, we build to international shipping standards before hand-off.",
      },
      {
        title: 'Climate-aware loading',
        body: "South Florida heat and humidity damage wood, oil paintings, and certain materials during loading. We minimize exposure time, use moisture barriers in the truck, and coordinate climate-controlled transport for high-value or sensitive pieces.",
      },
      {
        title: 'Photo documentation before and after',
        body: "Every specialty item is photographed before packing and after unpacking. This protects both you and us in the event of a claim, and gives you a complete record.",
      },
      {
        title: "Honest about what we don't do",
        body: "Some pieces require gallery-grade fine art handlers, museum riggers, or specialty equipment we don't have. We'll tell you upfront and recommend a specialist rather than take the job. Most clients call us first, and we handle 95% of what we're asked to. The 5% we refer out, we refer to people we trust.",
      },
    ],
    process: [
      { step: 1, title: 'In-person assessment', body: 'For specialty items, we strongly recommend an in-person walk-through. We assess each piece for crating needs, transport requirements, and any access challenges (oversized pieces, narrow stairwells, elevator size).' },
      { step: 2, title: 'Custom written quote', body: 'Quote includes per-piece crating cost, transport, insurance recommendations, and any specialty equipment (rigging, climate transport, etc.). High-value items often warrant declared value insurance — we walk you through options.' },
      { step: 3, title: 'Crating and prep day', body: 'For pieces requiring custom crates, we build them 1-2 days before move day. Photos taken at this stage.' },
      { step: 4, title: 'Move day', body: 'Specialty items loaded with extra care, padded, secured against shifting. Loading order considered for unloading priority. Full inventory documented.' },
      { step: 5, title: 'Placement at destination', body: "Slow, deliberate placement with you present. Pieces unwrapped, inspected, photographed. Final placement coordinated with you — we don't leave until you've confirmed each piece is where you want it." },
    ],
    // [TODO: confirm with Evgenii] — piano/specialty rates below need confirmation.
    pricingBreakdown: [
      'Minimum specialty item charge: $800',
      'Single grand piano move (local): typical $750–$1,400',
      'Custom crate for fine art (per piece): $200–$800 depending on size',
      'Climate-controlled transport (when required): add 25-50% to base',
      'Declared-value or full-replacement insurance: quoted by carrier based on item value',
      'Specialty rigging (oversized, awkward access): quoted case-by-case',
      'Photo documentation: included',
    ],
    faqs: [
      { q: "Do you move grand pianos?", a: "Yes. Upright, baby grand, and concert grand pianos are part of our regular work. A local piano move typically runs $750-$1,400; interstate piano transport we hand to a licensed carrier. We coordinate with piano tuners post-move when requested — pianos require re-tuning after any significant move." },
      { q: 'Can you move large oil paintings or sculpture?', a: "Yes. Custom crating built on-site, climate-aware loading, slow placement at destination. For pieces over 8 feet or weighing over 200 lbs, we may recommend a specialty fine art handler — we'll be honest about what's within our capability." },
      { q: 'How do you handle insurance for high-value items?', a: 'Standard cargo insurance is included up to a per-pound limit. For high-value items (anything over $5,000 typically), we strongly recommend declared value or full-replacement coverage. Your coordinator walks you through options before booking.' },
      { q: 'Do you handle antique or oversized furniture?', a: 'Yes. Antique armoires, 18th-century European pieces, mid-century modern, oversized dining tables — these are common requests. Custom crating where appropriate, padded protection always, photo documentation before and after.' },
      { q: 'Can you move a wine collection?', a: 'Yes — for collections over 50 bottles, we coordinate climate-controlled transport (essential for South Florida summers). Bottles inventoried, packed in proper wine boxes (cell-divided cardboard or wood), loaded last and unloaded first to minimize transit time.' },
    ],
    localContext: "South Florida has one of the highest concentrations of fine art, antiques, and luxury furniture per capita in the US — driven by Miami's growing art market (Art Basel, Miami Design District galleries) and the wealth concentration in Brickell, Coral Gables, Aventura, and Palm Beach. We've moved pieces for collectors in all of these markets and know what handling each type of item requires.",
  },

  'storage-solutions': {
    longIntro: [
      "Storage between a closing and your new home, during a renovation, or as part of an extended move plan is one of the most-requested moving company add-ons. Easy Move Florida coordinates short- and long-term storage at trusted, climate-controlled facilities in Miami-Dade and Broward counties — and we handle the pickup from your current location and the redelivery when you're ready. You don't manage two relationships; we stay the single point of contact throughout.",
      "Storage is month-to-month with no annual contracts. We recommend the right facility based on what you're storing (art and antiques need different conditions than household goods) and how long you need it (short-term staging vs. multi-month renovation hold). Pricing starts at $200/month for small loads and scales with volume.",
    ],
    whyUs: [
      {
        title: 'Climate-controlled facilities',
        body: "South Florida heat and humidity destroy unpadded furniture, oil paintings, and certain wood pieces in non-climate-controlled storage. Every facility we use is climate-controlled (60-78°F, controlled humidity).",
      },
      {
        title: 'Pickup and redelivery handled',
        body: "We pick up from your current location, deliver to storage, and redeliver to your new home when you're ready. You're not making separate arrangements with a self-storage company and then renting a truck for redelivery.",
      },
      {
        title: 'Single point of contact',
        body: "Eugene stays involved throughout the storage period. If something needs to be retrieved early, you call us, not the facility. If you need to extend, we handle it.",
      },
      {
        title: 'Storage insurance available',
        body: "Standard storage insurance is available add-on (per-month rate based on declared value). For high-value items, we coordinate higher-tier coverage with the facility insurance partner.",
      },
    ],
    process: [
      { step: 1, title: 'Initial consultation', body: 'We discuss what you\'re storing, expected duration, and any special handling (art, electronics, wine). Recommendation on facility type and size.' },
      { step: 2, title: 'Pickup and inventory', body: 'On move day, we pick up items, photograph and inventory each piece, and transport directly to facility. You receive complete inventory list with photos.' },
      { step: 3, title: 'Secure storage', body: "Items stored in climate-controlled space with monitored access. We retain access on your behalf — you don't need to manage facility relationships." },
      { step: 4, title: 'Monthly billing', body: 'Storage billed month-to-month. Cancel any time with 7 days notice. No annual contracts, no early termination fees.' },
      { step: 5, title: 'Redelivery', body: 'When you\'re ready, schedule redelivery with us. Full delivery service to your new home — placement, reassembly of any disassembled items, walk-through.' },
    ],
    // [TODO: confirm with Evgenii] — storage rates below need confirmation.
    pricingBreakdown: [
      'Small load (studio worth): from $200/month',
      '1-bedroom worth: typical $275–$425/month',
      '2-bedroom worth: typical $425–$675/month',
      '3-bedroom worth: typical $625–$975/month',
      'Pickup labor: hourly at our standard rates ($129/hr 2 movers)',
      'Redelivery labor: hourly at our standard rates',
      'Storage insurance: optional, ~$15-50/month based on declared value',
      'Climate-controlled (standard): included',
      'Month-to-month, no annual contract',
    ],
    faqs: [
      { q: 'How long can I store items?', a: "Month-to-month — no minimum, no maximum. Some clients store for 30 days during a closing gap; others store for 18+ months during major renovations. Cancel any time with 7 days notice." },
      { q: 'Is storage climate-controlled?', a: "Yes. Every facility we use is climate-controlled to 60-78°F with controlled humidity. South Florida heat and humidity make non-climate-controlled storage a bad option for furniture, art, or anything wood." },
      { q: 'Can I access my items while in storage?', a: 'Yes — with 48-72 hours notice. We retrieve specific items and either deliver to you or hold for pickup at our office. Frequent access is unusual; if you need it, we recommend a self-storage unit instead and we just handle the transport.' },
      { q: 'What about insurance?', a: "Optional storage insurance is available — typically $15-50/month based on declared value. For high-value items (art, antiques over $10K), we coordinate facility-partner coverage. Your homeowner's insurance may also extend to stored items — worth checking before adding storage insurance." },
      { q: 'Can you store items between move-out and move-in dates?', a: 'Yes — this is one of our most common storage uses. Common during closings: move out Tuesday, store 5-30 days, deliver to new home. Pricing is prorated for partial months.' },
    ],
    localContext: "Most of our storage volume is renovation-driven (Coral Gables, Coconut Grove, Brickell condo renovations) or closing-gap storage (Aventura, Sunny Isles, Boca Raton). We use facilities in Miami-Dade and Broward — proximity matters because pickup and redelivery labor is hourly. For Palm Beach county clients, we coordinate with facilities further north to minimize travel.",
  },
};

export function getServiceContent(slug: string): ServiceContent | null {
  return SERVICE_CONTENT[slug] ?? null;
}
