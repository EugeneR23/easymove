/**
 * Long-distance route page content — /moving-miami-to-new-york and friends.
 *
 * The price bands are NOT here. They live in lib/data/routes.ts, the same array
 * /pricing renders, and RoutePage looks them up by slug. A route with no
 * published band sets `hasBand: false` and the page falls back to the flat
 * minimum framing rather than inventing one.
 */
export interface RoutePageData {
  /** Route slug, e.g. 'moving-miami-to-new-york'. Must match routes.ts. */
  slug: string;
  fromCity: string;
  toCity: string;
  toRegion: string;
  metaDescription: string;
  /** Direct-answer paragraph — quotes the published bands for banded routes. */
  answer: string;
  intro: string;
  /** False when no band is published for this route; the page then shows the minimum. */
  hasBand: boolean;
  whatAffects: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const ROUTE_PAGES: RoutePageData[] = [
{
  slug: 'moving-miami-to-orlando',
  fromCity: 'Miami',
  toCity: 'Orlando',
  toRegion: 'Central Florida',
  metaDescription: 'Movers from Miami to Orlando: flat-rate pricing by home size, dedicated truck, no deposit, written estimate within 24 hours. Easy Move Florida, 786-305-1844.',
  answer: 'A one-bedroom move from Miami to Orlando typically costs $1,600–$2,200 and a two-bedroom $2,200–$2,900, quoted as a flat rate for a dedicated truck with no shared loads. Easy Move Florida sends a written estimate within 24 hours of taking your inventory, and there is no deposit to book.',
  intro: "Miami to Orlando is the gentlest long-distance move on our board. The truck rolls up the Turnpike and the whole job keeps the rhythm of one continuous effort — pack, load, drive, unload — without the days-apart limbo that longer routes carry. We see young families trading Miami rents for Lake Nona and Winter Garden, hospitality and healthcare people following work into the tourism corridor, and students arriving for fall semester. Because the run is short, scheduling stays flexible: outside peak season a same-week booking is often realistic. The setup is the same as every Easy Move Florida route — one dedicated truck, an owner-checked inventory, a flat rate in writing, and a coordinator who actually answers the phone.",
  hasBand: true,
  whatAffects: [
    {
      title: 'How much you are actually moving',
      body: "The flat rate is built from your inventory, so the honest driver of price is volume. A sparse one-bedroom lands near the bottom of its band; the same apartment with a packed storage cage and a patio set lands near the top. Send photos or a video walkthrough and the written estimate reflects what you really own.",
    },
    {
      title: 'Access on both ends',
      body: 'A Brickell tower with a booked freight elevator and loading dock is a different job than a Miami townhouse with street parking, and the same is true on arrival — an Orlando driveway is quick, a gated community with a long walk from truck to door is not. Tell us the access picture up front and the quote stays accurate.',
    },
    {
      title: 'When you move',
      body: 'End of month and the summer stretch are the busy season on this route, when leases turn over and families move between school years. A mid-month, mid-week date books easier and gives you more choice of arrival window. The bands do not change, but flexibility helps you land at the friendlier end of one.',
    },
    {
      title: 'Specialty items',
      body: 'A piano, a stone table, gym equipment, or large framed art each add crew time and protective materials, which is what nudges a quote toward the top of its band. None of it is a problem — it just has to be on the inventory before the written estimate, not discovered on move day.',
    },
  ],
  faqs: [
    {
      q: 'How much does it cost to move a 3-bedroom house from Miami to Orlando?',
      a: 'A three-bedroom home runs $3,000–$4,200 on this route. Where you land inside that band depends on how full the house actually is, access at both addresses, and any specialty items like a piano or oversized furniture. The number you receive is a flat rate in writing — it is built from your inventory and does not drift on move day.',
    },
    {
      q: 'How far in advance should I book a Miami to Orlando move?',
      a: 'Because Orlando is the shortest long-distance route we run, the calendar is more forgiving than on our out-of-state hauls. Outside the end-of-month rush and the summer peak, a same-week booking is often possible. If your dates are fixed — a lease end or a closing — a week or two of notice gives you first pick of morning slots.',
    },
    {
      q: 'Is the quote a true flat rate, or can it change?',
      a: 'It is a flat rate built from the inventory you give us, and it only changes if the inventory changes — if move day reveals a garage of boxes nobody mentioned, the quote is revised before anything is loaded, not after. Do the walkthrough honestly, send photos, and the number on your written estimate is the number you pay.',
    },
    {
      q: 'Do you require a deposit to book?',
      a: 'No. Easy Move Florida takes no deposit — you book the date, we send the written estimate within 24 hours of your inventory, and you hold your slot without money down. If your closing slips or your lease dates shift, you are rescheduling a calendar entry, not fighting to recover a prepayment.',
    },
    {
      q: 'Do you deliver to Orlando suburbs like Lake Nona, Winter Garden, or Kissimmee?',
      a: 'Yes. Most of our Orlando deliveries are actually to the suburbs — Lake Nona, Winter Garden, Kissimmee, Windermere, and the new-construction communities around them. The quote is door to door, so a gated community, a long driveway, or an HOA with truck rules just needs to be mentioned when we build your estimate so the crew arrives prepared.',
    },
    {
      q: 'Can you handle a pickup from a downtown Miami or Brickell high-rise?',
      a: 'This is a large share of what we do. High-rise buildings usually want a certificate of insurance on file and a reserved freight elevator, and we handle both — we issue the COI to your management company and plan the load around the elevator window. Book the elevator early; in busy buildings that reservation is the real bottleneck, not the truck.',
    },
  ],
},
{
  slug: 'moving-miami-to-tampa',
  fromCity: 'Miami',
  toCity: 'Tampa',
  toRegion: 'Tampa Bay',
  metaDescription: 'Moving from Miami to Tampa with a dedicated truck and flat-rate pricing. Real price bands, no deposit, written estimate within 24 hours. Call 786-305-1844.',
  answer: 'A one-bedroom move from Miami to Tampa typically costs $1,500–$2,100 and a two-bedroom $2,100–$2,800, quoted as a flat rate for a dedicated truck with no shared loads. Easy Move Florida delivers a written estimate within 24 hours of your inventory, and no deposit is required to book.',
  intro: "Miami to Tampa is the coast-to-coast Florida move: across Alligator Alley and up the Gulf side, one committed push rather than a multi-day expedition. The traffic on this route runs strongly one way right now — remote workers and young families leaving Miami prices for Tampa, St. Petersburg, and the neighborhoods spreading east toward Brandon and Wesley Chapel. We also move retirees swapping the Atlantic for the calmer Gulf coast, and the occasional job going the other direction when a company calls someone back to Miami. It is a route where a small crew with one dedicated truck makes sense: your things load once, ride once, and unload once, with a flat rate agreed in writing before the truck ever leaves Hollywood.",
  hasBand: true,
  whatAffects: [
    {
      title: 'Inventory volume',
      body: 'The bands are wide because homes are. A minimalist one-bedroom books near the bottom of $1,500–$2,100; the same floor plan with a home office, bikes, and a balcony of planters climbs toward the top. The written estimate is built from what you actually list, so a careful inventory is the cheapest thing you can do.',
    },
    {
      title: 'Access at both addresses',
      body: 'Miami pickups often mean condo formalities — freight elevators, COIs, loading docks with time limits. Tampa arrivals range from an easy suburban driveway to a downtown or Water Street tower with its own rules. Each hard-access end adds crew hours, and knowing about both in advance keeps the flat rate honest.',
    },
    {
      title: 'Season and date',
      body: 'Summer is the heavy season, when leases end and families move before school starts, and it is also afternoon-storm season on the cross-state drive — we plan loads earlier in the day for it. End of month is tight on every route. A flexible mid-month date usually books faster and sits lower in the band.',
    },
    {
      title: 'Specialty and oversized items',
      body: 'Kayaks, paddleboards, and garage gyms are regulars on Gulf-coast moves, alongside the usual pianos and art. Anything that needs custom wrapping, two extra sets of hands, or careful truck placement pushes a quote up inside its band. List it all when we build the estimate and nothing surprises anyone on move day.',
    },
  ],
  faqs: [
    {
      q: 'How much does it cost to move a 2-bedroom apartment from Miami to Tampa?',
      a: 'A two-bedroom runs $2,100–$2,800 as a flat rate. The low end is a lightly furnished apartment with easy access at both doors; the high end is a full household with a storage unit stop or a high-rise on one end. Your written estimate arrives within 24 hours of the inventory and holds unless the inventory itself changes.',
    },
    {
      q: 'Do you deliver to St. Petersburg, Clearwater, and the beaches?',
      a: 'Yes — the whole Tampa Bay area is one delivery zone for us: St. Petersburg, Clearwater, Largo, Brandon, Wesley Chapel, and the beach towns. Barrier-island addresses sometimes have bridge and parking quirks, and older St. Pete bungalow streets can be narrow, so mention the exact address early and the crew plans the approach before arrival.',
    },
    {
      q: 'Is my furniture loaded with other people’s shipments?',
      a: 'No. Every Miami to Tampa move rides in its own dedicated truck — no shared loads, no consolidation warehouse, no waiting for a carrier to fill a trailer. That is why the timeline is yours instead of a delivery window spanning half a month, and why the crew that loads your home is the crew that unloads it.',
    },
    {
      q: 'What about moving during hurricane season?',
      a: 'We run this route all year, including June through November. Summer afternoons across the state bring reliable thunderstorms, so we schedule loads early and keep the day flexible. If a named storm actually threatens either coast, your coordinator moves the date with you at no penalty — with no deposit taken, rescheduling costs you nothing but a phone call.',
    },
    {
      q: 'How does the flat rate compare to paying hourly?',
      a: 'Local jobs bill hourly — our crews run $129 to $219 per hour depending on size — but a cross-state move on the clock would leave you paying for every mile of drive time and every slow elevator. The flat rate transfers that risk to us: traffic on the Alley, a slow dock, a rain delay are our problem, and your price is already fixed in writing.',
    },
    {
      q: 'Can you pack the apartment as well?',
      a: 'Yes. Packing crews start from $79 per hour plus materials, and on a cross-state move it is usually done the day before loading so boxes have time to be sealed and labeled properly. You can also pack yourself and have us handle only furniture protection. Either way, decide before the estimate so the flat rate covers exactly the service you want.',
    },
  ],
},
{
  slug: 'moving-miami-to-jacksonville',
  fromCity: 'Miami',
  toCity: 'Jacksonville',
  toRegion: 'Northeast Florida',
  metaDescription: 'Miami to Jacksonville movers with flat rates by home size, one dedicated truck, no deposit, and a written estimate within 24 hours. Call 786-305-1844 today.',
  answer: 'A one-bedroom move from Miami to Jacksonville typically costs $1,900–$2,600 and a two-bedroom $2,600–$3,500, quoted as a flat rate for a dedicated truck with no shared loads. Easy Move Florida sends a written estimate within 24 hours of your inventory, and there is no deposit to book.',
  intro: "Jacksonville is the longest move you can make without leaving Florida — a straight run up I-95 nearly the full length of the state. The truck is committed for the round trip, which is why the bands sit a step above Orlando and Tampa, but the move itself still has in-state simplicity: no state lines, no multi-day linehaul, one crew from door to door. The people making this move are a distinct crowd — Navy families rotating through the Jacksonville bases and arranging their own moves, logistics and finance people following the city's growing employers, and South Floridians who ran the math and found a house in Jacksonville for what a condo costs in Miami. Flat rate, dedicated truck, written estimate within 24 hours, no deposit — the standard Easy Move Florida terms apply.",
  hasBand: true,
  whatAffects: [
    {
      title: 'Volume, measured honestly',
      body: 'On the longest in-state run, volume matters more than anywhere else in Florida — the truck is committed either way, so what you load is what separates the bottom of a band from the top. A ruthless declutter before the inventory is worth real money here. List what remains accurately and the flat rate reflects it.',
    },
    {
      title: 'Access at pickup and delivery',
      body: 'Miami-side pickups bring the usual condo logistics — COI, freight elevator, dock windows. On the Jacksonville side, a suburban driveway in Mandarin or Nocatee is fast, while a Riverside or San Marco street of older homes with narrow drives and low oaks takes more care. Each difficult end adds crew time inside the band.',
    },
    {
      title: 'Date and season',
      body: 'Summer and end of month are the crunch on this route, with an extra pulse around military rotation season when base families move. Mid-month and mid-week dates book with less notice and give you better pick of loading times. Booking early does not change the bands, but it protects the exact day you need.',
    },
    {
      title: 'Specialty items and extra stops',
      body: 'Pianos, safes, and oversized sectionals add handling time, and this route often adds a stop — a storage unit in Broward to empty, or a St. Augustine address on the way north. A stop is fine and often efficient, but it belongs in the written estimate, priced up front rather than negotiated at the curb.',
    },
  ],
  faqs: [
    {
      q: 'How much does it cost to move a 3-bedroom house from Miami to Jacksonville?',
      a: 'A three-bedroom home runs $3,500–$5,000 flat. The spread covers real differences between households: a lean, well-purged three-bedroom with driveway access at both ends sits low; a full house with a garage, patio furniture, and a piano sits high. Your written estimate arrives within 24 hours of the inventory and is the price you pay.',
    },
    {
      q: 'Why does Jacksonville cost more than Orlando or Tampa from Miami?',
      a: 'It is simply a longer commitment of the same resources — the truck and crew travel nearly the whole state and cannot take other work that day, so the flat rate carries more drive than the shorter in-state routes. The structure is identical: dedicated truck, no shared loads, written estimate within 24 hours, no deposit. Only the length of the run changes.',
    },
    {
      q: 'Can you deliver to St. Augustine or Ponte Vedra on the way?',
      a: 'Yes — St. Augustine, Ponte Vedra, and Nocatee sit right on our path up the coast and we deliver to all of them under the same flat-rate terms as Jacksonville proper. If your move splits between two addresses, say a storage unit in St. Augustine and a home at the beaches, both stops go into the written estimate so the day is planned end to end.',
    },
    {
      q: 'I am a military family arranging my own move. Do you work with that?',
      a: 'Regularly. Families around the Jacksonville bases often arrange their own moves, and the things they need are the things we already do: a firm written estimate within 24 hours for their records, a flat rate that will not drift, itemized inventory paperwork, and no deposit tying up money before reimbursement. Tell your coordinator what documentation you need and we build it in.',
    },
    {
      q: 'How long does the move take?',
      a: 'It is a committed full-day operation rather than a multi-day interstate haul — the crew loads in Miami, makes the long run north, and unloads on the schedule set in your estimate. The honest answer for your specific move depends on volume and access at both ends, so your coordinator confirms the loading time and arrival window in writing before move day.',
    },
    {
      q: 'What happens if my closing date moves?',
      a: 'You call, we move the date. With no deposit taken there is nothing to forfeit and nothing to claw back — rescheduling is a calendar change, not a negotiation. Closings slip on this route constantly, since so many of these moves are purchases rather than leases. The one favor we ask is as much notice as you have, so the truck can be rebooked cleanly.',
    },
  ],
},
{
  slug: 'moving-miami-to-atlanta',
  fromCity: 'Miami',
  toCity: 'Atlanta',
  toRegion: 'Georgia',
  metaDescription: 'Moving from Miami to Atlanta: flat-rate bands by home size, one dedicated truck up the I-75 corridor, no deposit, written estimate in 24 hours. 786-305-1844.',
  answer: 'A one-bedroom move from Miami to Atlanta typically costs $2,800–$3,800 and a two-bedroom $3,800–$5,200, quoted as a flat rate for a dedicated truck with no shared loads. Easy Move Florida provides a written estimate within 24 hours of your inventory, and no deposit is required to book.',
  intro: "Atlanta is where a Florida move becomes a true interstate move — the truck crosses the state line and follows the I-75 corridor north, committed to your job for a multi-day run. It is the most common first step out of Miami for people who want a bigger job market without leaving the South: corporate transfers into Midtown and Buckhead towers, tech and finance hires, and families heading straight past the city to Alpharetta, Marietta, and Decatur for the schools and the yard. The economics change at the state line, which the bands reflect, but the structure does not: one dedicated truck carries only your household, the flat rate is agreed in writing before loading, and the same company that packed your Miami apartment sets it down in Georgia.",
  hasBand: true,
  whatAffects: [
    {
      title: 'How much rides in the truck',
      body: 'On an interstate run the linehaul is committed regardless, so your position inside a band comes down to volume and the crew time it demands. A pared-down two-bedroom sits near $3,800; the same apartment with a full storage cage and a disassembled gym pushes toward $5,200. The inventory you give us is the price you get.',
    },
    {
      title: 'Buildings and access on both ends',
      body: 'A Miami condo pickup means COIs and freight elevators, and Midtown or Buckhead towers on delivery ask for the same — insurance certificates, reserved elevators, dock time limits. A suburban Atlanta driveway erases all of that. Two easy ends sit low in the band; two towers sit high. Tell us both addresses and the estimate is built for reality.',
    },
    {
      title: 'Timing on the corridor',
      body: 'Summer is peak on the I-75 run, and Atlanta deliveries are planned around the city’s traffic — a mistimed arrival can cost the crew hours on the connector. End of month compresses everything. Flexible dates, especially mid-week, let your coordinator schedule the linehaul and the delivery window so the crew works your home, not the highway.',
    },
    {
      title: 'Specialty items over distance',
      body: 'Distance amplifies specialty handling: a piano or marble table is wrapped for hours of interstate road, not a ride across town, which means more materials and more careful loading. None of it is exotic for this route — it just has to be declared during the inventory so the written estimate covers the real job and move day holds no debates.',
    },
  ],
  faqs: [
    {
      q: 'How much does it cost to move from Miami to Atlanta?',
      a: 'By home size, flat rate: a studio runs $2,200–$3,000, a one-bedroom $2,800–$3,800, a two-bedroom $3,800–$5,200, and a three-bedroom $5,200–$7,500. Volume, access at both ends, timing, and specialty items decide where you land inside a band. The written estimate arrives within 24 hours of your inventory and is the number you pay.',
    },
    {
      q: 'How long does a Miami to Atlanta move take?',
      a: 'The truck is committed for a multi-day run — load day in Miami, the linehaul up the I-75 corridor, and delivery scheduled around Atlanta traffic rather than into the teeth of it. Because the truck is dedicated and carries only your shipment, the window is set with you in advance and confirmed in the written estimate, not left as a two-week carrier spread.',
    },
    {
      q: 'Do you deliver to Atlanta suburbs like Alpharetta, Marietta, and Decatur?',
      a: 'Yes, and more of our Atlanta deliveries end there than in the city itself — Alpharetta, Roswell, Marietta, Smyrna, Decatur, and the communities around them. Suburban delivery is usually the easy half of the job. If your new neighborhood has an HOA with truck restrictions or a gated entrance, mention it during the inventory and the crew arrives with a plan.',
    },
    {
      q: 'My new building in Midtown requires a certificate of insurance. Can you provide it?',
      a: 'Yes. We issue COIs routinely — Miami towers demand them and Atlanta high-rises increasingly do too. Send your building management’s requirements to your coordinator and the certificate goes out before move day, alongside the freight elevator reservation. The paperwork side of a tower-to-tower move is our job; your job is telling us early enough to have it on file.',
    },
    {
      q: 'Is my furniture combined with other shipments to save cost?',
      a: 'No, and this is the core difference from van-line pricing. Your household rides alone in a dedicated truck — no consolidation, no terminal transfers, no waiting while a carrier fills a trailer with three other families. It costs what it costs because the truck is yours for the run, and in exchange the timeline is yours too, agreed in writing before loading.',
    },
    {
      q: 'Do I need to pay anything up front?',
      a: 'No deposit. You send the inventory, the written estimate arrives within 24 hours, and if the number and dates work, the truck is booked with nothing down. Interstate moves attract deposit-heavy operators because the distance makes customers nervous — we go the other way: the estimate is in writing, the rate is flat, and your money moves when your furniture does.',
    },
  ],
},
{
  slug: 'moving-miami-to-new-york',
  fromCity: 'Miami',
  toCity: 'New York',
  toRegion: 'New York',
  metaDescription: 'Movers from Miami to New York: flat rates by apartment size, dedicated truck, COI for Manhattan buildings, no deposit, written estimate in 24h. 786-305-1844.',
  answer: 'A one-bedroom move from Miami to New York typically costs $3,600–$4,800 and a two-bedroom $4,800–$6,500, quoted as a flat rate for a dedicated truck with no shared loads. Easy Move Florida issues the COI your building requires, sends a written estimate within 24 hours of your inventory, and takes no deposit.',
  intro: "Miami to New York is our busiest out-of-state lane, and it runs hard in both directions: retirees and remote workers coming south for good, snowbirds splitting the year, and young professionals heading north for the job that only exists in New York. It is also the route where the two ends could not be more different. A Miami pickup is dock-and-elevator routine; a New York delivery is COI paperwork, a freight elevator booked to the quarter hour, and a street where a truck can stand for exactly as long as the super allows. That second half is where experience earns its fee. The truck is committed for a multi-day run, the rate is flat and written, and the building formalities on the New York end are handled before the truck ever leaves Florida.",
  hasBand: true,
  whatAffects: [
    {
      title: 'Volume against New York square footage',
      body: 'Most people move less to New York than they had in Miami — apartments shrink and so should inventories. A disciplined one-bedroom load sits near $3,600; a one-bedroom that refuses to part with anything climbs toward $4,800. Decide what makes the cut before the inventory call, because on this linehaul every cubic foot is priced.',
    },
    {
      title: 'The building on the New York end',
      body: 'A doorman building with a dock, a booked freight elevator, and a COI on file is a smooth delivery. A fifth-floor walk-up, a street with no legal place to stand, or an elevator shared with three other move-ins is a long day. Access on the New York end moves a quote inside its band more than anything except volume — describe it precisely.',
    },
    {
      title: 'Season and direction',
      body: 'The lane surges south in fall and north in late spring and summer, and end of month is brutal in a city where every lease starts on the first. If your dates flex even a few days off the month boundary, booking gets easier and delivery windows get better. The bands hold either way; flexibility buys you scheduling, not discounts.',
    },
    {
      title: 'Specialty items and dense packing',
      body: 'Art, mirrored furniture, and pianos are constants on this route, wrapped for days of interstate road. New York adds its own factor: tight stairwells and pre-war doorways can require disassembly Miami never asked of a piece. Flag anything oversized or fragile during the inventory so crating and crew time are in the flat rate from the start.',
    },
  ],
  faqs: [
    {
      q: 'How much does it cost to move from Miami to New York?',
      a: 'Flat rates by home size: a studio runs $2,800–$3,800, a one-bedroom $3,600–$4,800, a two-bedroom $4,800–$6,500, and a three-bedroom $6,500–$9,500. Volume, building access on the New York end, timing, and specialty items set your position inside the band. The written estimate arrives within 24 hours of your inventory and does not drift afterward.',
    },
    {
      q: 'My Manhattan building requires a COI. Do you handle that?',
      a: 'Yes, as a matter of routine — most Manhattan buildings will not let a mover past the lobby without a certificate of insurance naming the building and its management, and many outer-borough buildings now ask too. Send your coordinator the building’s COI requirements and move-in rules, and the certificate is issued and on file with management before the truck leaves Florida.',
    },
    {
      q: 'What if my street cannot fit a truck, or my building is a walk-up?',
      a: 'Both are normal New York conditions and both are plannable — what hurts is finding out on delivery day. A walk-up adds carry time by the flight; a street where the truck cannot stand means positioning further away and a longer carry. Tell us the floor, the elevator situation, and the street reality during the inventory, and the flat rate is built for the actual building.',
    },
    {
      q: 'Do you also move people from New York down to Miami?',
      a: 'Constantly — the southbound lane is as busy as the northbound one, full of retirees, remote workers, and families done with winter. The structure is identical in either direction: dedicated truck, flat rate, written estimate within 24 hours of inventory, no deposit, and the COI and elevator formalities handled on the New York end whether that end is the pickup or the delivery.',
    },
    {
      q: 'Do you deliver to Brooklyn, Queens, New Jersey, and Long Island?',
      a: 'Yes — the whole metro is one destination for us: all five boroughs, the New Jersey towns across the Hudson, Westchester, and Long Island. Outside Manhattan the buildings are often easier but the parking rarely is, so the same rule applies everywhere: give us the address and the access details early, and the crew arrives with the day already planned.',
    },
    {
      q: 'How long will my furniture be on the road?',
      a: 'The truck is committed to your shipment alone for a multi-day run, which is the honest difference from a van line: no terminal, no consolidation, no delivery spread measured in weeks. Your coordinator sets the loading day and the delivery window with you in advance and puts both in the written estimate, so the New York end — elevator booked, COI filed — is ready when the truck arrives.',
    },
  ],
},
{
  slug: 'moving-miami-to-boston',
  fromCity: 'Miami',
  toCity: 'Boston',
  toRegion: 'Massachusetts',
  metaDescription: 'Moving from Miami to Boston: flat-rate bands by home size, dedicated truck, no deposit, written estimate in 24 hours, real winter planning. 786-305-1844.',
  answer: 'A one-bedroom move from Miami to Boston typically costs $3,800–$5,100 and a two-bedroom $5,100–$6,900, quoted as a flat rate for a dedicated truck with no shared loads. Easy Move Florida sends a written estimate within 24 hours of your inventory, and no deposit is required to book.',
  intro: "Boston is the longest of our Northeast runs, and it is the one where the calendar matters most. The route is driven by the city's academic and medical machine — residencies, fellowships, graduate programs, hospital and biotech jobs — which means demand piles onto a few specific weeks, above all the September 1 lease turnover that resets half the city's rental market at once. Then there is winter, which a Miami mover must respect rather than improvise around: protected pathways, building access, and dates flexible enough to work around weather. We plan all of it up front. The truck is dedicated to your household for the multi-day run, the flat rate is fixed in writing, and the Boston-end details — old buildings, narrow streets, tight stairs — are gathered before loading, not discovered after.",
  hasBand: true,
  whatAffects: [
    {
      title: 'Volume over the longest Northeast haul',
      body: 'This is our longest regular Northeast linehaul, so volume separates the band edges sharply: a trimmed one-bedroom books near $3,800 while a dense one pushes $5,100. Boston apartments, like New York ones, tend to be smaller than what people leave in Miami — cull first, inventory second, and the flat rate rewards the discipline.',
    },
    {
      title: 'Boston buildings and streets',
      body: 'Brownstone walk-ups, staircases that bend twice between floors, and streets where curb space must be arranged in advance are standard Boston conditions. Each flight of stairs and each awkward approach adds crew time inside the band. Your coordinator plans curb space and building access with you before move day so the crew works, not waits.',
    },
    {
      title: 'The September 1 effect and winter',
      body: 'Around September 1, when much of the rental market turns over in one weekend, this route books out well ahead — reserve early or aim wide of it. Winter runs the opposite way: dates are open, but weather planning is real, and a flexible day or two around your target protects the delivery. Both seasons carry the same flat-rate bands.',
    },
    {
      title: 'Fragile and specialty pieces',
      body: 'Long linehaul plus old-building delivery is the demanding combination: a piano or marble piece is wrapped for days of road and then may need to turn a nineteenth-century stairwell. It is all doable and all quotable — declared at inventory, it lands in the written estimate; discovered on the truck ramp, it ruins schedules. Declare it.',
    },
  ],
  faqs: [
    {
      q: 'How much does it cost to move from Miami to Boston?',
      a: 'Flat rates by home size: a studio runs $3,000–$4,000, a one-bedroom $3,800–$5,100, a two-bedroom $5,100–$6,900, and a three-bedroom $6,900–$10,000. Volume, access at both ends, season, and specialty items place you inside the band. You get a written estimate within 24 hours of your inventory, and the flat rate holds unless the inventory changes.',
    },
    {
      q: 'Can you move me to Boston in winter?',
      a: 'Yes — we run the route year-round, and winter moves are often the easiest to book. What changes is planning: floor protection and covered pathways at delivery, confirmation that your building’s access will be clear, and a day or two of flexibility in case weather closes the window. Your coordinator builds that slack in up front, and with no deposit taken, a weather reschedule costs nothing.',
    },
    {
      q: 'I need to arrive for a September 1 lease. When should I book?',
      a: 'As early as you can. September 1 is the single busiest date on the Boston calendar — a huge share of the city’s leases turn over at once, buildings stack move-ins back to back, and elevator and curb access become the scarce resources. Book weeks ahead, get your building’s move-in rules to your coordinator early, and consider loading in Miami with a margin rather than cutting the date exactly.',
    },
    {
      q: 'My apartment is a third-floor walk-up in a brownstone. Is that a problem?',
      a: 'It is a normal Boston delivery, and it is priced rather than penalized. Stairs add carry time, older stairwells sometimes force disassembly of larger pieces, and curb space for the truck may need arranging on narrow streets — all of which goes into the flat rate when you tell us during the inventory. The crew arrives knowing the building, and the quote you accepted is the quote you pay.',
    },
    {
      q: 'Is the truck shared with other households?',
      a: 'No. Your move rides alone in a dedicated truck for the entire multi-day run — no consolidation terminal, no transfer to a larger trailer, no delivery window that stretches for weeks while a carrier fills capacity. The crew that inventories and loads your Miami home is responsible for it until it is set down in Boston, and the schedule is agreed in writing before loading.',
    },
    {
      q: 'Do you deliver to Cambridge, Somerville, and the suburbs?',
      a: 'Yes — Cambridge, Somerville, Brookline, Newton, Quincy, and the wider metro are all standard deliveries for this route. Cambridge and Somerville share Boston’s tight-street, walk-up character, so the same access questions apply; the outer suburbs are usually straightforward driveways. Wherever the address is, it goes into the written estimate door to door, with no re-pricing at the curb.',
    },
  ],
},
{
  slug: 'moving-miami-to-washington-dc',
  fromCity: 'Miami',
  toCity: 'Washington DC',
  toRegion: 'the DC metro area',
  metaDescription: 'Miami to Washington DC movers: flat-rate bands by home size, dedicated truck, DC, Virginia and Maryland delivery, no deposit, written estimate. 786-305-1844.',
  answer: 'A one-bedroom move from Miami to Washington DC typically costs $3,100–$4,200 and a two-bedroom $4,200–$5,700, quoted as a flat rate for a dedicated truck with no shared loads. Easy Move Florida sends a written estimate within 24 hours of your inventory, and there is no deposit to book.',
  intro: "The Miami to Washington run is the I-95 corridor at its most purposeful. Almost nobody moves to DC on a whim — it is a new administration job, a military or contractor posting, a nonprofit or law firm offer, a graduate program — and the move usually comes with a start date that does not negotiate. The destination is really three places: the District itself with its rowhouses and condo buildings, the Northern Virginia towers of Arlington and Alexandria, and the Maryland suburbs from Silver Spring to Bethesda. Each has its own building rules and its own traffic logic, and the delivery plan differs accordingly. The constants are ours: a dedicated truck committed to your household for the multi-day run, a flat rate in writing, an estimate within 24 hours, and no deposit.",
  hasBand: true,
  whatAffects: [
    {
      title: 'Inventory volume',
      body: 'The linehaul north is committed once you book, so volume is what positions you inside a band: a spare one-bedroom lands near $3,100, a dense one near $4,200. DC-bound moves often start from a fixed job date, which tempts people to skip the purge — resist that. Every box culled in Miami is money and unpacking time saved.',
    },
    {
      title: 'Which part of the DMV you land in',
      body: 'A rowhouse on a narrow District street, an Arlington high-rise with a dock and a COI requirement, and a Bethesda driveway are three different deliveries. Condo buildings across the area commonly want insurance certificates and reserved elevators; rowhouse blocks want curb planning. The address and its access details shape the quote inside the band.',
    },
    {
      title: 'Timing around start dates',
      body: 'This route clusters around job and program start dates — early January, late spring, and late summer run hottest, and end of month is tight all year. If your start date is fixed, book as soon as you have it; if you have any flexibility, mid-month loading buys easier scheduling on both ends. The bands stay the same either way.',
    },
    {
      title: 'Specialty items',
      body: 'Home offices dominate this route’s specialty list — multiple monitors, server gear, filing cabinets that lock — alongside the usual pianos and art. Anything requiring crating, extra hands, or chain-of-custody care is priced into the flat rate at inventory time. Say what you have early and the estimate covers the real job, not an idealized one.',
    },
  ],
  faqs: [
    {
      q: 'How much does it cost to move from Miami to Washington DC?',
      a: 'Flat rates by home size: a studio runs $2,500–$3,400, a one-bedroom $3,100–$4,200, a two-bedroom $4,200–$5,700, and a three-bedroom $5,700–$8,300. Where you fall inside a band comes down to volume, access at both addresses, timing, and specialty items. The written estimate arrives within 24 hours of your inventory and is the price you pay.',
    },
    {
      q: 'Do you deliver to Northern Virginia and the Maryland suburbs?',
      a: 'Yes — the whole DC metro is one destination: Arlington, Alexandria, Fairfax, and Tysons on the Virginia side; Silver Spring, Bethesda, Rockville, and College Park in Maryland; and the District itself. The flat rate is door to door wherever in the area you land. What matters is telling us which door, because the access rules differ sharply across the three jurisdictions.',
    },
    {
      q: 'My DC condo building has strict move-in rules. How do you handle them?',
      a: 'The same way we handle Miami towers, which run the same playbook: your coordinator collects the building’s requirements — certificate of insurance, freight elevator reservation, permitted move-in hours, loading dock limits — and has the paperwork filed and the elevator booked before the truck leaves Florida. Buildings enforce these rules without mercy, so send the requirements as early as your management office provides them.',
    },
    {
      q: 'I have a fixed federal start date. Can you guarantee my things arrive before it?',
      a: 'What we commit to is a plan built backward from your date: loading in Miami early enough that the multi-day run and the delivery window land ahead of it, confirmed in your written estimate. Because the truck is dedicated and carries no other shipments, the schedule is ours to keep rather than a van line’s two-week spread. Give your coordinator the hard date first and the plan is built around it.',
    },
    {
      q: 'Is anything shared with other customers’ shipments?',
      a: 'No. One truck, one household, one run up the corridor — no consolidation terminal in between, no transfer to another carrier, no waiting for a trailer to fill. That is the structural reason we can put a delivery window in writing, and it is why the crew that watched your things leave Miami is the crew that carries them into your new place.',
    },
    {
      q: 'What does booking require up front?',
      a: 'A completed inventory and a date — no deposit, no card on file to hold the truck. The written estimate arrives within 24 hours of the inventory; if the flat rate and schedule work, you confirm and the truck is committed. If a security clearance, housing assignment, or closing shifts your dates, rescheduling costs nothing, which matters on a route where start dates move more often than people expect.',
    },
  ],
},
{
  slug: 'moving-hollywood-to-charlotte',
  fromCity: 'Hollywood',
  toCity: 'Charlotte',
  toRegion: 'North Carolina',
  metaDescription: 'Moving from Hollywood FL to Charlotte NC: flat-rate bands by home size, dedicated truck from our home base, no deposit, written estimate in 24h. 786-305-1844.',
  answer: 'A one-bedroom move from Hollywood to Charlotte typically costs $2,500–$3,400 and a two-bedroom $3,400–$4,600, quoted as a flat rate for a dedicated truck with no shared loads. Easy Move Florida sends a written estimate within 24 hours of your inventory, and no deposit is required to book.',
  intro: "This route starts at our front door. Easy Move Florida is based in Hollywood, so a Charlotte move begins with a truck that did not have to position from anywhere — your crew loads in its own neighborhood before making the run north through Georgia and up into the Carolinas. The people on this route are mostly families doing arithmetic: Charlotte offers banking, tech, and healthcare careers, houses that cost a fraction of Broward prices, and four actual seasons, and every year more South Floridians decide that trade wins. The move itself is a clean interstate run — the truck is committed for a multi-day trip, your household rides alone, and the flat rate is fixed in a written estimate before loading. Pickups run across all of Broward and Miami-Dade, not just Hollywood itself.",
  hasBand: true,
  whatAffects: [
    {
      title: 'What the house actually holds',
      body: 'Charlotte moves are family moves more often than not, and family homes hide volume — garages, attics, patio sets, kids’ rooms that doubled. The gap between $3,400 and $4,600 for a two-bedroom is mostly this. Walk every space when you build the inventory, including the garage, and the flat rate will match reality on move day.',
    },
    {
      title: 'Access on both ends',
      body: 'South Florida pickups range from an easy Hollywood driveway to a Miami-Dade tower with COI and elevator formalities. On the Charlotte end, most deliveries are suburban and simple, but an Uptown or South End apartment building brings dock windows and elevator bookings of its own. Each hard end adds crew time inside the band; two easy ends sit low.',
    },
    {
      title: 'Season and school calendars',
      body: 'Because this lane is family-heavy, it peaks in early and mid summer as households move between school years, and end of month tightens the calendar all year round. Winter is the quiet season and books on short notice. The bands do not move with the season — but the choice of loading dates and arrival windows is far wider off-peak.',
    },
    {
      title: 'Specialty items and storage stops',
      body: 'Pianos, safes, workshop tools, and backyard equipment are the usual suspects on this route, and many jobs add a stop at a Broward storage unit on the way out. Stops and specialty handling are welcome and often efficient — priced into the written estimate up front, they cost a known amount instead of an argument at the curb.',
    },
  ],
  faqs: [
    {
      q: 'How much does it cost to move from South Florida to Charlotte?',
      a: 'Flat rates by home size: a studio runs $2,000–$2,700, a one-bedroom $2,500–$3,400, a two-bedroom $3,400–$4,600, and a three-bedroom $4,600–$6,700. Volume, access at both addresses, timing, and specialty items decide your position inside the band. The written estimate arrives within 24 hours of your inventory, and there is no deposit to book.',
    },
    {
      q: 'Do you only pick up in Hollywood?',
      a: 'No — Hollywood is home base, not a boundary. We load throughout Broward and Miami-Dade: Fort Lauderdale, Pembroke Pines, Miramar, Aventura, Miami, and everywhere between. Being based in Hollywood simply means the truck starts the day local instead of positioning from out of the area, which makes scheduling on this route unusually reliable. The flat-rate terms are identical wherever in South Florida the pickup is.',
    },
    {
      q: 'Do you deliver to Charlotte suburbs and nearby towns?',
      a: 'Yes — the whole Charlotte area is standard delivery territory: Huntersville, Concord, Matthews, Mint Hill, Gastonia, and across the state line into the South Carolina suburbs like Fort Mill and Rock Hill. Most of these are straightforward driveway deliveries. If you are landing in an Uptown or South End apartment building instead, tell us early so the elevator and dock arrangements are made before arrival.',
    },
    {
      q: 'How long is my furniture on the road?',
      a: 'The truck is committed to your household for a multi-day run — it loads in South Florida, makes the interstate trip north, and delivers on the window agreed in your written estimate. Because there is no shared load and no terminal transfer, that window is a commitment we control, not a spread that depends on when a carrier fills the rest of a trailer.',
    },
    {
      q: 'Can you pack the house before the move?',
      a: 'Yes. Packing crews start from $79 per hour plus materials, and on a Charlotte move packing usually happens the day before loading so a family home is boxed, labeled by room, and ready when the truck backs in. You can also pack yourselves and leave only furniture wrapping to us. Decide when we build the estimate so the flat rate includes exactly the level of service you want.',
    },
    {
      q: 'What if our closing in Charlotte gets delayed?',
      a: 'It happens on this route constantly, since so many Charlotte moves are purchases. You call, the date moves, and nothing is forfeited — no deposit was taken, so a reschedule is a calendar change rather than a financial event. If the gap is longer, your coordinator will talk through options with you before loading day so the plan fits the new dates rather than forcing them.',
    },
  ],
},
{
  slug: 'moving-florida-to-california',
  fromCity: 'Florida',
  toCity: 'California',
  toRegion: 'California',
  metaDescription: 'Moving from Florida to California: dedicated truck, flat rate from $1,500, no deposit, written estimate for your exact move within 24 hours. 786-305-1844.',
  answer: 'Easy Move Florida runs Florida to California moves from $1,500 flat, with every job priced individually — a route this long has too many variables for a one-size price band. You get a dedicated truck with no shared loads, a flat rate agreed up front, a written estimate within 24 hours of your inventory, and no deposit to book.',
  intro: "California is the biggest decision on this page. Not a corridor hop but a cross-country commitment — a multi-day linehaul where the truck and crew belong to your household for the whole run — and it deserves a price built for your exact move rather than a band wide enough to be meaningless. That is why this route works differently: you send the inventory, and within 24 hours you have a written flat rate for your actual home, addresses, and dates, starting from $1,500. We serve the route from our Florida base in Hollywood, loading anywhere in South Florida and delivering across California — the tech moves to the Bay Area, the entertainment and media moves to Los Angeles, the families choosing San Diego. One truck, no shared loads, no deposit, and a number in writing before anything moves.",
  hasBand: false,
  whatAffects: [
    {
      title: 'Volume, priced across the country',
      body: 'On a cross-country linehaul, volume is the dominant cost — every cubic foot rides for days, so the difference between a trimmed apartment and a full house is larger here than on any other route. The single most effective thing you can do is sell or donate ruthlessly before the inventory, then list what remains precisely.',
    },
    {
      title: 'Access at two distant ends',
      body: 'A Florida pickup we know cold; the California end we plan carefully in advance — a San Francisco hill with permit-only parking, a Los Angeles building with a strict dock window, a San Diego driveway. Because the truck cannot simply come back tomorrow, delivery access is confirmed before the run starts, and it shapes the flat rate.',
    },
    {
      title: 'Timing and route season',
      body: 'Summer is peak demand for cross-country moves, and winter routing is planned around weather on the southern corridors. Because the truck is committed for a multi-day run in each direction, dates book further ahead than on our Florida and East Coast lanes — the earlier you confirm, the more control you have over loading and delivery windows.',
    },
    {
      title: 'Specialty items over the longest haul',
      body: 'Anything fragile is wrapped for the longest ride we offer: pianos, art, stone, instruments, and the home-studio gear common on this route all get crating-level protection and are priced into the written estimate. Days of road amplify small packing decisions, so the inventory conversation for California is the most detailed one we do.',
    },
  ],
  faqs: [
    {
      q: 'Why is there no published price band for Florida to California?',
      a: 'Because a band honest enough to cover this route would be too wide to help you. A cross-country flat rate depends on your exact volume, both addresses, the season, and any specialty items — variables that swing a price far more over this distance than over a Florida route. So instead of a vague range, you get a precise one: a written flat-rate estimate for your specific move, within 24 hours of your inventory, from $1,500.',
    },
    {
      q: 'How does the estimate process work?',
      a: 'You walk your home with your coordinator — by video call or a detailed photo inventory — covering every room, closet, garage, and storage space, plus both addresses and their access. Within 24 hours you receive a written flat rate for the whole job. It is not a teaser that grows later: the number is built from your real inventory and holds unless the inventory itself changes before loading.',
    },
    {
      q: 'Is it really one truck the whole way across the country?',
      a: 'Yes. Your household loads into a dedicated truck in Florida and rides in it until delivery in California — no shared loads, no consolidation warehouse, no handoff to a partner carrier mid-country. That is the structural difference from van-line moves, where goods can wait at terminals until a trailer fills. It is also why the delivery window is something we can agree in writing rather than estimate in weeks.',
    },
    {
      q: 'Which parts of California do you deliver to?',
      a: 'The major destinations on this route are Los Angeles, San Diego, Orange County, the San Francisco Bay Area, and Sacramento, and we deliver throughout the state. We serve the route from our Florida base in Hollywood, so the planning conversation covers the California end in extra detail — building rules, parking, and access are confirmed before the truck leaves, because a cross-country crew arrives ready or not at all.',
    },
    {
      q: 'How far in advance should I book a cross-country move?',
      a: 'Earlier than any other route we run. The truck and crew are committed for a multi-day run in each direction, so a California booking occupies the calendar in a way a Florida move does not. As soon as your dates firm up — a job start, a lease, a closing — send the inventory and lock the schedule. With no deposit required, booking early costs nothing and rescheduling later is a phone call.',
    },
    {
      q: 'Do you take a deposit for a move this large?',
      a: 'No. The terms that apply to a Miami to Orlando move apply to a cross-country one: no deposit, a flat rate in writing before loading, and your money moving when your furniture does. On long-distance moves especially, large upfront deposits are where customers get burned by brokers who resell the job. We are the company that shows up — the same one that priced it.',
    },
  ],
},
];

export const getRoutePage = (slug: string): RoutePageData | undefined =>
  ROUTE_PAGES.find((p) => p.slug === slug);
