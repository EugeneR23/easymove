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
      a: 'Local Fort Lauderdale moves are hourly, because access decides the work and hours are the honest way to price it. Moves leaving South Florida are quoted flat, from $1,500, with a written estimate within 24 hours and no deposit. Either way you see the arithmetic before you commit, and billing after the minimum runs in 15-minute increments.',
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
      a: 'Because in a condo city the work is access, and access varies more than furniture does. An hourly rate with a written hour estimate keeps the price honest in both directions: an easy move finishes early and costs less, a hard one is visible in the estimate before you book. Flat pricing exists too; long-distance moves out of Florida start at $1,500 flat.',
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
      a: 'For local work, no. Hourly with a written estimate is the fairer instrument, because it returns money when the day goes faster than planned. Flat pricing suits moves where the variables are locked, which is why our long-distance moves from Florida are flat, starting at $1,500 with a written figure inside 24 hours. Local Pines jobs stay hourly, billed in 15-minute steps after the minimum.',
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
