/**
 * "How much do movers cost in {city}?" page content.
 *
 * The rates, the totals table and the arithmetic live in the pricing module and
 * in CostPage — never here. This file carries only what genuinely differs per
 * city: the direct answer an assistant lifts, and the access realities that
 * move the hour count in that city's buildings.
 *
 * Fact rules, same as everywhere in this repo: named buildings are areas
 * served, never a client list; no COI dollar limit is tied to a named property;
 * no invented populations, move counts or licence numbers.
 */
export interface CostPageData {
  /** Route slug, e.g. 'moving-cost-fort-lauderdale'. */
  slug: string;
  cityName: string;
  /** City name in the page's own language, when it differs from cityName. */
  cityNameRu?: string;
  cityNameUa?: string;
  /** The city landing page this one links to, e.g. 'fort-lauderdale-movers'. */
  citySlug: string;
  metaDescription: string;
  /** The direct-answer paragraph. Opens with the rate sentence AI assistants quote. */
  answer: string;
  intro: string;
  /** What moves the hour count here — these are hours, never fees. */
  accessFactors: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const COST_PAGES: CostPageData[] = [
{
  slug: 'moving-cost-fort-lauderdale',
  cityName: 'Fort Lauderdale',
  citySlug: 'fort-lauderdale-movers',
  metaDescription: 'Fort Lauderdale movers cost $129–$219/hr with a 3-hour minimum and no hidden fees. Real local rates, no deposit. Call or WhatsApp 786-305-1844 for a quote.',
  answer: 'Fort Lauderdale movers charge $129/hour for 2 movers or $179/hour for 3, with a 3-hour minimum, plus a truck fee per day that matches the crew rate. Expect the hours, not the rate, to vary: canal-side streets that only take a smaller truck, Las Olas towers with fixed dock windows, and drawbridges on the route all add loading time. A typical two-bedroom in Fort Lauderdale finishes between $645 and $1,253 all-in, and there are no weekend, fuel, or stairs surcharges on top.',
  intro: 'Fort Lauderdale pricing is simple to state and easy to predict once you know how your address loads. Two movers cost $129 per hour, three cost $179, four cost $219, and the truck is billed per day at the same figure as the crew rate: $129 with two movers, $179 with three, $219 with four. Every job carries a three-hour minimum, after which time is billed in 15-minute increments. There is no deposit, cancellation is free more than 48 hours before the move, and a certificate of insurance for your building is free within 24 hours of booking. The variable is hours, and in Fort Lauderdale hours are set by water: canals decide truck size, bridges decide timing, and tower docks decide when you can start.',
  accessFactors: [
    {
      title: 'Canal streets and truck size',
      body: 'Many finger-island streets off Las Olas and in Rio Vista are narrow, with cul-de-sac turnarounds a 26-foot truck cannot manage. When only a 16-footer fits, a larger home takes two trips or a shuttle from a staging spot, and each extra trip is real loading time on the clock.',
    },
    {
      title: 'Las Olas and downtown dock windows',
      body: 'High-rises along Las Olas Boulevard and in the downtown core typically assign a dock and a freight elevator window, often two to four hours. If the window is tight, we bring a bigger crew so the load fits inside it: a third mover at $179 per hour usually costs less than a second elevator reservation.',
    },
    {
      title: 'Drawbridge timing',
      body: 'The Las Olas and Third Avenue drawbridges open on schedule for boat traffic, and a loaded truck caught at an opening sits on billed time. We plan routes and start times around the bridge schedules, which is one of the quiet ways a local crew keeps a Fort Lauderdale bill down.',
    },
    {
      title: 'Beach-side condos on A1A',
      body: 'Garages under the older beachfront buildings along A1A often have clearance too low for any box truck, which means parking at the curb and carrying through the lobby. That long carry costs nothing extra per item; it simply adds minutes per trip, so we quote more hours up front.',
    },
    {
      title: 'Single-family neighborhoods load fast',
      body: 'A house in Victoria Park, Coral Ridge, or Tarpon River with driveway access is the cheapest kind of Fort Lauderdale move: the truck parks at the door, no elevator, no dock paperwork. Most two-bedroom houses with straight access finish inside four to five hours with a two-mover crew.',
    },
  ],
  faqs: [
    {
      q: 'Does a Las Olas high-rise move cost more than a house move?',
      a: 'Usually yes, but through hours rather than fees. A tower move adds dock scheduling, a freight elevator ride for every load, and longer distances from apartment to truck, so the same furniture takes more time than it would from a driveway. We offset that with crew size and by having the certificate of insurance and the elevator window arranged before moving day.',
    },
    {
      q: 'Can a full-size moving truck reach a canal street in the Las Olas Isles?',
      a: 'Often not. We check the street on the video call before assigning a truck, and if the turnaround will not take a 26-footer we send a smaller one and plan the extra trip into the estimate. Finding this out on moving day instead is how bills grow past their quotes, so the check happens before we ever quote hours.',
    },
    {
      q: 'How do drawbridges affect what I pay?',
      a: 'A bridge opening costs ten to fifteen minutes of billed time if the truck is caught at it, so we schedule around openings rather than through them. On a cross-town move between the beach and the mainland we pick the route by bridge schedule and time of day. It is a small item, but small items are what an hourly bill is made of.',
    },
    {
      q: 'What is the cheapest possible move in Fort Lauderdale?',
      a: 'The floor is $516: two movers for the three-hour minimum plus the $129 truck day that goes with a two-mover crew. A studio or small one-bedroom with easy access on both ends can genuinely land there. Licensed movers in this market generally run $100–$180 per hour for a two-mover crew, so the floor here sits at the lower-middle of the market.',
    },
    {
      q: 'Do you charge hourly or flat rate?',
      a: 'Local Fort Lauderdale moves are hourly, because access decides the work and hours are the honest way to price it. Either way you see the arithmetic before you commit, and billing after the minimum runs in 15-minute increments.',
    },
    {
      q: 'What is included in the hourly rate?',
      a: 'The crew, blankets, wrap, tape, dollies, tools, furniture disassembly and reassembly, and all the loading work. The truck is the one separate line, billed per day at the crew rate. There are no charges for stairs, long carries, heavy items, weekends, or fuel; when access is hard we quote more hours, not more fees. Packing service is separate, from $79 per hour for two packers.',
    },
  ],
},
{
  slug: 'moving-cost-hollywood',
  cityName: 'Hollywood',
  citySlug: 'hollywood-movers',
  metaDescription: 'Hollywood FL movers cost $129–$219/hr with a 3-hour minimum. Our yard is in Hollywood, so you pay the least travel time. Call or WhatsApp 786-305-1844 now.',
  answer: 'Hollywood movers charge $129/hour for 2 movers or $179/hour for 3, with a 3-hour minimum, plus a truck fee per day that matches the crew rate. Hollywood is our home base, with the yard on Stirling Road, so crews arrive with the least travel time we bill anywhere in South Florida. Beach towers along A1A run longer than the mainland because of elevators and parking, while single-family streets from Hollywood Hills to the Lakes load about as fast as a move can go.',
  intro: 'If you are pricing a move in Hollywood, you are pricing us at our shortest reach. The rate card is the same one we run everywhere: $129 per hour for two movers, $179 for three, $219 for four, a three-hour minimum, and a truck day billed at the matching crew figure. What changes in Hollywood is the travel. The truck starts from Stirling Road, so the drive to almost any Hollywood address is minutes, and drive time is part of what an hourly mover bills. The other variable is which Hollywood you live in: a beachfront tower move and a Hollywood Hills house move carry identical rates and can still differ by hours, because the path from your door to the truck is nothing alike.',
  accessFactors: [
    {
      title: 'The shortest drive we sell',
      body: 'Hourly moving bills include the time the crew spends reaching you, and no city beats Hollywood on that line because the trucks are parked here. From the Stirling Road yard, most Hollywood addresses are inside a short local drive, which trims the billed clock at both ends of the day.',
    },
    {
      title: 'Beach towers east of the Intracoastal',
      body: 'The condo towers along South Ocean Drive and A1A typically require a freight elevator reservation and use a shared dock, and everything you own rides that elevator. As a rule we plan an hour or two more than a comparable mainland move and bring a third mover when the window is short.',
    },
    {
      title: 'Hollywood Beach parking',
      body: 'Near the Broadwalk, legal space for a 26-foot truck is scarce, and some buildings offer no dock at all. When the closest legal spot is half a block away, every dolly run gets longer. We scout the parking situation before quoting hours, so the estimate already contains the walk.',
    },
    {
      title: 'Mainland single-family speed',
      body: 'Hollywood Hills, Emerald Hills, and the Lakes are the fast end of our whole service map: driveway at the door, ground-level rooms, no association paperwork. A two-bedroom house with that kind of access is regularly done within a morning, which is why mainland Hollywood moves cluster near the bottom of each price band.',
    },
    {
      title: 'Older low-rise condos',
      body: 'The mid-century two- and three-story buildings scattered between Federal Highway and the beach often have one small passenger elevator or none. Stairs cost nothing as a fee, but a walk-up third floor adds minutes to every carry, so we quote it as time and usually recommend three movers over two.',
    },
  ],
  faqs: [
    {
      q: 'Is Hollywood cheaper to move in because you are based here?',
      a: 'On average, yes. Rates are identical across our map, but the billed clock starts with less travel because the yard is on Stirling Road. A Hollywood move also gives us the most scheduling flexibility for exact arrival windows and short-notice dates, since a crew finishing early nearby can start yours sooner. It is the one advantage of geography we can honestly pass to you.',
    },
    {
      q: 'Do Hollywood Beach towers cost more than mainland houses?',
      a: 'Typically by an hour or two, sometimes more. The furniture is the same; the path is not. A tower adds dock access, a freight elevator round trip per load, and tighter parking, while a mainland driveway lets the crew walk straight from door to truck. Both are priced at the same hourly rates; the tower simply consumes more of them.',
    },
    {
      q: 'Where does the truck park for a move near the Broadwalk?',
      a: 'That depends on the building, and we settle it before moving day rather than during it. Some towers have a dock, some have a marked loading bay, and some leave us the street. Where street parking is the answer, we time the move for the quietest hours we can get and build the longer carry into the estimated hours.',
    },
    {
      q: 'What is the cheapest way to move within Hollywood?',
      a: 'Two movers at the three-hour minimum with the matching $129 truck day comes to $516, and small Hollywood moves hit that number more often than anywhere else we work because travel time barely registers. To stay near the floor, be packed before the crew arrives and reserve the elevator early if your building uses one. Every ready box is minutes off the clock.',
    },
    {
      q: 'What does the hourly rate cover?',
      a: 'Everything except the truck line: the crew, wrapping materials, blankets, dollies, disassembly and reassembly, loading and unloading. The truck bills per day at the same figure as your crew rate, $129 alongside two movers or $179 alongside three. There are no weekend, fuel, stair, or heavy-item charges, and after the three-hour minimum billing moves in 15-minute steps.',
    },
    {
      q: 'How do I get an exact number instead of a range?',
      a: 'Send us a video walkthrough of the home on WhatsApp at 786-305-1844 or book a short call. Evgenii Romanov, the owner, prices Hollywood jobs personally, and because the crews work these streets daily the hour estimates run tight. You get a written figure with the crew size, hours, and truck day itemized, and no deposit is taken to hold the date.',
    },
  ],
},
{
  slug: 'moving-cost-aventura',
  cityName: 'Aventura',
  citySlug: 'aventura-movers',
  metaDescription: 'Aventura movers cost $129–$219/hr with a 3-hour minimum. Gate lists, COI, and elevator windows handled for you. No deposit. Call or WhatsApp 786-305-1844.',
  answer: 'Aventura movers charge $129/hour for 2 movers or $179/hour for 3, with a 3-hour minimum, plus a truck fee per day that matches the crew rate. Aventura is condo country, and the clock here is governed by gate houses and freight elevators more than by distance. Guard-gated communities of the Williams Island and Porto Vita type will not let a truck through until the visitor list and insurance paperwork are right, so we complete both days ahead. Land a weekday morning elevator window and the hours stay close to the minimum.',
  intro: 'Aventura moves run on the same card as every city we serve, $129, $179, or $219 per hour for two, three, or four movers with a three-hour minimum and a truck day priced at the crew figure, but almost nothing in Aventura is a simple driveway job. The city is towers, gated island communities, and condo associations, each with its own admission ritual: certificate of insurance on file, gate list entry, dock reservation, elevator pads. None of that carries a fee from us. What it carries is schedule risk, and schedule risk becomes billed hours when it is handled late. Our answer is to finish every building requirement before the truck leaves the yard, so the paid clock is spent moving furniture.',
  accessFactors: [
    {
      title: 'Gate-house clearance',
      body: 'In guard-gated communities of the Williams Island and Porto Vita kind, an unregistered truck waits at the gate while calls are made, and that wait is billed time. We get the crew names and the truck onto the visitor list in advance, so the gate becomes a pause of seconds instead of half an hour.',
    },
    {
      title: 'Freight elevator windows',
      body: 'Most Aventura towers assign moves a reserved freight elevator block, commonly two to four hours, and as a rule they release those blocks on weekday schedules. A short window with a big apartment argues for four movers: at $219 per hour, a larger crew inside one window beats a smaller crew needing a second reservation.',
    },
    {
      title: 'Mall-area traffic timing',
      body: 'The streets around Aventura Mall congest hard from mid-afternoon and on weekends, and Biscayne Boulevard queues with them. A loaded truck in that traffic is on the clock, so we route Aventura jobs to start early and cross the mall zone before it thickens. Morning starts here are not a preference; they are arithmetic.',
    },
    {
      title: 'COI before the truck rolls',
      body: 'Aventura building managements almost universally require a certificate of insurance naming the association before a crew may work. Ours is free and issued within 24 hours of booking, and coverage limits requested in this market typically sit in the $1M–$2M range; we confirm the exact requirement with your building and match it before moving day.',
    },
    {
      title: 'Two towers, one day',
      body: 'A move from one Aventura tower to another needs two of everything: two elevator reservations, two dock slots, two gate clearances, and windows that line up on the same day. When the windows cannot align, we sequence loading and unloading around them; misaligned reservations, not distance, are what stretch these short moves.',
    },
  ],
  faqs: [
    {
      q: 'Can you move me into a guard-gated community like Williams Island?',
      a: 'Yes. Those communities are part of our regular Aventura service area, and the requirements are procedural rather than difficult: advance registration of the crew and truck, a certificate of insurance on file with the association, and adherence to the posted moving hours. We collect the requirements from your management office at booking and arrive already cleared through the gate.',
    },
    {
      q: 'What insurance paperwork do Aventura buildings require?',
      a: 'Nearly every tower here wants a certificate naming the condo association as certificate holder before the freight elevator is released. We issue it free within 24 hours of booking; send us your management contact and we handle the exchange directly. If your building has unusual wording or limit requirements, we confirm them with the office rather than guessing.',
    },
    {
      q: 'When should I book the freight elevator in my Aventura tower?',
      a: 'As soon as your date is real. Popular weekday morning blocks in the larger towers go first, and the elevator window is the single biggest constraint on an Aventura move. Once you hold a window, tell us its exact hours and we size the crew to finish inside it. A well-chosen window is worth more than any discount.',
    },
    {
      q: 'What is the least an Aventura move can cost?',
      a: 'The minimum invoice is $516: the two-mover minimum of three hours plus the $129 truck day that accompanies a two-mover crew. A one-bedroom moving between towers with generous elevator windows can stay near that figure if boxes are packed and sealed before arrival. Licensed movers in this market generally run $100–$180 per hour for a two-mover crew, for comparison.',
    },
    {
      q: 'Do you charge extra for weekend moves in Aventura?',
      a: 'No. The rate card has no weekend, evening, or seasonal surcharge. The practical catch is your building: many Aventura associations restrict moves to weekday business hours as a rule, so Saturday may not be available regardless of our pricing. Check the association calendar first; if weekends are permitted, our price is identical to a Tuesday.',
    },
    {
      q: 'How do I get an accurate quote for an Aventura condo move?',
      a: 'A five-minute video walkthrough over WhatsApp at 786-305-1844 shows us the furniture, and the building name tells us the access story, because dock and elevator logistics repeat from tower to tower. With both, the owner sends a written hour estimate with crew size and truck day itemized. No deposit, and cancellation stays free until 48 hours out.',
    },
  ],
},
{
  slug: 'moving-cost-sunny-isles',
  cityName: 'Sunny Isles Beach',
  citySlug: 'sunny-isles-movers',
  metaDescription: 'Sunny Isles Beach movers cost $129–$219/hr, 3-hour minimum, no season surcharge. Collins Ave tower moves handled daily. Call or WhatsApp 786-305-1844 now.',
  answer: 'Sunny Isles Beach movers charge $129/hour for 2 movers or $179/hour for 3, with a 3-hour minimum, plus a truck fee per day that matches the crew rate. Sunny Isles is a single line of high-rises on Collins Avenue, so nearly every move here is a dock-and-freight-elevator job. Towers with one freight car book out fast in winter, when seasonal turnover peaks, and the elevator window you secure matters more to the final bill than the mileage ever will.',
  intro: 'Sunny Isles Beach pricing starts from the same numbers as the rest of our map: $129 per hour for two movers, $179 for three, $219 for four, a three-hour minimum, and the truck billed per day at whichever crew figure applies. The city itself is what makes the estimate interesting. Almost everyone here lives in a tower off Collins Avenue, which means a loading dock, a freight elevator, and a management office with rules, and in many buildings that elevator is a single car shared by hundreds of units. Getting the window right, arriving inside it, and moving fast while it lasts is the whole craft of a Sunny Isles move, and it is what our estimates are built around.',
  accessFactors: [
    {
      title: 'Collins Avenue loading docks',
      body: 'Dock design varies tower by tower along Collins: some take a 26-foot truck under cover, others cap clearance so low that we stage from street level. We confirm dock dimensions with your management before assigning a truck, because a vehicle that cannot enter the dock turns every load into a longer carry.',
    },
    {
      title: 'The single freight elevator',
      body: 'Plenty of Sunny Isles towers run one freight car for the whole building, as a rule reservable in fixed blocks. Everything, from the sofa to the last box, rides that one car, so its cycle time sets the pace of the day. We match crew size to the window so the car never waits for hands.',
    },
    {
      title: 'Snowbird season timing',
      body: 'From late fall through spring, seasonal residents arrive and depart in waves, and elevator calendars in the busiest towers fill weeks ahead. Our rates do not change with the season, but the good windows disappear; booking early in winter is the difference between a calm morning slot and a compressed late-afternoon one.',
    },
    {
      title: 'One road in, one road out',
      body: 'Collins Avenue is effectively the only artery, and it slows badly midday and in season. A truck creeping between 163rd Street and the Haulover bridge is on billed time, so we schedule Sunny Isles starts early and stage the route to touch Collins as briefly as possible.',
    },
    {
      title: 'Building rules on wrap and protection',
      body: 'Managements here commonly require floor runners, padded elevator walls, and wrapped furniture before anything crosses the lobby. We carry and set the protection as part of the job, but setup takes minutes at each end, minutes we include in the estimate rather than surprise you with later.',
    },
  ],
  faqs: [
    {
      q: 'How far in advance should I book a winter move in Sunny Isles Beach?',
      a: 'Two to three weeks is comfortable in season. The limiting factor is rarely our calendar and usually your freight elevator, since towers with one car fill their winter blocks quickly. Our pricing is identical in January and July, with no seasonal surcharge, but late booking in winter often means an awkward window, and an awkward window costs hours.',
    },
    {
      q: 'My tower has one freight elevator. Does that make the move cost more?',
      a: 'It can, through pace: one car means each load waits for the elevator cycle, and a two-mover crew can find itself idle at the dock. Our fix is proportion, three or four movers so someone is always wrapping, staging, or riding while others carry. The hourly rate rises with crew size, but the hour count usually falls further.',
    },
    {
      q: 'Can your truck use my building loading dock on Collins Avenue?',
      a: 'Usually, and we verify rather than assume: dock height, clearance, and truck-size limits differ noticeably between the older towers and the new ones. We call your management for the specifics before moving day and send the truck that fits. When a dock genuinely cannot take any box truck, we plan the street-level carry into the hours you approve up front.',
    },
    {
      q: 'What does the smallest possible Sunny Isles move cost?',
      a: 'The minimum invoice is $516 for two movers, covering three hours plus the $129 truck day tied to a two-mover crew, and a packed-up studio with a good elevator window can land on it. The studio band overall runs $516–$645. Have boxes sealed, closets emptied, and the window confirmed, and the minimum is a realistic target rather than a teaser.',
    },
    {
      q: 'What is included, and what costs extra?',
      a: 'Included: the crew, all wrapping and padding, dollies, floor protection, disassembly and reassembly, and the loading work itself. Billed separately: the truck day at your crew rate, packing from $79 per hour for two packers if you want us boxing, and storage from $200 per month. Not billed at all: stairs, long carries, heavy items, fuel, weekends.',
    },
    {
      q: 'Does Sunny Isles building management need insurance paperwork from you?',
      a: 'Yes, as a rule: a certificate of insurance naming your association, on file before the elevator is released. We issue it free within 24 hours of booking. Coverage expectations in this market typically fall in the $1M–$2M range, and we confirm the exact requirement with your office so the document is right the first time.',
    },
  ],
},
{
  slug: 'moving-cost-hallandale-beach',
  cityName: 'Hallandale Beach',
  citySlug: 'hallandale-beach-movers',
  metaDescription: 'Hallandale Beach movers cost $129–$219/hr with a 3-hour minimum. We are based 3 miles away, so travel time stays low. Call or WhatsApp 786-305-1844 today.',
  answer: 'Hallandale Beach movers charge $129/hour for 2 movers or $179/hour for 3, with a 3-hour minimum, plus a truck fee per day that matches the crew rate. Hallandale sits about three miles from our Hollywood yard, so the travel portion of an hourly bill here is nearly nothing. The split that matters is east versus west: oceanfront towers on South Ocean Drive move at freight-elevator pace, while the condos and townhouses around the Three Islands and Golden Isles areas load faster and cheaper.',
  intro: 'Hallandale Beach is one of the least expensive places on our map to hire us, not because the rates drop, since they are the same $129, $179, and $219 per hour for two, three, and four movers with a three-hour minimum and a truck day at the crew figure, but because the geography is kind. The yard is three miles up the road in Hollywood, so crews arrive with minimal billed travel, and the city is compact enough that a local move rarely spends meaningful time driving. What separates one Hallandale quote from another is the building. An oceanfront tower brings dock rules and weekday association windows; a west-side condo or townhouse often brings a parking lot and a short walk.',
  accessFactors: [
    {
      title: 'Three miles from the yard',
      body: 'Our trucks are based on Stirling Road in Hollywood, roughly three miles from most Hallandale Beach addresses. Travel is part of any hourly moving bill, and here it rounds down to almost nothing, which is why small Hallandale jobs land closer to the $516 minimum than the same jobs would ten cities away.',
    },
    {
      title: 'Oceanfront towers on South Ocean Drive',
      body: 'The beachfront line of towers runs on classic condo logistics: reserved dock, freight elevator block, protection panels up before the first box moves. As a rule these buildings add an hour or more against a comparable west-side move, and we size the crew so the elevator window is never the thing that runs out.',
    },
    {
      title: 'Weekday association windows',
      body: 'Many Hallandale associations permit moves only on weekdays inside set business hours, and some close the calendar on Sundays entirely. That rarely changes the price, since our rates carry no weekend premium anyway, but it shapes scheduling: the compliant slots go early, and a rushed slot creates exactly the time pressure that inflates hours.',
    },
    {
      title: 'West-side condos and townhouses',
      body: 'West of Federal Highway and around the Three Islands and Golden Isles areas, buildings run smaller: surface parking near entrances, shorter carries, passenger elevators that managements allow with pads. These moves are among the quickest we do anywhere, and a prepared two-bedroom here often prices at the low end of its band.',
    },
    {
      title: 'Event traffic near Gulfstream Park',
      body: 'Hallandale Beach Boulevard around Gulfstream Park can jam on race days and event evenings, and it is the main east-west spine of the city. When your date coincides with an event, we start earlier or route around the boulevard, because a truck idling in event traffic is billed the same as one being loaded.',
    },
  ],
  faqs: [
    {
      q: 'Is Hallandale Beach actually cheaper because you are close by?',
      a: 'Closeness does show up on the bill, honestly and mechanically: less travel time inside an hourly job. Three miles from the yard means Hallandale crews spend their clock on your furniture, not the highway. Rates are the same everywhere we work, so this is not a discount. It is simply the arithmetic of a short drive working in your favor.',
    },
    {
      q: 'Do the oceanfront towers here cost more to move out of?',
      a: 'As a rule, yes, by hours and never by surcharge. A South Ocean Drive tower requires dock access, an elevator reservation, and building protection, and each load rides the freight car instead of rolling straight to a truck. Two identical apartments, one oceanfront and one west of Federal Highway, can differ by an hour or two of billed time.',
    },
    {
      q: 'Can I move on a weekend in Hallandale Beach?',
      a: 'From our side, certainly: there is no weekend surcharge and Saturdays are working days. The obstacle, when there is one, is your association, since several Hallandale buildings restrict moves to weekday windows. Ask your management first; if Saturday is allowed, it costs exactly what Friday costs. If it is not, weekday mornings are the slots worth taking early.',
    },
    {
      q: 'What is the minimum I could pay for a small Hallandale move?',
      a: '$516 covers two movers for the three-hour minimum plus the matching $129 truck day, and Hallandale is one of the likeliest places to actually finish inside it thanks to short travel. The one-bedroom band runs $516–$774 overall. Licensed movers in this market generally run $100–$180 per hour for a two-mover crew, so the floor is competitive.',
    },
    {
      q: 'Why hourly instead of a flat price?',
      a: 'Because in a condo city the work is access, and access varies more than furniture does. An hourly rate with a written hour estimate keeps the price honest in both directions: an easy move finishes early and costs less, a hard one is visible in the estimate before you book.',
    },
    {
      q: 'What do you need from me for a firm Hallandale estimate?',
      a: 'Three things: a quick video of the home over WhatsApp at 786-305-1844, your building name if an association is involved, and the destination address with its own access notes. From those, Evgenii Romanov writes the estimate himself, with crew size, projected hours, and the truck day itemized. Nothing is due up front, and changes more than 48 hours out cost nothing.',
    },
  ],
},
{
  slug: 'moving-cost-boca-raton',
  cityName: 'Boca Raton',
  citySlug: 'boca-raton-movers',
  metaDescription: 'Boca Raton movers cost $129–$219/hr, 3-hour minimum, no hidden fees. Country club gate and HOA paperwork handled. Call or WhatsApp 786-305-1844 to book now.',
  answer: 'Boca Raton movers charge $129/hour for 2 movers or $179/hour for 3, with a 3-hour minimum, plus a truck fee per day that matches the crew rate. Boca is the far north of our regular map, and its costs are shaped by paperwork as much as by distance: guard-gated country club communities want crews registered and insured before entry, and many HOAs only open weekday move windows. Book the window first and the rest of a Boca estimate behaves.',
  intro: 'Boca Raton moves use the standard card, two movers at $129 per hour, three at $179, four at $219, with a three-hour minimum and a truck day billed at the crew figure, and they reward planning more than any city we serve. The housing stock splits three ways: guard-gated country club communities with formal admission requirements, downtown towers around Mizner Park with docks and elevator reservations, and larger single-family and estate properties where volume, not access, drives the hours. Boca is also a real drive from our Hollywood yard, so we dedicate the crew and the day to your move rather than splitting either. Tell us the community name early; in Boca, the name predicts the paperwork, and the paperwork predicts the schedule.',
  accessFactors: [
    {
      title: 'Country club gate requirements',
      body: 'The guard-gated club communities of west Boca typically require vendor registration, insurance certificates, and sometimes a designated entry gate for trucks. Cleared in advance, entry takes minutes; sorted out at the guardhouse on moving day, it can burn half an hour of billed time before a single box moves. We clear it in advance.',
    },
    {
      title: 'Weekday-only HOA windows',
      body: 'Many Boca associations, vertical and horizontal alike, restrict moving to weekday business hours as a rule. Since demand piles into those hours, the calendar is the scarce resource: early weekday slots give the crew room to work methodically, while a compressed slot invites exactly the time pressure that adds billed increments.',
    },
    {
      title: 'Downtown towers around Mizner Park',
      body: 'The newer towers of downtown Boca operate like Miami buildings: reserved dock, freight elevator block, protection requirements in the corridors. They are efficient when the window is respected, so we arrive ahead of it and stage in order. The tower move that starts inside its window and loads by plan is the one that ends near its estimate.',
    },
    {
      title: 'Estate homes and volume',
      body: 'East Boca estates and the larger west Boca houses are usually easy access and heavy volume: more rooms, patio sets, garage contents. Here hours scale with cubic feet, and a four-mover crew at $219 per hour almost always closes a big house faster and cheaper overall than a smaller crew working a longer day.',
    },
    {
      title: 'Distance from our Hollywood base',
      body: 'Boca sits at the top of our regular range, and travel time is part of an hourly bill, so a Boca move carries more drive than a Hollywood one. We are straightforward about that in the estimate and offset it with scheduling: one crew, one dedicated day, no mid-day repositioning between jobs.',
    },
  ],
  faqs: [
    {
      q: 'Can you move me into a guard-gated country club community in Boca?',
      a: 'Yes. The west Boca club communities are inside our service area, and their requirements are familiar: advance vendor registration, an insurance certificate on file, posted moving hours, occasionally a designated service gate. Give us the community name and your management contact at booking, and the clearance is complete before the truck leaves Hollywood.',
    },
    {
      q: 'Are weekend moves possible in Boca Raton?',
      a: 'Our side has no weekend restriction and no weekend surcharge, but Boca associations frequently do restrict weekends, and the country club communities can be the strictest. When your community only opens weekday windows, take the earliest one available; those slots go first precisely because everyone faces the same rule. The price is identical whichever day the rules allow.',
    },
    {
      q: 'Does being far from your Hollywood base make Boca moves cost more?',
      a: 'Somewhat, and we would rather say so than hide it: travel time exists in any hourly bill, and Boca carries more of it than our nearby cities. It does not change the rate card, the minimum, or the truck day, and it appears as ordinary time in the written estimate rather than as a mileage fee or fuel surcharge. We charge neither.',
    },
    {
      q: 'What is the least expensive Boca Raton move?',
      a: 'The invoice floor is $516, meaning two movers for three hours plus the $129 truck day that pairs with a two-mover crew, though Boca jobs more commonly land mid-band because of travel and community procedures. A packed one-bedroom with clearances arranged can still finish low in the $516–$774 band. Licensed movers in this market generally run $100–$180 per hour for a two-mover crew.',
    },
    {
      q: 'Which fees should I expect on top of the hourly rate?',
      a: 'From us, one line beyond labor: the truck day, billed at your crew rate. Wrapping, blankets, tools, dollies, disassembly, and reassembly live inside the hourly price, and there are no charges for stairs, long carries, heavy pieces, weekends, or fuel. Your community may have its own deposits or elevator fees payable to the association; those are theirs, not ours, and we flag them when we collect your building requirements.',
    },
    {
      q: 'How should I get a Boca Raton quote that will hold?',
      a: 'Walk us through the house on video via WhatsApp at 786-305-1844, and name the community along with any destination building. Boca estimates are written by the owner with the gate, the window, and the travel already inside the hour count, which is why they tend to hold. You get crew size, hours, and the truck day in writing, with no deposit to reserve the date.',
    },
  ],
},
{
  slug: 'moving-cost-pembroke-pines',
  cityName: 'Pembroke Pines',
  citySlug: 'pembroke-pines-movers',
  metaDescription: 'Pembroke Pines movers cost $129–$219/hr with a 3-hour minimum and no stair or long-carry fees. No deposit required. Call or WhatsApp 786-305-1844 to book.',
  answer: 'Pembroke Pines movers charge $129/hour for 2 movers or $179/hour for 3, with a 3-hour minimum, plus a truck fee per day that matches the crew rate. Pembroke Pines spreads its housing across miles of master-planned communities, so the hidden variable is walking distance: from a townhouse door to visitor parking, from a gate to a cul-de-sac, from a 55+ building elevator to the lot. Short carries keep Pines moves near the bottom of their bands; long ones are billed as honest minutes, never as fees.',
  intro: 'Pricing a Pembroke Pines move starts with the usual arithmetic, $129 per hour for two movers, $179 for three, $219 for four, a three-hour minimum, and a truck day matching the crew rate, and then meets the city layout. Pines is horizontal: gated subdivisions off Pines Boulevard, townhouse rows with assigned parking, and large 55+ sections with their own movement rules. Trucks rarely struggle to reach the neighborhood; the question is how close they park to your actual door. A driveway at the threshold and a guest lot across the green are two different moves. We ask about that distance before quoting, because in this city the carry, not the drive, writes the estimate.',
  accessFactors: [
    {
      title: 'Sprawl between gate and door',
      body: 'A master-planned address can put real distance between the community entrance and the home, with speed tables and resident-only lanes along the way. It is drive time in miniature, repeated at both ends of the day, and in a city this wide we fold it into the hour estimate rather than pretending the gate is the doorstep.',
    },
    {
      title: 'Townhouse parking limits',
      body: 'Many Pines townhouse rows assign a couple of spaces per unit and push everything else, trucks included, to guest lots. When the 26-footer parks three buildings away, every sofa and box crosses that gap on a dolly. There is no fee for it; it costs minutes per trip, which is why we ask for photos of the parking before we quote.',
    },
    {
      title: 'Two-story layouts',
      body: 'The classic Pines house is a two-story with bedrooms upstairs, and stairs are the slowest part of any carry. We charge no stair fee; a staircase simply converts to added minutes per trip, and on a full house those minutes are the argument for a third mover, whose rate difference is usually repaid in finishing earlier.',
    },
    {
      title: '55+ communities',
      body: 'The 55+ sections, Century Village among them, run moves by the book: office notification, insurance on file, elevator pads in the mid-rises, and quiet-hours limits on when work happens. None of it is difficult, and all of it goes smoothly when arranged ahead, which we do, so the billed hours start with furniture rather than formalities.',
    },
    {
      title: 'Gated community check-in',
      body: 'Most gated subdivisions here clear a moving truck quickly once a resident calls it in, but quick assumes the guardhouse expects us. We confirm the entry procedure with you the day before, whether gate code, guard call, or visitor lane, because an unexpected truck sits in the queue while calls are made, and idle time lands on the bill.',
    },
  ],
  faqs: [
    {
      q: 'Do you handle moves in Century Village and the 55+ communities?',
      a: 'Regularly. The 55+ sections of Pembroke Pines are ordinary territory for us, and their procedures are familiar: notify the office, file the insurance certificate, respect posted moving hours, pad the elevator in the mid-rise buildings. Crews work in English and Russian, which residents and the family members coordinating for them often find useful. Arrange the paperwork with us once and the day itself runs quietly.',
    },
    {
      q: 'My townhouse only has guest parking nearby. Will that raise the price?',
      a: 'It raises the hours, and we will tell you by how much before you book. A long carry adds a repeating cost per trip, so the honest fix is fewer, better trips: staging everything at the door, loading the dolly heavy, sometimes a third mover to keep the chain moving. There is no long-carry fee; the estimate simply reflects the real distance.',
    },
    {
      q: 'Do stairs in a two-story Pines house cost extra?',
      a: 'Not as a fee. Nothing on our price list charges for stairs, elevators, or heavy furniture. Stairs cost time: each upstairs bedroom adds minutes per carry, and a full two-story home typically runs an hour or so longer than the same volume on one level. We count that into the estimate, so the number you approve already contains your staircase.',
    },
    {
      q: 'What is the cheapest Pembroke Pines move possible?',
      a: 'Two movers for the minimum three hours plus their $129 truck day totals $516. In Pines that floor favors small, close-parked moves, an apartment or townhouse with a spot by the door and boxes packed before arrival. If the truck must sit in a distant guest lot, budget toward the upper half of your size band instead of the floor.',
    },
    {
      q: 'Would a flat rate be better for a big house move?',
      a: 'For local work, no. Hourly with a written estimate is the fairer instrument, because it returns money when the day goes faster than planned. Local Pines jobs stay hourly, billed in 15-minute steps after the minimum.',
    },
    {
      q: 'How do I get an exact quote for my Pines address?',
      a: 'Video-walk the house with us on WhatsApp at 786-305-1844 and include the outside: where a truck can park, the path to the door, the staircase. Exteriors decide Pembroke Pines estimates as much as furniture does. The owner replies with a written plan covering crew size, hours, and the truck day, and holding the date requires no deposit.',
    },
  ],
},
{
  slug: 'moving-cost-miami-beach',
  cityName: 'Miami Beach',
  citySlug: 'miami-beach-movers',
  metaDescription: 'Miami Beach movers cost $129–$219/hr, 3-hour minimum, no hidden fees. Walk-ups, towers, and loading logistics handled. Call or WhatsApp 786-305-1844 today.',
  answer: 'Miami Beach movers charge $129/hour for 2 movers or $179/hour for 3, with a 3-hour minimum, plus a truck fee per day that matches the crew rate. Miami Beach adds two constraints most cities skip: curb space is regulated, so many addresses need a legal loading spot arranged before the truck arrives, and every route on or off the island crosses a causeway with a rush hour. Between Art Deco walk-ups and new towers with scarce freight elevators, access sets the hours here more than square footage does.',
  intro: 'Miami Beach carries the same rate card as the mainland, $129 per hour for two movers, $179 for three, $219 for four, three hours minimum, and a truck day at the crew figure, stretched over the least forgiving access in South Florida. The island splits into two moving problems. South of Dade Boulevard the housing is dense and historic: Art Deco and MiMo buildings with narrow stairwells, no elevators, and streets where a truck cannot linger unarranged. The newer towers north and along the water run on freight elevator reservations that go fast. Both problems are solvable and neither carries a fee from us; both are solved with hours, which is why a Miami Beach estimate leans on access questions before furniture questions.',
  accessFactors: [
    {
      title: 'Loading zones and curb space',
      body: 'Miami Beach polices its curbs, and as a rule a moving truck needs a legal place to stand: a building dock, a marked loading zone, or a temporary curb reservation arranged with the city in advance. We settle where the truck will legally sit before moving day, because a truck circling for space bills like a truck being loaded.',
    },
    {
      title: 'Causeway timing',
      body: 'Every mainland move crosses the MacArthur, the Julia Tuttle, or a northern causeway, and each has hours when it barely moves. The crossing is billed time in both directions, so we schedule Beach jobs to ride the causeways outside their peaks, typically early, and keep the slow miles to a minimum the estimate already reflects.',
    },
    {
      title: 'Art Deco walk-ups',
      body: 'The historic low-rises of South Beach and the MiMo district often have no elevator, tight switchback stairs, and doorways drawn for 1940s furniture. Large pieces come apart, get wrapped, and travel slowly; a third-floor walk-up can double the carry time of the same apartment at ground level. We count that honestly into the hours.',
    },
    {
      title: 'Freight elevator scarcity in the towers',
      body: 'The condo towers here tend to run fewer freight cars than their unit counts deserve, and management assigns windows tightly. When your window is short, we scale the crew so the elevator never idles: four movers at $219 per hour can clear a window that two movers would overrun into a rescheduling problem.',
    },
    {
      title: 'Alleys and one-way streets',
      body: 'South Beach blocks run one-way, with service alleys that predate box trucks; approach direction matters, and a wrong turn costs a loop around a crowded block. Crews that work the Beach weekly stage the truck nose-out toward the causeway and plan the approach street by street, which quietly shaves the day.',
    },
  ],
  faqs: [
    {
      q: 'Who arranges the loading spot or parking for my Miami Beach move?',
      a: 'We handle the logistics side: identifying where the truck can legally stand at your address and, when a reserved curb zone is needed, arranging it ahead of the date. Some buildings solve it internally with a dock or a service driveway. Either way it is settled before moving day; a mover improvising curb space on the Beach is a mover billing you for circling.',
    },
    {
      q: 'How much more does a third-floor Art Deco walk-up cost?',
      a: 'There is no walk-up fee, only walk-up hours. As a rule, expect noticeably more time than a comparable elevator move, since stairs slow every carry and old doorways force disassembly. A one-bedroom that might finish near the minimum at ground level typically runs an extra hour or more from a third floor. We quote it from your video walkthrough, so the number is visible up front.',
    },
    {
      q: 'When is the best time to cross the causeways with a moving truck?',
      a: 'Early morning, and our Beach schedule is built around it: load or arrive before the causeways congest, make the mainland leg midday, avoid the afternoon return crush. The MacArthur and the Julia Tuttle both punish bad timing in billed minutes. This is also why we favor morning elevator windows on the Beach, so the road schedule and the building schedule agree.',
    },
    {
      q: 'What do Miami Beach towers require before a move?',
      a: 'Typically a certificate of insurance naming the association, a reserved freight elevator window, and protection installed in the elevator and corridors. The certificate is free from us within 24 hours of booking; limits requested in this market usually sit in the $1M–$2M range, and we confirm the exact requirement directly with your management office.',
    },
    {
      q: 'What is the minimum cost to move on Miami Beach?',
      a: 'The floor is $516, covering two movers for the three-hour minimum and the $129 truck day a two-mover crew carries, and it is reachable for a packed studio with legal parking at the door and no stairs. Access is what pushes past it here, not size. Licensed movers in this market generally run $100–$180 per hour for a two-mover crew.',
    },
    {
      q: 'Are there surcharges for beach addresses, weekends, or heavy furniture?',
      a: 'None. The rate card has no zone pricing, no weekend or seasonal premium, no fuel line, and no charges for stairs, long carries, or heavy pieces. Difficult access is priced as estimated hours you see before booking, not as fees after. The truck day at your crew rate is the only line beyond labor, and billing after the minimum moves in 15-minute increments.',
    },
  ],
},
];

export const getCostPage = (slug: string): CostPageData | undefined =>
  COST_PAGES.find((p) => p.slug === slug);

/**
 * Russian and Ukrainian cost pages.
 *
 * The proven citable format existed only in English, which is backwards: those
 * are the two languages with the least competition. Same interface, same
 * CostPage template — only the locale prop and the content differ.
 */
export const COST_PAGES_RU: CostPageData[] = [
{
  slug: 'ru/moving-cost-sunny-isles',
  cityName: 'Sunny Isles Beach',
  cityNameRu: 'Санни-Айлс-Бич',
  citySlug: 'ru/sunny-isles-movers',
  metaDescription: 'Сколько стоит переезд в Санни-Айлс-Бич: $129/час за двух грузчиков, минимум 3 часа, трак за день, COI бесплатно. Без скрытых сборов. Звоните 786-305-1844.',
  answer: 'Переезд в Санни-Айлс-Бич стоит $129 в час за двух грузчиков или $179 за трёх, минимум 3 часа, плюс трак за день по ставке бригады. Счёт в башнях на Collins Avenue растёт не от ставки, а от часов: в большинстве зданий грузовой лифт один на весь дом, окно на него бронируется заранее, и всё, что не влезло в окно, — это дополнительное время бригады. Квартира с одной спальней здесь обычно укладывается в $516–$774, две спальни — в $645–$1,253. Доплат за выходные, сезон, топливо, лифт и длинный пронос нет.',
  intro: 'Цена переезда в Санни-Айлс-Бич считается по часам, и арифметика здесь открытая. Двое грузчиков — $129 в час, трое — $179, четверо — $219. Трак идёт отдельной строкой в смете, за день, по той же цифре, что и бригада: $129 при двух грузчиках, $179 при трёх, $219 при четверых. Минимум — три часа, дальше счёт идёт шагами по 15 минут. Депозита нет, отмена более чем за 48 часов бесплатная, страховой сертификат для здания оформляем за 24 часа после бронирования и денег за него не берём. Ставка одинаковая в субботу и во вторник, в январе и в августе. Меняются только часы — а в Санни-Айлс их определяет не квартира, а грузовой лифт и окно, которое вам дал менеджмент.',
  accessFactors: [
    {
      title: 'Один грузовой лифт на всю башню',
      body: 'В большинстве высоток на Collins Avenue грузовой лифт один на весь дом, и им же пользуются подрядчики, доставка мебели и соседи. Менеджмент выдаёт окно на конкретные часы, и попасть в него нужно с первой попытки. Мы подаём трак к началу окна и строим порядок работы так, чтобы основная масса вещей ушла в первые полтора часа.',
    },
    {
      title: 'Что происходит, когда окно закрылось',
      body: 'Если окно заканчивается раньше, чем квартира, остаток приходится доносить пассажирским лифтом или переносить на другой день. И то и другое — часы в смете. Поэтому на трёхкомнатные квартиры в башнях мы чаще предлагаем бригаду из трёх человек за $179 в час: она укладывается в окно, и итог выходит меньше, чем у двоих, работающих дольше.',
    },
    {
      title: 'Зона погрузки и движение по Collins',
      body: 'Collins Avenue узкая, а служебный въезд у большинства башен один и небольшой. В сезон к нему стоит очередь из курьеров и подрядчиков, и трак может ждать своей очереди. Мы закладываем это время в оценку заранее, а не показываем сюрпризом в счёте: смета на переезд у океана всегда содержит запас на подачу машины.',
    },
    {
      title: 'Сезон снегоптиц: с ноября по апрель',
      body: 'Часть квартир в Санни-Айлс живёт по полгода, и с ноября по апрель окна грузовых лифтов разбирают на недели вперёд. Ставка от сезона не меняется, доплат за высокий сезон у нас нет. Но свободных окон меньше, и переезд, назначенный за три дня, чаще попадает на неудобные часы. Бронируйте окно вместе с датой.',
    },
    {
      title: 'Длинный пронос от лифта до двери',
      body: 'В домах на три-четыре сотни квартир от грузового лифта до вашей двери бывает сотня метров коридора, а от лифта до трака — ещё столько же по служебному проходу. Отдельного сбора за длинный пронос у нас нет, но каждая ходка становится длиннее, и на квартире с двумя спальнями это спокойно даёт лишний час.',
    },
  ],
  faqs: [
    {
      q: 'Сколько стоит переезд однокомнатной квартиры в башне на Collins Avenue?',
      a: 'Обычно $516–$774. Это двое грузчиков по $129 в час плюс трак за день по той же ставке, минимум три часа. Квартира с одной спальней в высотке чаще всего занимает от трёх до пяти часов, и разброс дают лифт и пронос, а не количество вещей. После минимума счёт идёт шагами по 15 минут, так что за четыре с половиной часа вы платите ровно за четыре с половиной.',
    },
    {
      q: 'Почему та же квартира в башне обходится дороже, чем в доме на земле?',
      a: 'Потому что у дома трак стоит у двери, а в башне между траком и квартирой служебный коридор, лифт по расписанию и лобби, где нужно стелить защиту. Ставка одна и та же, разница только в часах: как правило, высотка добавляет от часа до двух на тот же объём вещей. Мы называем эту разницу в смете до переезда, а не после него.',
    },
    {
      q: 'Что будет, если окно грузового лифта закончится раньше, чем мы закончим?',
      a: 'Дальше работаем тем, что разрешает здание: обычно пассажирским лифтом, иногда переносим остаток на следующее свободное окно. Часы считаются по факту, штрафа за перенос нет. Но это как раз тот случай, когда бригада из трёх человек за $179 в час выходит дешевле двоих. Поэтому мы заранее спрашиваем у менеджмента длину окна и подбираем состав бригады под неё.',
    },
    {
      q: 'Берёте ли вы доплату за COI, бронирование лифта или высокий этаж?',
      a: 'Нет. Страховой сертификат бесплатный, делаем его в течение 24 часов после бронирования и отправляем в менеджмент по их форме — во многих зданиях требуют лимиты в диапазоне $1–2 млн, точные требования вашего дома уточняем заранее. Переписка с офисом здания и бронирование лифта тоже входят в работу координатора. Отдельных сборов за этаж, лестницы или лифт у нас не бывает.',
    },
    {
      q: 'Сколько стоит вывезти квартиру в хранение на лето?',
      a: 'Работа считается так же почасово: двое грузчиков и трак — от $516 за минимальные три часа. Хранение идёт отдельной строкой, от $200 в месяц. Обратная доставка осенью считается снова по часам и обычно выходит короче, потому что вещи уже упакованы и описаны. Если вас в это время нет в стране, координатор ведёт переезд по видеосвязи и на русском языке.',
    },
    {
      q: 'Нужен ли депозит и можно ли отменить бронь?',
      a: 'Депозита нет, вы ничего не платите до дня переезда. Отмена более чем за 48 часов бесплатная и без объяснений. Оплата — по факту отработанного времени: сначала минимум в три часа, дальше шагами по 15 минут. Ставка не растёт из-за субботы, праздника или того, что работа затянулась до вечера, а топливного сбора у нас нет вообще.',
    },
  ],
},
{
  slug: 'ru/moving-cost-aventura',
  cityName: 'Aventura',
  cityNameRu: 'Авентура',
  citySlug: 'ru/aventura-movers',
  metaDescription: 'Цены на переезд в Авентуре: $129/час за двух грузчиков, $179 за трёх, минимум 3 часа, трак за день. Без депозита и скрытых сборов. WhatsApp 786-305-1844.',
  answer: 'Переезд в Авентуре стоит $129 в час за двух грузчиков или $179 за трёх, минимум 3 часа, плюс трак за день по ставке бригады. Часы здесь съедает не квартира, а доступ: на въезде в закрытые комьюнити бригаду пускают только по списку, поданному заранее, а в башнях у Country Club Drive грузовой лифт работает по забронированным окнам. Двухкомнатная квартира в Авентуре обычно выходит в $645–$1,253, минимальный счёт — $516 за двоих. Доплат за выходные, топливо, лифт и лестницы нет.',
  intro: 'В Авентуре действует тот же прайс, что и по всей Южной Флориде: двое грузчиков $129 в час, трое $179, четверо $219, минимум три часа. Трак стоит отдельной строкой в смете, за день, по ставке бригады — при двух грузчиках это $129, при трёх $179, при четверых $219. После минимума время считается по 15 минут, так что за круглые часы вы не переплачиваете. Депозит мы не берём, отмена более чем за 48 часов бесплатная, COI для здания или ассоциации делаем за 24 часа после бронирования. Разница между $516 и $1,253 в Авентуре почти всегда объясняется одним: сколько времени бригада тратит между траком и вашей дверью — через КПП, паркинг, служебный вход и лифт.',
  accessFactors: [
    {
      title: 'Списки на КПП закрытых комьюнити',
      body: 'Мы работаем в закрытых комьюнити Авентуры — Williams Island, Turnberry, Porto Vita и других, — и почти везде охрана пускает бригаду только по списку, поданному жильцом заранее. Имена и номер трака нужно передать за день. Если этого не сделать, машина стоит у шлагбаума, а время уже идёт: это самая обидная и самая частая потеря часов в городе.',
    },
    {
      title: 'Окна грузовых лифтов в башнях',
      body: 'В высотках вдоль Country Club Drive и Biscayne Boulevard переезд оформляется заявкой: менеджмент даёт грузовой лифт на конкретные часы, как правило будни с утра до раннего вечера. В некоторых домах просят возвратный депозит за лифт — его платит жилец, к нашей смете это отношения не имеет. Мы уточняем длину окна до дня переезда и подбираем бригаду под неё.',
    },
    {
      title: 'Трафик у Aventura Mall',
      body: 'Biscayne Boulevard и подъезды к моллу к середине дня встают, а по субботам это состояние держится часами. Дорога бригады между адресами — рабочее время, поэтому мы стараемся начинать в Авентуре рано утром. Отдельного сбора за пробег, топливо и платные дороги нет, но час, простоянный в пробке между старой и новой квартирой, оплачивается как час работы.',
    },
    {
      title: 'Паркинги с ограничением по высоте',
      body: 'Под многими башнями Авентуры многоуровневый паркинг с низким клиренсом, куда трак физически не заедет. Значит, разгрузка идёт от служебного входа или с внешней площадки, а вещи едут внутрь на тележках через лифт. Доплаты за это нет, просто каждая ходка длиннее. Мы смотрим въезд заранее и говорим честно, сколько часов даст такой пронос.',
    },
    {
      title: 'Таунхаусы и низкие кондо западнее Biscayne',
      body: 'Кварталы западнее Biscayne Boulevard устроены проще: таунхаусы и трёхэтажные кондо, где трак встаёт у самого подъезда, а лифт либо не нужен, либо свободен. Такие адреса чаще всего и есть переезды по минимальному счёту в $516: двое грузчиков, три часа, всё уложилось. Разница с башней при том же количестве вещей — обычно час-полтора.',
    },
  ],
  faqs: [
    {
      q: 'Что нужно сделать заранее, чтобы бригаду пустили через КПП?',
      a: 'Позвонить в офис комьюнити и внести компанию в список на день переезда: название, имена грузчиков и марку трака. Мы присылаем эти данные вам в WhatsApp за сутки, чтобы вы просто переслали их охране. Пять минут на звонок экономят от получаса до часа оплаченного простоя у шлагбаума — на почасовой смете это самая дешёвая экономия из возможных.',
    },
    {
      q: 'Сколько стоит переезд двухкомнатной квартиры в Авентуре?',
      a: 'Обычно $645–$1,253. Нижняя часть диапазона — таунхаус или низкий кондо с погрузкой от двери, верхняя — башня с окном лифта, паркингом без заезда и длинным проносом. Считается это одинаково: часы бригады плюс трак за день по её ставке. Мебель мы разбираем и собираем сами, одеяла и плёнка входят в ставку. Чтобы оценка была точной, пришлите видео квартиры на WhatsApp 786-305-1844, и мы посчитаем часы, а не назовём диапазон наугад.',
    },
    {
      q: 'Почему вы советуете начинать переезд в Авентуре в восемь утра?',
      a: 'По двум причинам сразу. Окна грузовых лифтов в башнях чаще всего начинаются утром, и раннее окно даёт запас, если что-то пойдёт медленнее. И трафик на Biscayne до девяти ещё едет, а к полудню уже нет. Ранний старт в Авентуре обычно сокращает счёт на час просто за счёт того, что бригада не стоит.',
    },
    {
      q: 'Трак поместится в паркинг моего здания?',
      a: 'Часто нет: в большинстве башен Авентуры высота проезда рассчитана на легковые машины. Мы уточняем клиренс и место погрузки до дня переезда и, если заезда нет, планируем работу от служебного входа и закладываем пронос в часы. Отдельного сбора за это не появляется — просто оценка часов будет честнее, чем у тех, кто узнаёт про паркинг на месте.',
    },
    {
      q: 'Дорога между адресами тоже оплачивается?',
      a: 'Да, переезд трака между старым и новым адресом — это работа бригады, и она входит в те же почасовые ставки. Отдельно ни пробег, ни топливо, ни платные дороги мы не выставляем. Внутри Авентуры и до соседних городов дорога занимает считаные минуты, поэтому большинство местных переездов упирается в три часа минимума, а не в расстояние.',
    },
    {
      q: 'Можно ли провести весь переезд на русском языке?',
      a: 'Да. Владелец компании Евгений Романов и координатор говорят по-русски, поэтому смета, договор, переписка с менеджментом здания и день переезда могут идти полностью на русском. Примерно каждый третий грузчик в бригадах украиноязычный. Если вам важно, чтобы на объекте вас понимали без переводчика, скажите об этом при бронировании, и мы соберём бригаду соответственно.',
    },
  ],
},
{
  slug: 'ru/moving-cost-hallandale-beach',
  cityName: 'Hallandale Beach',
  cityNameRu: 'Халландейл-Бич',
  citySlug: 'ru/hallandale-beach-movers',
  metaDescription: 'Сколько стоит переезд в Халландейл-Бич: $129/час за двоих, минимум 3 часа, трак за день. База в 3 милях — меньше дороги в счёте. Звоните 786-305-1844.',
  answer: 'Переезд в Халландейл-Бич стоит $129 в час за двух грузчиков или $179 за трёх, минимум 3 часа, плюс трак за день по ставке бригады. Наш двор стоит на Stirling Road в Голливуде, примерно в трёх милях отсюда, а дорога бригады — это оплачиваемое время, поэтому в Халландейле его уходит меньше, чем почти в любом другом городе, где мы работаем. Океанские башни на A1A и кондо западнее Federal Highway ведут себя по-разному: в первых всё решает окно грузового лифта, во вторых — будние часы, в которые ассоциация вообще разрешает переезд.',
  intro: 'Прайс в Халландейл-Бич простой: $129 в час за двоих грузчиков, $179 за троих, $219 за четверых, минимум три часа, дальше шагами по 15 минут. Трак идёт в смете отдельной строкой, за день, по ставке бригады: $129 при двух грузчиках, $179 при трёх. Минимальный счёт получается $516 за двоих, $716 за троих. Депозита нет, бесплатная отмена более чем за 48 часов, COI для здания за 24 часа после брони. Дополнительная экономия здесь географическая и вполне честная: от нашего двора до Халландейла три мили, и подача трака утром занимает минуты, а не полчаса по I-95. На почасовой смете это заметно, особенно на маленьких переездах, которые целиком укладываются в минимум.',
  accessFactors: [
    {
      title: 'Три мили от нашего двора',
      body: 'База с траками стоит на Stirling Road в Голливуде — до Халландейл-Бич отсюда около трёх миль. Дорога бригады оплачивается как часы, поэтому короткий выезд напрямую уменьшает счёт: утром машина у вас через несколько минут после старта, а не после сорока минут в потоке. По той же причине здесь легче поставить переезд на удобное вам время дня.',
    },
    {
      title: 'Океанские башни на A1A',
      body: 'Высотки вдоль A1A и в районе Diplomat живут по расписанию грузового лифта: окно на несколько часов, служебный вход, защита лобби. Если в квартире три спальни, а окно короткое, дешевле выходит бригада из трёх человек по $179 в час, чем двое, которым не хватит времени. Мы узнаём длину окна до дня переезда и считаем оба варианта.',
    },
    {
      title: 'Кондо западнее Federal Highway',
      body: 'В кварталах западнее Federal Highway многоэтажки ниже и проще, зато ассоциации строже к дням и часам: во многих домах переезды разрешены только в будни и только до раннего вечера. Ставка от дня недели у нас не зависит вообще, но выбор даты диктует не наш календарь, а правила вашего дома. Уточните их до бронирования.',
    },
    {
      title: 'Старые дома у Three Islands Boulevard',
      body: 'Возле Three Islands и Golden Isles много кондо семидесятых-восьмидесятых: узкие подъезды, небольшие лифты, парковка, рассчитанная на легковые машины. Крупная мебель в такой лифт не входит и идёт по лестнице, а это время. Отдельного сбора за лестницы у нас нет — просто в смете на такой адрес мы закладываем на час больше, чем на новую башню.',
    },
    {
      title: 'Сезонные квартиры и высокий сезон',
      body: 'Зимой в Халландейле заметно прибавляется жильцов, и окна лифтов в прибрежных домах занимают заранее. Цена от сезона не меняется: доплат за декабрь, январь или март у нас не существует. Но чем ближе к дате вы звоните, тем меньше выбор часов, а неудобное окно почти всегда означает лишнее время в счёте.',
    },
  ],
  faqs: [
    {
      q: 'Правда ли, что близость вашей базы что-то меняет в цене?',
      a: 'Да, и вполне конкретно. Дорога бригады — это оплачиваемые часы, а от двора на Stirling Road до Халландейл-Бич около трёх миль. На небольшом переезде, который укладывается в три часа минимума, это разница между тем, чтобы уложиться, и тем, чтобы выйти за минимум. Никакого отдельного сбора за выезд, топливо или пробег при этом нет.',
    },
    {
      q: 'Мой дом разрешает переезды только в будни. Это дороже?',
      a: 'Нет. Ставка в понедельник и в субботу одна и та же: $129 за двоих, $179 за троих. Доплат за выходные, праздники и вечерние часы у нас нет в принципе. Ограничение по дням — это правило вашей ассоциации, а не наш прайс. Мы просто просим уточнить разрешённые часы заранее, чтобы поставить бригаду внутрь этого окна.',
    },
    {
      q: 'Чем переезд в башне на A1A отличается по деньгам от кондо западнее Federal?',
      a: 'Ставка одинаковая, отличаются часы. В океанской башне добавляются заявка на лифт, служебный вход и пронос через лобби — обычно час-полтора сверху на тот же объём вещей. В невысоком кондо западнее Federal трак часто встаёт близко к подъезду, и переезд с одной спальней реально заканчивается по минимальному счёту в $516. Если башня даёт короткое окно лифта, мы предлагаем троих по $179 в час: втроём работа помещается в окно, и итог обычно ниже, чем у двоих с переносом остатка.',
    },
    {
      q: 'Какой минимальный счёт и из чего он складывается?',
      a: 'Из трёх часов минимума и трака за день по ставке бригады. Двое грузчиков — $516, трое — $716, четверо — $876. Всё, что дольше минимума, считается шагами по 15 минут, и вы платите за фактическое время. Никаких сборов за лифт, лестницы, тяжёлые вещи или длинный пронос сверху не появляется: это время, а не отдельные строки.',
    },
    {
      q: 'Можно заказать только упаковку, без перевозки?',
      a: 'Да. Упаковка — от $79 в час за двух упаковщиков, готовый пакет для студии — от $237. Люди в Халландейле часто берут упаковку отдельно перед приездом контейнера или перед отъездом на лето. Посуду, стекло и картины пакуем в бумагу и коробки с перегородками. Если потом понадобится и перевозка, часы бригады считаются обычным порядком.',
    },
    {
      q: 'Насколько заранее нужно бронировать дату?',
      a: 'В межсезонье хватает нескольких дней, зимой лучше за одну-две недели, потому что окна грузовых лифтов в прибрежных домах разбирают заранее. Депозита мы не берём, поэтому забронировать дату ничего не стоит, а отменить её можно бесплатно за 48 часов и больше. Раннее бронирование в Халландейле экономит не деньги за дату, а часы в день переезда.',
    },
  ],
},
{
  slug: 'ru/moving-cost-hollywood',
  cityName: 'Hollywood',
  cityNameRu: 'Голливуд',
  citySlug: 'ru/hollywood-movers',
  metaDescription: 'Сколько стоит переезд в Голливуде, Флорида: $129/час за двоих, $179 за троих, минимум 3 часа, трак за день. Наш двор на Stirling Rd. Звоните 786-305-1844.',
  answer: 'Переезд в Голливуде стоит $129 в час за двух грузчиков или $179 за трёх, минимум 3 часа, плюс трак за день по ставке бригады. Голливуд — наша домашняя база: двор с траками стоит на Stirling Road, поэтому выезд к местному адресу здесь самый короткий, а дорога бригады оплачивается как рабочее время. Дом на материке, в Hollywood Hills или Emerald Hills, грузится прямо от двери и часто заканчивается по минимальному счёту в $516. Квартира в башне у Broadwalk добавляет лифт, служебный вход и пронос через лобби — обычно час-полтора сверху.',
  intro: 'Голливуд — город, где стоит наш двор, и прайс здесь тот же, что везде: двое грузчиков $129 в час, трое $179, четверо $219, минимум три часа, дальше по 15 минут. Трак — отдельной строкой, за день, по ставке бригады. Ни выходные, ни сезон, ни топливо цену не двигают; нет и сборов за лестницы, лифт, длинный пронос или тяжёлые вещи, потому что всё это просто время, уже посчитанное в часах. Лицензированные муверы в этом районе обычно берут $100–180 в час за бригаду из двух человек, так что $129 — середина рынка, а не демпинг. Экономия в Голливуде приходит с другой стороны: до вашего адреса нам ехать несколько минут.',
  accessFactors: [
    {
      title: 'Двор на Stirling Road — самый короткий выезд',
      body: 'Наши траки стоят на Stirling Road, в самом Голливуде. Подача машины к местному адресу занимает минуты, и это единственный город, где дорога бригады почти не участвует в счёте. На переездах внутри города — из квартиры у Young Circle в дом в Emerald Hills — люди чаще всего платят ровно минимум, потому что вся работа помещается в три часа.',
    },
    {
      title: 'Дома на материке грузятся от двери',
      body: 'В Hollywood Hills, Emerald Hills и Hollywood Lakes трак встаёт на драйвэй, и между дверью и машиной десять шагов. Ни лифта, ни заявки менеджменту, ни защиты лобби. Дом с двумя спальнями и обычной мебелью в таких кварталах, как правило, укладывается в четыре-пять часов вдвоём, то есть в $645–$774 вместе с траком.',
    },
    {
      title: 'Башни у Broadwalk и океана',
      body: 'На пляжной стороне картина другая: высотки вдоль Ocean Drive и у Broadwalk выдают грузовой лифт по заявке, парковка узкая, а зону погрузки делят с доставкой. Отдельной платы за это не появляется, но подача трака и каждая ходка становятся длиннее. Мы уточняем у менеджмента часы и место погрузки заранее, чтобы не искать их в день переезда.',
    },
    {
      title: 'Старые дома без лифта у Young Circle',
      body: 'В кварталах вокруг Young Circle и по Hollywood Boulevard много двух- и трёхэтажных домов тридцатых-шестидесятых годов, где лифта нет вообще. Диван и матрас идут по узкой лестнице, иногда с разборкой на месте. Сбора за лестницы у нас нет — это часы. На третий этаж без лифта мы обычно закладываем от сорока минут до часа сверху.',
    },
    {
      title: 'Правила ассоциаций на пляжной стороне',
      body: 'Многие прибрежные дома в Голливуде разрешают переезды только в определённые дни и часы и просят страховой сертификат до заезда бригады. COI мы делаем бесплатно в течение 24 часов после бронирования и отправляем в офис здания сами. Просите у менеджмента разрешённые часы до того, как выбирать дату — под них проще подстроить бригаду, чем наоборот.',
    },
  ],
  faqs: [
    {
      q: 'Почему переезд внутри Голливуда так часто выходит по минимальному счёту?',
      a: 'Потому что здесь складываются две вещи: наш двор в этом же городе и короткие расстояния между адресами. Дорога считается часами, и когда она занимает минуты, почти всё время уходит на саму работу. Студия или квартира с одной спальней с обычным доступом реально заканчивается за три часа — $516 за двоих вместе с траком.',
    },
    {
      q: 'Что дороже: дом на материке или квартира на пляже?',
      a: 'При одинаковом объёме вещей — квартира на пляже, но не из-за ставки, а из-за доступа. Дом грузится от драйвэя, а в башне у океана добавляются заявка на лифт, служебный вход, защита лобби и более длинный путь до трака. Разница обычно от часа до двух, то есть $129–$258 при бригаде из двух человек.',
    },
    {
      q: 'Как быть с парковкой трака на Hollywood Beach?',
      a: 'Улицы у Broadwalk узкие, и мест под погрузку немного, поэтому мы заранее спрашиваем у менеджмента здания, где разрешено вставать и в какие часы там свободнее. Как правило, ранний старт решает вопрос: до девяти утра машину поставить проще, а к полудню приходится ждать. Ожидание — это оплаченное время, и мы стараемся его не создавать.',
    },
    {
      q: 'У меня третий этаж без лифта. Будет доплата за лестницы?',
      a: 'Нет. Отдельных сборов за лестницы, этажность, тяжёлые вещи и длинный пронос у нас не бывает — всё это входит в почасовую работу. Лестница влияет только на количество часов: подъём на третий этаж без лифта обычно добавляет от сорока минут до часа на квартиру с одной спальней. Мы говорим об этом в смете заранее, а не после переезда.',
    },
    {
      q: 'Вы перевозите вещи из Голливуда в другой штат?',
      a: 'Нет. Мы локальная компания и работаем в Miami-Dade, Broward и Palm Beach. Перевозка вещей через границу штата требует федерального разрешения, которого у нас нет, поэтому такие заказы мы не считаем и не берём. Позвоните всё равно на 786-305-1844 — подскажем лицензированного перевозчика. За нами при этом остаётся упаковка и локальный переезд на флоридской стороне, например на склад.',
    },
    {
      q: 'Можно ли оставить вещи на хранение между двумя датами?',
      a: 'Да, хранение — от $200 в месяц. Такая схема часто нужна, когда закрытие сделки по новому дому сдвигается на неделю-другую, а из старого выезжать надо уже сейчас. Вывоз считается по обычным часам, потом вещи стоят у нас, потом заносим их на новый адрес — снова по часам, по той же ставке. Депозит не требуется ни за переезд, ни за бронирование даты доставки.',
    },
  ],
},
{
  slug: 'ru/moving-cost-miami',
  cityName: 'Miami',
  cityNameRu: 'Майами',
  citySlug: 'ru/miami-movers',
  metaDescription: 'Сколько стоит переезд в Майами: $129/час за двух грузчиков, $179 за трёх, минимум 3 часа, трак за день, COI бесплатно за 24 часа. Звоните 786-305-1844.',
  answer: 'Переезд в Майами стоит $129 в час за двух грузчиков или $179 за трёх, минимум 3 часа, плюс трак за день по ставке бригады. Город большой и неоднородный: в Brickell всё упирается в док и страховой сертификат, в лофтах Wynwood и Edgewater — в один общий лифт на здание, в Коконат-Гроув — в узкие улицы, куда большой трак не заходит. Плюс дорога: I-95 и US-1 в час пик добавляют время, а время в почасовой смете и есть деньги. Двухкомнатная квартира в Майами обычно выходит в $645–$1,253.',
  intro: 'Ставки в Майами не зависят ни от района, ни от дня недели: двое грузчиков — $129 в час, трое — $179, четверо — $219, минимум три часа, дальше шагами по 15 минут. Трак идёт отдельной строкой в смете, за день, по той же цифре, что и бригада. Минимальный счёт — $516. Лицензированные муверы в этом районе обычно берут $100–180 в час за бригаду из двух человек, так что вопрос при выборе почти никогда не в ставке, а в том, насколько честно посчитаны часы. В Майами их определяют три вещи: док и правила здания, ширина улицы у подъезда и время суток, на которое назначен старт.',
  accessFactors: [
    {
      title: 'Brickell: док, заявка и страховой сертификат',
      body: 'Башни Brickell и Downtown принимают переезды через загрузочный док по предварительной заявке, с окном грузового лифта на несколько часов. Во многих зданиях требуют лимиты в диапазоне $1–2 млн — точные требования вашего дома уточняем заранее и отправляем COI в менеджмент сами, бесплатно, в течение 24 часов после бронирования. Без сертификата бригаду просто не пустят в док.',
    },
    {
      title: 'Лофты Wynwood и Edgewater',
      body: 'В переделанных лофтах и новых домах Wynwood и Edgewater лифт часто один и общий: им пользуются и жильцы, и доставка. В час пик по вечерам ожидание лифта становится реальной статьёй времени. Мы стараемся ставить такие адреса на утро и, если квартира большая, берём третьего грузчика, чтобы сократить количество ходок.',
    },
    {
      title: 'Узкие улицы Коконат-Гроув',
      body: 'В Гроуве много улиц с деревьями над проезжей частью и без места для разворота, куда 26-футовый трак заходить не должен. Тогда работаем машиной поменьше, а на большой дом это означает две ходки. Мы проверяем подъезд по видео до того, как назначить трак, потому что выяснять это на месте — самый дорогой способ узнать.',
    },
    {
      title: 'Трафик I-95 и US-1',
      body: 'Дорога бригады между адресами входит в почасовую работу, отдельного сбора за пробег и топливо нет. Но переезд из Brickell в Кендалл в пять вечера физически занимает вдвое больше времени, чем в девять утра. Поэтому в Майами мы почти всегда предлагаем ранний старт: это единственный рычаг, которым клиент реально уменьшает свой счёт.',
    },
    {
      title: 'Дома в западных районах',
      body: 'В Дорале, Кендалле и Вест-Майами преобладают дома и таунхаусы с драйвэем: трак встаёт у двери, лифта нет, никаких заявок в менеджмент. Это самые предсказуемые переезды в городе — дом с двумя спальнями обычно заканчивается за четыре-пять часов вдвоём. Основная переменная там не доступ, а расстояние до нового адреса.',
    },
    {
      title: 'Парковка в Downtown и на Brickell Avenue',
      body: 'Если у здания нет дока, трак приходится ставить у бордюра на оживлённой улице, а вещи вести через лобби. Это добавляет минуты к каждой ходке и требует защиты полов. Сбора за это нет, но на квартиру с двумя спальнями такой сценарий обычно даёт лишний час по сравнению с нормальной погрузкой из дока.',
    },
  ],
  faqs: [
    {
      q: 'Что нужно от здания в Brickell, чтобы бригада начала работу вовремя?',
      a: 'Три вещи: заявка на переезд, окно грузового лифта или дока на конкретные часы и страховой сертификат по форме управляющей компании. Сертификат делаем мы, бесплатно и за 24 часа после бронирования, и отправляем в офис здания напрямую. Заявку подаёт жилец. Если чего-то из этого нет, трак стоит у дока, а часы идут.',
    },
    {
      q: 'В Коконат-Гроув к дому не подъедет большая машина. Что тогда?',
      a: 'Отправим трак меньшего размера и заложим в смету дополнительную ходку, если объём вещей в один рейс не помещается. Это честнее, чем пообещать одну поездку и застрять на повороте. Размер машины мы выбираем после короткого видео улицы и подъезда — обычно это две минуты вашего времени и минус час неожиданностей в день переезда.',
    },
    {
      q: 'Почему вы предлагаете начинать в восемь утра, а не после обеда?',
      a: 'Из-за трафика и лифтов. Дорога бригады оплачивается как часы, а I-95 и US-1 после четырёх едут вдвое медленнее. Плюс окна грузовых лифтов чаще дают в первой половине дня. Ранний старт в Майами — самый простой способ уменьшить итоговый счёт, и он не стоит ничего: ставка от времени суток у нас не меняется.',
    },
    {
      q: 'Сколько стоит переезд квартиры с двумя спальнями в Майами?',
      a: 'Обычно $645–$1,253 вместе с траком. Нижняя граница — таунхаус или невысокий дом с погрузкой от двери, верхняя — башня с доком, окном лифта и дорогой через полгорода. Разницу создают часы, а не тариф. Точнее всего считать по видео квартиры: пришлите его на WhatsApp 786-305-1844, и вы получите оценку часов, а не диапазон наугад.',
    },
    {
      q: 'Сколько стоит упаковка вещей?',
      a: 'От $79 в час за двух упаковщиков; готовый пакет для студии — от $237. Упаковку можно заказать без перевозки или взять частичную: например, только кухню, стекло и картины, а одежду и книги собрать самим. Часы упаковки в день переезда идут отдельной строкой от часов бригады, чтобы в смете было видно, за что вы платите.',
    },
    {
      q: 'А если я переезжаю из Майами в другой штат?',
      a: 'Нет. Мы локальная компания и работаем в Miami-Dade, Broward и Palm Beach. Перевозка вещей через границу штата требует федерального разрешения, которого у нас нет, поэтому такие заказы мы не считаем и не берём. Позвоните всё равно на 786-305-1844 — подскажем лицензированного перевозчика. За нами при этом остаётся упаковка и локальный переезд на флоридской стороне, например на склад.',
    },
  ],
},
{
  slug: 'ru/moving-cost-fort-lauderdale',
  cityName: 'Fort Lauderdale',
  cityNameRu: 'Форт-Лодердейл',
  citySlug: 'ru/fort-lauderdale-movers',
  metaDescription: 'Цены на переезд в Форт-Лодердейле: $129/час за двоих грузчиков, $179 за троих, минимум 3 часа, трак за день. Без доплат за выходные. Звоните 786-305-1844.',
  answer: 'Переезд в Форт-Лодердейле стоит $129 в час за двух грузчиков или $179 за трёх, минимум 3 часа, плюс трак за день по ставке бригады. Часы здесь диктует вода. На канальных улицах Las Olas Isles и Rio Vista разворота для 26-футового трака нет, и работать приходится 16-футовой машиной, а значит иногда в две ходки. У башен на Las Olas и в даунтауне переезд идёт через док по забронированному окну. А разводные мосты умеют съесть пятнадцать минут у гружёной машины прямо посреди маршрута.',
  intro: 'Прайс в Форт-Лодердейле такой же, как по всей Южной Флориде: двое грузчиков — $129 в час, трое — $179, четверо — $219, минимум три часа, дальше по 15 минут. Трак — отдельной строкой в смете, за день, по ставке бригады. Минимальный счёт: $516 вдвоём, $716 втроём, $876 вчетвером. Депозита нет, отмена более чем за 48 часов бесплатная. Доплат за субботу, за высокий сезон и за топливо нет, как нет и сборов за лифт, лестницы и тяжёлые вещи — это время, уже заложенное в оценку часов. Поэтому смета в Форт-Лодердейле начинается не с прайса, а с двух вопросов: какая машина заедет к вашему подъезду и в какое окно вас пускает здание.',
  accessFactors: [
    {
      title: 'Канальные улицы и размер трака',
      body: 'На узких улицах островов у Las Olas и в Rio Vista тупики и повороты рассчитаны на легковые машины: 26-футовый трак туда заходить не должен. Мы отправляем 16-футовый и, если объём вещей в него не помещается, планируем вторую ходку заранее. Ходка — это реальные часы, и их лучше видеть в смете, чем в финальном счёте.',
    },
    {
      title: 'Доки башен Las Olas и даунтауна',
      body: 'Высотки в центре и вдоль Las Olas Boulevard принимают переезды через загрузочный док, обычно на два-четыре часа. Если окно короткое, а квартира большая, бригада из трёх человек за $179 в час чаще всего выходит дешевле, чем двое, которым не хватило времени и пришлось переносить остаток на другой день.',
    },
    {
      title: 'Разводные мосты на маршруте',
      body: 'Мосты на Las Olas и на Третьей авеню разводят по расписанию для лодок, и гружёный трак, попавший на развод, просто стоит — на оплаченном времени. Мы строим маршрут и время старта с учётом расписания мостов. Это мелочь, но почасовой счёт из таких мелочей и складывается, и местная бригада экономит их автоматически.',
    },
    {
      title: 'Низкие гаражи прибрежных домов на A1A',
      body: 'Под старыми домами вдоль A1A высота проезда часто не пускает никакой грузовой транспорт. Тогда машина встаёт у бордюра, а вещи идут через лобби и лифт. Отдельной платы за длинный пронос у нас нет, но каждая ходка растягивается, и на квартире с двумя спальнями это заметная прибавка ко времени.',
    },
    {
      title: 'Дома в Victoria Park и Coral Ridge',
      body: 'Дом с драйвэем — самый быстрый и самый дешёвый сценарий в городе: трак у двери, лифта нет, менеджменту заявок подавать не нужно. В Victoria Park, Coral Ridge и Tarpon River дом с двумя спальнями обычно заканчивается за четыре-пять часов бригадой из двух человек, то есть в районе $645–$774 вместе с траком.',
    },
  ],
  faqs: [
    {
      q: 'Как узнать, заедет ли к моему дому большой трак?',
      a: 'Мы смотрим улицу и подъезд по видео или по карте до того, как назначить машину. На канальных улицах у Las Olas почти всегда идёт 16-футовый трак, и если вещей больше, чем в него помещается, вторая ходка попадает в смету сразу. Выяснять размер проезда на месте — самый быстрый способ превратить трёхчасовой переезд в шестичасовой.',
    },
    {
      q: 'Насколько дороже переезд в башне на Las Olas, чем в доме?',
      a: 'Ставка одинаковая, разница в часах. Док, окно лифта, защита лобби и путь от квартиры до машины обычно добавляют от часа до двух на тот же объём вещей — это $129–$258 при двух грузчиках. Мы уменьшаем эту разницу тем, что бронируем окно и отправляем страховой сертификат заранее, а не в день переезда.',
    },
    {
      q: 'Разводные мосты действительно влияют на счёт?',
      a: 'На отдельно взятом переезде это десять-пятнадцать минут, но они оплачиваются как рабочее время, поэтому мы стараемся их не собирать. При переезде между пляжной стороной и материком маршрут и час старта выбираются по расписанию мостов. Специальных доплат за это нет ни у нас, ни у кого-либо ещё — просто одни бригады про мосты знают, а другие нет.',
    },
    {
      q: 'Вы считаете по часам или фиксированной суммой?',
      a: 'Локальные переезды в Форт-Лодердейле — по часам, потому что здесь всё решает доступ, и честно посчитать его можно только временем. В обоих случаях вы видите арифметику до того, как что-то подтверждаете.',
    },
    {
      q: 'Что входит в почасовую ставку?',
      a: 'Бригада, трак, топливо, платные дороги и пробег, одеяла и стретч-плёнка для мебели, разборка и сборка кроватей, столов и шкафов, защита полов на входе, а также дорога между адресами. Сверху появляются только упаковочные материалы, если мы пакуем ваши вещи, и хранение, если оно нужно. Сборов за лифт, лестницы, длинный пронос и тяжёлые предметы не бывает вообще: это часы, а не отдельные строки в счёте.',
    },
    {
      q: 'Можно ли забронировать дату, не платя вперёд?',
      a: 'Да, депозита мы не берём вообще: оплата идёт после работы, по факту отработанных часов, шагами по 15 минут после трёхчасового минимума. Отмена более чем за 48 часов бесплатная, перенос даты тоже. Это удобно в сезон, когда сроки закрытия сделки или заезда в кондо плавают, и вы не хотите привязывать деньги к дате, которая ещё может сдвинуться на неделю.',
    },
  ],
},
{
  slug: 'ru/moving-cost-miami-beach',
  cityName: 'Miami Beach',
  cityNameRu: 'Майами-Бич',
  citySlug: 'ru/miami-beach-movers',
  metaDescription: 'Сколько стоит переезд в Майами-Бич: $129/час за двоих грузчиков, $179 за троих, минимум 3 часа, трак за день, COI бесплатно за 24 часа. WhatsApp 786-305-1844.',
  answer: 'Переезд в Майами-Бич стоит $129 в час за двух грузчиков или $179 за трёх, минимум 3 часа, плюс трак за день по ставке бригады. Остров добавляет к работе две вещи, которых нет на материке: место для трака, которое на многих улицах нужно оформлять через город заранее, и дамбы — весь въезд и выезд идёт через несколько мостов, а дорога бригады оплачивается как часы. Дальше всё зависит от дома: в ар-деко зданиях Саут-Бич лифта часто нет вовсе, а в новых башнях у Sunset Harbour работа идёт через док по расписанию.',
  intro: 'В Майами-Бич действуют те же ставки, что и везде: $129 в час за двух грузчиков, $179 за трёх, $219 за четырёх, минимум три часа, потом шагами по 15 минут. Трак стоит в смете своей строкой и считается за день по той же цифре, что и бригада. Никаких надбавок за остров, за выходной день, за сезон или за топливо. Лицензированные муверы в этом районе обычно берут $100–180 в час за бригаду из двух человек, и разница между ними чаще всего не в цифре, а в том, кто заранее разобрался с парковкой и правилами дома. Именно на этом в Майами-Бич выигрываются или теряются часы, из которых потом складывается ваш счёт.',
  accessFactors: [
    {
      title: 'Место для трака и городские правила',
      body: 'На многих улицах Майами-Бич стоянка размечена под легковые машины, и для трака, как правило, нужно заранее оформлять место у города или заезжать во двор здания. Мы уточняем правила по вашему адресу до дня переезда. Машина, которая кружит в поисках места, стоит вам ровно столько же, сколько машина, которая грузится.',
    },
    {
      title: 'Дамбы и время въезда на остров',
      body: 'Попасть на остров можно только по дамбам — Julia Tuttle, MacArthur, Venetian, — и в час пик они стоят. Дорога бригады входит в почасовую работу, отдельного сбора за пробег нет, поэтому единственный способ не платить за пробки — начинать рано. Утренний старт в Майами-Бич обычно экономит больше, чем любые торги о ставке.',
    },
    {
      title: 'Ар-деко дома без лифта в Саут-Бич',
      body: 'В историческом квартале много трёх- и четырёхэтажных домов тридцатых годов, где лифта нет и не будет: лестницы узкие, площадки маленькие, крупную мебель иногда приходится разбирать на месте. Сбора за лестницы у нас нет, это часы. На квартиру с одной спальней на третьем этаже мы обычно закладываем около часа сверху.',
    },
    {
      title: 'Новые башни South of Fifth и Sunset Harbour',
      body: 'В современных домах на юге острова и у Sunset Harbour всё наоборот: есть док, грузовой лифт и понятная процедура. Взамен появляется расписание — окно на несколько часов, заявка в менеджмент и страховой сертификат до заезда. COI мы делаем бесплатно за 24 часа после бронирования и отправляем управляющей компании сами.',
    },
    {
      title: 'Переулки и погрузка со двора',
      body: 'У части зданий в Саут-Бич и Мид-Бич погрузка идёт из служебного переулка позади дома, а не с фасада. Переулки узкие, их делят с мусоровозами и поставщиками ресторанов, и утром там свободнее всего. Мы заранее выясняем, откуда именно заносят вещи, потому что путь от машины до двери — это половина всех часов в смете.',
    },
    {
      title: 'Ограничения по высоте в подземных паркингах',
      body: 'Под многими домами острова паркинг с низким проездом, куда грузовая машина не заходит. Тогда трак остаётся снаружи, а вещи едут на тележках через лобби и лифт. Доплаты за это не появляется, но количество ходок и их длина растут. Мы говорим об этом на этапе сметы, чтобы итог не отличался от ожиданий.',
    },
  ],
  faqs: [
    {
      q: 'Нужно ли оформлять разрешение на парковку трака в Майами-Бич?',
      a: 'На многих улицах — да, место для грузовой машины оформляется через город заранее, и правила отличаются по районам. Мы проверяем ваш адрес до дня переезда и говорим, что именно потребуется: разрешение, заезд во двор или согласование с менеджментом здания. Разбираться с этим утром в день переезда означает платить за время, пока трак ищет, где встать.',
    },
    {
      q: 'У меня третий этаж в ар-деко доме без лифта. Сколько это добавит?',
      a: 'Как правило, около часа на квартиру с одной спальней и полтора-два на две спальни. Отдельного сбора за лестницы нет: они влияют только на количество часов. Иногда быстрее выходит бригада из трёх человек по $179 в час, потому что на лестнице выигрывает не сила, а поток. Мы посчитаем оба варианта и покажем, какой дешевле.',
    },
    {
      q: 'Почему переезд с острова на материк дороже, чем внутри Майами-Бич?',
      a: 'Из-за дамб. Дорога бригады оплачивается как рабочее время, и переезд, скажем, в Брикелл в пять вечера может занять час только на дорогу, а в девять утра — двадцать минут. Никакого сбора за пересечение дамбы не существует, просто в почасовой смете дорога видна. Поэтому мы почти всегда ставим такие переезды на утро.',
    },
    {
      q: 'Есть ли доплата за выходные или за высокий сезон?',
      a: 'Нет. $129 за двоих в час — это и вторник в сентябре, и суббота в феврале, и день перед праздником. Топливного сбора, сезонной наценки и надбавки за остров у нас тоже нет. Меняется только количество часов, а его определяет доступ: лестница, лифт, расстояние до трака. Минимальный счёт при этом фиксирован: $516 за двоих, $716 за троих, $876 за четверых.',
    },
    {
      q: 'Можно ли оставить вещи на хранение, пока идёт ремонт квартиры?',
      a: 'Да, хранение — от $200 в месяц, отдельной строкой в смете. На острове это частая история: ремонт в кондо согласуют с ассоциацией, сроки плывут на недели, и вещам нужно где-то переждать. Вывоз и последующий занос считаются по обычным почасовым ставкам, минимум те же три часа. Депозита нет ни за перевозку, ни за бронирование даты доставки, а перенести её можно бесплатно за 48 часов.',
    },
    {
      q: 'Что будет со сметой, если переезд затянется дольше плана?',
      a: 'Вы платите за фактическое время: после трёх часов минимума счёт идёт шагами по 15 минут, без округления в большую сторону и без штрафов. Ставка вечером такая же, как утром. Чтобы плана и факта не разошлись, пришлите видео квартиры на WhatsApp 786-305-1844 — оценка по видео заметно точнее, чем по количеству комнат.',
    },
  ],
}
];

export const COST_PAGES_UA: CostPageData[] = [
{
  slug: 'ua/moving-cost-sunny-isles',
  cityName: 'Sunny Isles Beach',
  cityNameUa: 'Санні-Айлс-Біч',
  citySlug: 'ua/sunny-isles-movers',
  metaDescription: 'Скільки коштує переїзд у Санні-Айлс-Біч: двоє вантажників $129/год, трак окремим рядком, мінімум 3 години, COI безкоштовно, без депозиту. WhatsApp 786-305-1844.',
  answer: 'Переїзд у Санні-Айлс-Біч коштує $129 на годину за двох вантажників або $179 за трьох, мінімум 3 години, плюс трак за день за ставкою бригади. Головна змінна тут не тариф, а вантажний ліфт: у більшості веж на Collins Avenue він один на весь будинок і видається на обмежене вікно. Через це квартира з двома спальнями частіше виходить у верхній частині діапазону $645–$1,253, ніж у нижній. Мінімальний рахунок — $516 із двома вантажниками, $716 із трьома.',
  intro: 'Ціна переїзду в Санні-Айлс-Біч складається з двох рядків, і дрібного шрифту під ними немає. Перший рядок — бригада: двоє вантажників $129 за годину, троє $179, четверо $219. Другий — трак, який рахується за день за тією самою ставкою, що й бригада. Мінімум становить три години, далі час іде кроками по 15 хвилин, тож ви не платите за годину, яку не відпрацювали. Депозиту немає, скасування безкоштовне за 48 і більше годин, сертифікат страхування для менеджменту готуємо безкоштовно протягом доби після бронювання. Доплат за вихідні, сезон чи паливо не буває, як і зборів за сходи, ліфт або довге перенесення: усе це вимірюється годинами, а не окремими рядками в рахунку. Далі на сторінці — про те, що саме додає ці години у вежах на Collins Avenue.',
  accessFactors: [
    {
      title: 'Один вантажний ліфт на всю вежу',
      body: 'У більшості висоток на Collins Avenue вантажний ліфт лише один, і він обслуговує весь будинок. Менеджмент видає його на конкретне вікно, як правило на дві-чотири години. Якщо квартира не встигає в це вікно, наступний слот може бути аж наступного дня. Тому сюди ми частіше радимо трьох вантажників замість двох: година дорожча, зате переїзд закривається за один слот.',
    },
    {
      title: 'Черга на ліфт у високий сезон',
      body: 'З листопада по квітень будинки заповнені, і вікна на ліфт розбирають на тижні наперед. Ставка від сезону не змінюється — $129, $179 або $219 за годину залежно від бригади, цілий рік однаково. Змінюється вибір дати, а з ним і шанс поставити переїзд на спокійний ранок. Бронювання за два-три тижні наперед — найдешевший спосіб не платити за години очікування.',
    },
    {
      title: 'Куди поставити трак',
      body: 'Collins Avenue має по одній смузі в кожен бік і майже постійний рух, тож зупинка навпроти входу зазвичай неможлива. У частині веж є службовий заїзд із вантажною зоною, у частині — лише гостьовий паркінг з обмеженою висотою заїзду. Ми заздалегідь питаємо менеджмент про висоту й місце розвантаження та виїжджаємо траком, який туди справді поміститься.',
    },
    {
      title: 'Папери, які потрібні до початку',
      body: 'Перш ніж пустити бригаду в ліфт, будинок зазвичай просить сертифікат страхування і власний бланк заявки на переїзд. COI ми робимо безкоштовно протягом 24 годин після бронювання; у більшості будинків просять покриття в межах $1–2 млн — точні вимоги вашого менеджменту уточнюємо заздалегідь. Захист кабіни та підлоги бригада ставить сама, і окремим рядком це не рахується.',
    },
    {
      title: 'Довге перенесення — це години, а не збір',
      body: 'Від вантажної зони до дверей квартири в океанській вежі буває сотня метрів коридорів і два повороти. Окремої плати за це немає: у нас не існує зборів ані за поверх, ані за ліфт, ані за важкі речі. Але кожен поворот додає хвилини на кожному рейсі, і в підсумку це видно в годинах. Тому список великих меблів наперед робить кошторис точнішим.',
    },
  ],
  faqs: [
    {
      q: 'Скільки коштує переїзд студії в Санні-Айлс-Біч?',
      a: 'Типова студія тут виходить у межах $516–$645. Нижня межа — це мінімальні три години з двома вантажниками й траком; верхня набігає, коли ліфт дають із затримкою або від вантажної зони до квартири довгий шлях. Квартира з однією спальнею зазвичай лишається в діапазоні $516–$774. Точну цифру ми називаємо після короткого опису житла: надішліть у WhatsApp на 786-305-1844 перелік великих меблів.',
    },
    {
      q: 'Чому для вежі на Collins Avenue радите трьох вантажників, а не двох?',
      a: 'Тому що будинок дає ліфт на обмежений час, а не на цілий день. Троє вантажників коштують $179 за годину замість $129, але завантаження в один слот часто виходить дешевше, ніж двоє людей, які не встигли й мусять повертатися іншого дня — це друга подача трака й друга бронь ліфта. Ми рахуємо обидва варіанти в кошторисі, а вибір лишається за вами.',
    },
    {
      q: 'Хто домовляється про вантажний ліфт і готує COI?',
      a: 'Координатор із нашого боку. Після бронювання ми звʼязуємося з офісом будинку, надсилаємо сертифікат страхування протягом 24 годин і узгоджуємо вікно на ліфт та маршрут через службовий вхід. Від вас потрібні назва будинку, номер квартири й контакт менеджменту. Ця робота входить у вартість переїзду й не додає жодного рядка до рахунку.',
    },
    {
      q: 'Чи буде бригада говорити українською?',
      a: 'Приблизно кожен третій наш вантажник — україномовний, тож бригаду, яка говоритиме українською, зберемо за попереднім запитом; кошторис і листування ведемо російською або англійською. Скажіть про це під час бронювання, щоб ми врахували це у графіку зміни. Писати у WhatsApp українською можна вільно — вас зрозуміють, а відповідь прийде російською чи англійською.',
    },
    {
      q: 'Чи є доплата за високий поверх або вихідний день?',
      a: 'Ні. Ставка та сама в суботу, у свято й в останній день місяця, і вона не залежить від поверху. Ми не додаємо паливний збір, сезонний коефіцієнт чи плату за ліфт. Єдине, що змінює підсумок, — кількість відпрацьованих годин, а її ми намагаємося передбачити ще в письмовому кошторисі, щоб цифра в день переїзду збіглася з очікуваною.',
    },
    {
      q: 'Скільки коштує трак і чи потрібен депозит?',
      a: 'Трак іде окремим рядком за день, за тією самою ставкою, що й бригада: $129 при двох вантажниках, $179 при трьох, $219 при чотирьох. Окремої фіксованої ціни за трак у нас немає — вона завжди привʼязана до розміру бригади. Депозит не потрібен: дата бронюється без передоплати, розрахунок після роботи, скасування безкоштовне за 48 і більше годин.',
    },
  ],
},
{
  slug: 'ua/moving-cost-hallandale-beach',
  cityName: 'Hallandale Beach',
  cityNameUa: 'Халландейл-Біч',
  citySlug: 'ua/hallandale-beach-movers',
  metaDescription: 'Ціни на переїзд у Халландейл-Біч: бригада від $129/год, трак за ставкою бригади, мінімум 3 години, без депозиту й доплат. Телефон і WhatsApp 786-305-1844.',
  answer: 'Переїзд у Халландейл-Біч коштує $129 на годину за двох вантажників або $179 за трьох, мінімум 3 години, плюс трак за день за ставкою бригади. Наш двір стоїть на Stirling Road у Голлівуді, приблизно за три милі звідси, тож оплаченої дороги в кошторисі мінімум, а бригада заходить у підʼїзд до початку ранкового вікна. Далі підсумок залежить від будинку: океанська вежа забирає більше годин, ніж двоповерхове кондо в західній частині міста.',
  intro: 'Халландейл-Біч — найближче до нашої бази місто, і це видно в рахунку ще до того, як бригада візьме першу коробку. Ставки тут ті самі, що й скрізь: двоє вантажників $129 за годину, троє $179, четверо $219, трак окремим рядком за день за ставкою бригади, мінімум три години. Мінімальний рахунок виходить $516, $716 або $876 залежно від того, скільки людей працює. Різниця в тому, що дорога від двору до вашої адреси коротка, а короткий виїзд означає менше оплаченого часу в дорозі та реальний шанс почати рівно о девʼятій, коли асоціація відкриває вікно на переїзд. Далі все вирішує тип будинку — океанська вежа чи низьке кондо на заході.',
  accessFactors: [
    {
      title: 'Три милі від нашого двору',
      body: 'База Easy Move Florida на Stirling Road у Голлівуді стоїть приблизно за три милі від центру Халландейл-Біч. Це найкоротший виїзд у нашому списку міст: менше часу в дорозі означає менше оплачених годин, а ще майже нульовий ризик спізнитися на початок вікна, яке асоціація відкрила саме на ваш ранок. Для переїзду з мінімальними трьома годинами така економія помітна.',
    },
    {
      title: 'Океанські вежі проти західних кондо',
      body: 'Схід міста — це висотки біля води з вантажним ліфтом, вахтою й журналом заїзду. Захід — переважно дво- і триповерхові кондо без ліфта, де трак стає майже під дверима. Той самий обсяг речей у вежі забирає на годину-дві більше, ніж у низькому будинку, і саме тому дві однакові двокімнатні квартири в одному місті потрапляють у різні кінці діапазону $645–$1,253.',
    },
    {
      title: 'Будні вікна асоціацій',
      body: 'Чимало кондомініумів тут дозволяють переїзди лише в будні, як правило з девʼятої ранку до четвертої дня, і не пускають бригаду у вихідні. Ми не беремо доплати за жоден день тижня, тож будній переїзд не дорожчий — але дат менше, і найзручніші ранкові слоти забирають першими. Дізнаємося правила вашого будинку до бронювання, щоб не втратити день.',
    },
    {
      title: 'Ліфти в будинках старшого покоління',
      body: 'Частина прибережних будинків Халландейла збудована десятиліття тому: пасажирські кабіни там вузькі, а окремого вантажного ліфта може не бути взагалі. Дивани й матраци тоді йдуть сходами, а великі шафи розбираються на місці. Розбирання та збирання меблів входить у погодинну ставку бригади, окремої плати за це немає — але воно додає час, і ми закладаємо його в кошторис наперед.',
    },
    {
      title: 'Паркування і відстань до входу',
      body: 'У будинках уздовж води вантажна зона нерідко з протилежного від квартири боку, а гостьовий паркінг має обмеження по висоті заїзду. Ми питаємо менеджмент, де можна стати траком, ще на етапі кошторису. Якщо доводиться ставити машину далі й нести довше, ми пишемо це в кошторисі як додаткові години, а не як прихований збір, який зʼявиться в день переїзду.',
    },
  ],
  faqs: [
    {
      q: 'Чи дешевший переїзд у Халландейлі через близькість вашої бази?',
      a: 'Ставка однакова для всіх міст, але час у дорозі оплачується як частина роботи, і з трьох миль він мінімальний. На практиці це означає, що більша частина оплачених годин іде на речі, а не на трасу. Для короткого переїзду в межах міста це часто різниця між мінімальними трьома годинами й четвертою годиною, яку довелося б докласти.',
    },
    {
      q: 'Мій кондомініум дозволяє переїзди тільки в будні. Це дорожче?',
      a: 'Ні, у нас немає різниці в ціні між буднями й вихідними: $129, $179 або $219 за годину залежно від бригади в будь-який день. Будні обмеження впливають лише на календар — вільних дат менше, тому бронювати варто раніше. Ми узгоджуємо з менеджментом точне вікно й ставимо початок так, щоб вивантаження завершилося до його закриття.',
    },
    {
      q: 'У будинку немає вантажного ліфта, а квартира на третьому поверсі. Скільки додасться?',
      a: 'Окремої плати за сходи не існує, додається лише час. За нашим досвідом у низьких будинках Халландейла підйом на два-три поверхи додає приблизно годину до типової однокімнатної квартири, тобто рахунок частіше йде до $645–$774, ніж до мінімальних $516. Точніше скажемо, коли побачимо список великих меблів і зрозуміємо, що піде сходами.',
    },
    {
      q: 'Чи можу я спілкуватися з бригадою українською?',
      a: 'Так, якщо попередити при бронюванні. Україномовних вантажників у нас приблизно третина команди, тож на конкретну дату ми складаємо зміну так, щоб у вашій бригаді така людина була. Кошторис, узгодження дати й листування ведемо російською або англійською — це наша робоча мова в офісі. Ваші повідомлення українською читаємо без проблем.',
    },
    {
      q: 'Скільки коштує запакувати квартиру, а не лише перевезти?',
      a: 'Пакування рахується окремо: від $79 за годину за двох пакувальників, а готовий пакет для студії — від $237. Можна замовити повне пакування напередодні, а можна залишити нам тільки кухню й крихке, зібравши решту самостійно. Матеріали привозимо з собою. Найчастіше в Халландейлі беруть саме половинчастий варіант — він помітно скорочує години в день переїзду.',
    },
    {
      q: 'Ви возите з Халландейла в інші штати?',
      a: 'Так. Письмовий кошторис надсилаємо протягом 24 годин після опису вантажу, депозит не потрібен. Якщо дати виїзду й заїзду не збігаються, речі можна залишити на зберіганні — від $200 на місяць.',
    },
  ],
},
{
  slug: 'ua/moving-cost-hollywood',
  cityName: 'Hollywood',
  cityNameUa: 'Голлівуд',
  citySlug: 'ua/hollywood-movers',
  metaDescription: 'Скільки коштує переїзд у Голлівуді, Флорида: вантажники від $129/год, трак за ставкою бригади, мінімум 3 години. Наш двір на Stirling Rd. WhatsApp 786-305-1844.',
  answer: 'Переїзд у Голлівуді коштує $129 на годину за двох вантажників або $179 за трьох, мінімум 3 години, плюс трак за день за ставкою бригади. Голлівуд — наша домашня база: двір компанії стоїть на Stirling Road, тож подача трака сюди найкоротша з усіх міст, які ми обслуговуємо. Найбільша різниця в підсумку — між пляжною вежею біля Ocean Drive і будинком на материку з власним заїздом: перший варіант забирає години на ліфт і папери, другий вантажиться майже з порога.',
  intro: 'Голлівуд ми знаємо не з мапи: двір Easy Move Florida стоїть на Stirling Road, і більшість ранків бригада починає день саме звідси. Для вас це означає короткий виїзд, менше оплаченого часу в дорозі та можливість без нервів взяти ранній старт. Ціни ті самі, що й по всій Південній Флориді: двоє вантажників $129 за годину, троє $179, четверо $219; трак рахується за день за ставкою бригади; мінімум три години, потім кроки по 15 хвилин. Мінімальний рахунок — $516, $716 або $876. Депозиту немає, скасування безкоштовне за 48 і більше годин, COI для будинку — безкоштовно протягом доби. Власник компанії Євгеній Романов сам живе й працює в цьому місті.',
  accessFactors: [
    {
      title: 'Двір на Stirling Road',
      body: 'Найдорожчі години в будь-якому переїзді — ті, за які нічого не перенесено. У Голлівуді їх найменше просто тому, що трак виїжджає з двору на Stirling Road і за кілька хвилин уже стоїть біля вашого будинку. Це також означає, що коли в день переїзду раптово потрібні додаткові матеріали чи інший інструмент, ми привозимо їх без втрати години.',
    },
    {
      title: 'Пляжні вежі проти будинків на материку',
      body: 'Кондомініум біля Ocean Drive або на Hollywood Beach працює за правилами висотки: бронь вантажного ліфта, сертифікат страхування, журнал на рецепції, обмежені години. Будинок у Hollywood Hills або Emerald Hills вантажиться з власного заїзду без жодних погоджень. Той самий обсяг речей у цих двох випадках відрізняється на одну-дві оплачені години, і саме це рухає підсумок усередині діапазону.',
    },
    {
      title: 'Історичні вулиці й розмір трака',
      body: 'У Hollywood Lakes та навколо старого центру вулиці вужчі, дерева нависають низько, а місця для розвороту біля будинку часто немає. Іноді туди йде менший трак, і тоді великий будинок потребує другого рейсу. Ми питаємо про ширину вулиці й заїзд ще на етапі кошторису, щоб не витрачати першу годину переїзду на пошук місця для машини.',
    },
    {
      title: 'Мости через Intracoastal',
      body: 'Дорога з материкової частини на пляж іде через мости, які розводять для човнів за розкладом. Завантажений трак, що стоїть перед розведеним мостом, стоїть на оплаченому часі. Ми плануємо маршрут і час старту з урахуванням цього, і зазвичай це питання пʼятнадцяти хвилин, а не години — але саме такі дрібниці відрізняють місцеву бригаду від приїжджої.',
    },
    {
      title: 'Зберігання поруч із вашим будинком',
      body: 'Коли дати виїзду й заїзду не збігаються, речі не мусять їхати через півштату: зберігання починається від $200 на місяць, а склад розташований поруч. Завантаження на зберігання рахується як звичайні години бригади, без окремого збору за занос. Це частий сценарій у Голлівуді, коли продаж однієї квартири закривається раніше, ніж передають ключі від наступної.',
    },
  ],
  faqs: [
    {
      q: 'Скільки коштує переїзд у межах Голлівуда з двома спальнями?',
      a: 'Найчастіше це $645–$1,253. Квартира на материку з ліфтом і близьким паркуванням тяжіє до нижньої межі; будинок із меблями на два поверхи або пляжна вежа з вікном на ліфт — до верхньої. Мінімальний рахунок у будь-якому випадку $516 із двома вантажниками. Надішліть у WhatsApp на 786-305-1844 список великих меблів, і ми повернемося з письмовим кошторисом.',
    },
    {
      q: 'Ваш двір справді в Голлівуді?',
      a: 'Так, на Stirling Road. Це не адреса для листів, а місце, звідки виїжджають траки. Практична різниця для клієнта з Голлівуда — коротка подача, менше оплаченого часу в дорозі та реальна можливість почати о восьмій ранку. Для сусідніх міст на кшталт Халландейл-Біч чи Авентури виїзд теж короткий, але Голлівуд у цьому сенсі перший у черзі.',
    },
    {
      q: 'Переїзд із пляжної вежі дорожчий, ніж із будинку?',
      a: 'Ставка та сама, різниця тільки в годинах. У вежі на Hollywood Beach зазвичай потрібні бронь ліфта, COI і робота через службовий вхід; це додає час на початку і в кінці дня. Будинок на материку часто закривається за мінімальні три-чотири години. Ми пишемо очікувану кількість годин у кошторисі до бронювання, щоб різниця не стала несподіванкою.',
    },
    {
      q: 'Чи є у вас україномовні працівники?',
      a: 'Є: приблизно кожен третій вантажник розмовляє українською. Якщо ви скажете про це при бронюванні, ми поставимо на вашу дату саме таку бригаду — тоді в день переїзду все спілкування на місці буде українською. Офісна частина, тобто кошторис, узгодження й переписка, іде російською або англійською. Обіцяти повністю україномовне обслуговування від дзвінка до підпису ми не станемо.',
    },
    {
      q: 'Що входить у мінімальні три години?',
      a: 'Робота бригади на обʼєкті: захист підлоги й дверей, розбирання меблів, пакування великих речей у ковдри, завантаження, перевезення, вивантаження і збирання меблів на новому місці. Трак — окремий рядок за день за ставкою бригади. Після трьох годин час рахується кроками по 15 хвилин, тож зайві чверть години не перетворюються на повну годину в рахунку.',
    },
    {
      q: 'Можна залишити речі на зберіганні між двома датами?',
      a: 'Так. Зберігання коштує від $200 на місяць, склад поруч із базою, речі приймаються та видаються тією ж бригадою. Завантаження й вивантаження на складі оплачуються як звичайні години. Такий варіант часто дешевший, ніж орендувати житло на тиждень або платити за терміновий переїзд у незручну дату, коли будинок дає вікно тільки в конкретний день.',
    },
  ],
},
{
  slug: 'ua/moving-cost-miami',
  cityName: 'Miami',
  cityNameUa: 'Маямі',
  citySlug: 'ua/miami-movers',
  metaDescription: 'Ціни на переїзд у Маямі: двоє вантажників $129/год, троє $179/год, трак окремим рядком, мінімум 3 години, без депозиту й доплат. WhatsApp 786-305-1844.',
  answer: 'Переїзд у Маямі коштує $129 на годину за двох вантажників або $179 за трьох, мінімум 3 години, плюс трак за день за ставкою бригади. У Маямі підсумок майже завжди вирішує не квартира, а адреса: док у Brickell із бронюванням і сертифікатом страхування, спільний ліфт у лофті Wynwood, вузька вулиця в Коконат-Ґроуві. Додайте до цього дорогу по I-95 чи US-1 у годину пік — і однакові квартири з двома спальнями розходяться від $645 до $1,253.',
  intro: 'У Маямі найважче не перевезти речі, а потрапити до них. Тому ціна тут читається з двох рядків, а планується з третього — годин. Бригада коштує $129 за годину за двох, $179 за трьох, $219 за чотирьох; трак іде окремим рядком за день за тією ж ставкою; мінімум три години, тобто $516, $716 або $876. Далі все залежить від будинку: скільки триває бронь дока, чи один ліфт на весь поверх, чи стане трак ближче, ніж за квартал. Сертифікат страхування для менеджменту ми робимо безкоштовно протягом доби після бронювання, депозит не потрібен, скасування безкоштовне за 48 і більше годин. Доплат за вихідні, свята чи паливо в нас немає.',
  accessFactors: [
    {
      title: 'Доки Brickell і бронювання часу',
      body: 'У вежах Brickell розвантаження зазвичай можливе тільки через призначений док, який бронюють заздалегідь на кілька годин. До цього менеджмент вимагає сертифікат страхування; у більшості будинків просять покриття в межах $1–2 млн — точні вимоги вашого менеджменту уточнюємо заздалегідь. COI ми готуємо безкоштовно за 24 години після бронювання, тож паперова частина не зʼїдає день переїзду.',
    },
    {
      title: 'Лофти Wynwood зі спільними ліфтами',
      body: 'Перероблені склади й нові будинки Wynwood часто мають один ліфт на всіх мешканців, а деякі поверхи взагалі обслуговуються лише сходами. Високі стелі означають громіздкі меблі й високі шафи, які треба розбирати. Плати за сходи чи ліфт у нас немає, але саме тут години ростуть найшвидше, тому ми зазвичай пропонуємо трьох вантажників замість двох.',
    },
    {
      title: 'Вузькі вулиці Коконат-Ґроуву',
      body: 'У Ґроуві багато вулиць із низько навислими деревами, без узбіччя й без місця для розвороту великого трака. Іноді доводиться ставити машину на сусідній вулиці й нести довше, іноді — приїжджати меншим траком і робити другий рейс. Ми зʼясовуємо це до дня переїзду, бо різниця між одним і двома рейсами — це кілька оплачених годин.',
    },
    {
      title: 'Трафік на I-95 і US-1',
      body: 'Час у дорозі — частина оплаченої роботи, а в Маямі він залежить від годинника більше, ніж від відстані. Той самий маршрут між Brickell і Доралем удень і в годину пік відрізняється вдвічі. Тому ми ставимо початок якомога раніше і плануємо рейси так, щоб важка частина припадала не на пікові години. Ставку в цей час ми не піднімаємо.',
    },
    {
      title: 'Паркування там, де його немає',
      body: 'На частині вулиць центру зупинка трака можлива лише в позначеній зоні для доставок і на обмежений час. Ми питаємо менеджмент про дозволене місце розвантаження ще на етапі кошторису й обираємо розмір трака під нього. Якщо ближче стати неможливо, ми пишемо додаткові години в кошторис одразу, а не додаємо збір за довге перенесення в день переїзду.',
    },
  ],
  faqs: [
    {
      q: 'Скільки коштує переїзд квартири з двома спальнями в Маямі?',
      a: 'Діапазон $645–$1,253, і місце в ньому визначає будинок. Квартира з підземним паркінгом і вільним ліфтом закривається за чотири-пʼять годин із двома вантажниками. Вежа з бронюванням дока, довгим коридором і чергою на ліфт легко забирає сім-вісім. Ми називаємо очікувані години в письмовому кошторисі до бронювання, після короткого опису квартири у WhatsApp.',
    },
    {
      q: 'Чому переїзд у Brickell триває довше, ніж у передмісті?',
      a: 'Через процедуру доступу. Док бронюють на фіксоване вікно, охорона перевіряє COI, бригада проходить службовим маршрутом, а ліфт часто йде через паркінг і кілька коридорів. Кожен рейс від трака до квартири довший, ніж у будинку з заїздом. Речей стільки ж, шлях довший — і саме шлях додає години. Тому в Brickell ми частіше рекомендуємо бригаду з трьох чи чотирьох людей.',
    },
    {
      q: 'Ви берете доплату за час у заторі?',
      a: 'Окремої доплати за трафік немає, але дорога — це робочий час бригади, і вона входить у погодинний рахунок. Саме тому ми намагаємося ставити переїзди на ранній ранок і не планувати довгі перегони через місто на пʼяту вечора. Ставка не змінюється залежно від дня, часу доби чи сезону: $129, $179 або $219 за годину.',
    },
    {
      q: 'Чи можна вести переїзд українською?',
      a: 'На обʼєкті — так, за попереднім запитом: україномовний приблизно кожен третій вантажник, і ми складаємо зміну під ваше прохання, якщо сказати про це під час бронювання. Кошторис, узгодження з менеджментом будинку й листування ми ведемо російською або англійською. Пишіть нам українською у WhatsApp на 786-305-1844 — це зручно й нікого не спантеличить.',
    },
    {
      q: 'Чи потрібен депозит для бронювання дати в Маямі?',
      a: 'Ні. Дата закріплюється без передоплати, а розрахунок відбувається після виконаної роботи. Скасування безкоштовне, якщо попередити щонайменше за 48 годин. Письмовий кошторис ви отримуєте до бронювання й бачите в ньому обидва рядки — бригаду й трак — та очікувану кількість годин. Прихованих зборів за паливо, вихідний день чи важкі речі в підсумку не зʼявиться.',
    },
    {
      q: 'Скільки коштує пакування, якщо часу збиратися немає?',
      a: 'Пакування починається від $79 за годину за двох пакувальників; готовий пакет для студії — від $237. Матеріали привозимо свої: коробки, папір, плівку, спеціальні короби для картин і телевізорів. Найчастіше в Маямі замовляють пакування напередодні переїзду, щоб у день дока й броні ліфта бригада працювала тільки з готовими коробками й не втрачала вікно.',
    },
  ],
},
{
  slug: 'ua/moving-cost-aventura',
  cityName: 'Aventura',
  cityNameUa: 'Авентура',
  citySlug: 'ua/aventura-movers',
  metaDescription: 'Скільки коштує переїзд в Авентурі: бригада від $129/год, трак за ставкою бригади, мінімум 3 години, COI безкоштовно, без депозиту. WhatsApp 786-305-1844.',
  answer: 'Переїзд в Авентурі коштує $129 на годину за двох вантажників або $179 за трьох, мінімум 3 години, плюс трак за день за ставкою бригади. Авентура додає до звичайного переїзду два свої кроки: список на КПП закритої громади, куди наші імена й номер трака мають потрапити заздалегідь, і вікно на вантажний ліфт у вежі. Обидва питання ми закриваємо до дня переїзду, бо десять хвилин біля шлагбаума — це теж оплачений час.',
  intro: 'В Авентурі більшість адрес — це або вежа з вантажним ліфтом, або закрита громада з охороною на вʼїзді, а часто і те, і те одразу. На ціні це не позначається ніяк: година двох вантажників — $129, трьох — $179, чотирьох — $219, трак додається за день за тією ж ставкою, мінімум оплачується три години. Найменший можливий рахунок — відповідно $516, $716 чи $876. Змінюється підготовка: список на КПП, бронь ліфта, сертифікат страхування для менеджменту. Усе це ми беремо на себе й робимо до дати, а COI видаємо безкоштовно протягом доби після бронювання. Депозиту немає, скасування безкоштовне за 48 і більше годин, доплат за вихідні чи сезон не буває взагалі.',
  accessFactors: [
    {
      title: 'Списки на КПП закритих громад',
      body: 'У закритих громадах Авентури охорона зазвичай пропускає лише тих, хто є в списку на день. Якщо бригаду не внесли заздалегідь, трак стоїть біля шлагбаума, поки офіс шукає підтвердження, і цей час оплачений. Ми надсилаємо імена бригади й дані трака в офіс громади до дати переїзду, тож машина заїжджає без затримки й одразу стає під ваш підʼїзд.',
    },
    {
      title: 'Вікна вантажного ліфта у вежах',
      body: 'Висотки вздовж Country Club Drive і Biscayne Boulevard видають вантажний ліфт на конкретні години, часто не більш ніж на половину дня, і зазвичай тільки в будні. Розмір бригади ми підбираємо під це вікно: якщо квартира велика, четверо вантажників за $219 на годину закривають переїзд за один слот, і це виходить дешевше, ніж повертатися вдруге.',
    },
    {
      title: 'Трафік навколо Aventura Mall',
      body: 'Вулиці навколо молу та Biscayne Boulevard стають щільними задовго до вечора, а в сезон і у вихідні — з обіду. Дорога оплачується як робочий час бригади, тож ми ставимо старт на ранок і плануємо рейси так, щоб не стояти в потоці із завантаженим траком. Ставка від часу доби не залежить: вона однакова о восьмій ранку й о пʼятій вечора.',
    },
    {
      title: 'Паркінги з обмеженою висотою',
      body: 'Під багатьма житловими комплексами Авентури підземні паркінги з низьким заїздом, куди звичайний вантажний трак просто не проходить. Тоді розвантаження йде з наземної зони для доставок, а шлях до ліфта довшає. Ми питаємо про висоту заїзду й місце розвантаження до бронювання й підбираємо трак під конкретний будинок, щоб не переграти маршрут у день переїзду.',
    },
    {
      title: 'Папери для менеджменту',
      body: 'Перед переїздом більшість будинків просить сертифікат страхування, іноді власну заявку з датою й вікном, а подекуди й окремий депозит від мешканця на користь асоціації. COI ми оформляємо безкоштовно за 24 години після бронювання й надсилаємо просто в офіс будинку. Вимоги різних асоціацій відрізняються, тому ми уточнюємо їх у вашого менеджменту, а не припускаємо.',
    },
  ],
  faqs: [
    {
      q: 'Скільки коштує переїзд квартири з трьома спальнями в Авентурі?',
      a: 'Зазвичай $1,253–$1,611. У вежі з обмеженим вікном на ліфт ми частіше ставимо чотирьох вантажників за $219 на годину: рахунок за годину вищий, але загальна сума нерідко нижча, бо все закривається за один слот. Мінімальний рахунок при такій бригаді — $876. Точну цифру дамо після опису квартири в письмовому кошторисі протягом доби.',
    },
    {
      q: 'Хто вносить бригаду в список на КПП?',
      a: 'Ми. Після бронювання координатор надсилає в офіс громади або будинку імена вантажників, номер і габарити трака та узгоджене вікно. Від вас потрібні лише контакт менеджменту й номер вашої одиниці. Це частина роботи координатора, за неї немає окремої плати, і саме вона економить ті десять-двадцять хвилин, які інакше трак простояв би перед шлагбаумом за ваш рахунок.',
    },
    {
      q: 'Будинок дає ліфт лише на чотири години. Що робити?',
      a: 'Збільшити бригаду, а не розтягувати день. Троє вантажників коштують $179 на годину, четверо — $219, і в тісному вікні це майже завжди вигідніше, ніж двоє за $129, які не встигають. Ми рахуємо обидва сценарії в кошторисі й показуємо різницю в підсумку. Повторний виїзд іншого дня означав би другу подачу трака й нову бронь ліфта.',
    },
    {
      q: 'Чи говорить хтось із бригади українською?',
      a: 'Приблизно третина наших вантажників — україномовні. Якщо попросити при бронюванні, ми поставимо на вашу дату бригаду, яка спілкуватиметься українською на місці. Координацію — розрахунок вартості, погодження з асоціацією, листування — ведемо російською або англійською. Тобто розмова в квартирі може бути українською, а офіційне листування прийде іншою мовою; ми говоримо про це прямо, щоб не було непорозумінь.',
    },
    {
      q: 'Коли краще призначити переїзд, щоб не стояти в заторах?',
      a: 'Ранній ранок у будній день. Вулиці навколо молу тоді ще вільні, а вікно на ліфт зазвичай починається о девʼятій. Пізній старт означає, що друга половина переїзду припадає на щільний рух, і оплачених годин у дорозі більше. Ставка при цьому не змінюється ні за годиною доби, ні за днем тижня — ми не додаємо жодних коефіцієнтів.',
    },
    {
      q: 'Чи можна скасувати або перенести дату?',
      a: 'Так, безкоштовно, якщо попередити не пізніше ніж за 48 годин. Депозиту ми не беремо, тож повертати нічого не доводиться. Якщо асоціація раптом змінила вікно на ліфт чи правила заїзду, повідомте нам — ми перенесемо бригаду на іншу дату без штрафу. Оплата в будь-якому разі відбувається після виконаної роботи, а не наперед.',
    },
  ],
}
];

export const getCostPageRu = (slug: string): CostPageData | undefined =>
  COST_PAGES_RU.find((p) => p.slug === slug);

export const getCostPageUa = (slug: string): CostPageData | undefined =>
  COST_PAGES_UA.find((p) => p.slug === slug);
