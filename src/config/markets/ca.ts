import type { MarketConfig } from './types';

/**
 * Sacramento, California — the second branch, opening 2026.
 *
 * Nothing in this file may be invented. Every value is either (a) a real,
 * checkable fact, (b) read from an environment variable the owner sets on the
 * California Vercel project, or (c) explicitly null, which makes the site say
 * nothing rather than guess.
 *
 * READ BEFORE LAUNCH — California is not Florida, legally or commercially:
 *
 * 1. PERMIT. Household movers operating intrastate in California must hold a
 *    Household Mover permit from the Bureau of Household Goods and Services
 *    (BHGS, Department of Consumer Affairs) — not the CPUC, which lost this
 *    function to BHGS under AB 2956 in 2018. $500 filing fee, fingerprinting,
 *    and a written exam on Maximum Rate Tariff 4. The Division of Household
 *    Movers is at 4244 South Market Court, Suite D, Sacramento, CA 95834 —
 *    a local errand once you have moved. See docs/SACRAMENTO_LAUNCH_PLAN.md.
 *
 * 2. RATE CAP. Maximum Rate Tariff 4 sets the maximum an intrastate mover may
 *    charge. The Florida rates below are a placeholder carried over so the
 *    calculator runs; they have NOT been checked against Max 4.
 *
 * 3. DOUBLE DRIVE TIME. Max 4 Item 320 requires hourly charges on a local move
 *    to bill loading, unloading, and *double* the driving time from origin to
 *    destination, where the two are 5 or more miles apart. Florida bills drive
 *    time once. The pricing engine reads `doubleDriveTime` for this — do not
 *    remove it to make the numbers look friendlier; it is the law here.
 *
 * 4. INSURANCE MINIMUMS: $600,000 combined single limit (or 250/500/100 split)
 *    plus $20,000 per-shipment cargo.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.easy-move-sacramento.com';

export const CA: MarketConfig = {
  id: 'ca',
  brandName: 'Easy Move Sacramento',
  domain: SITE_URL.replace(/^https?:\/\//, ''),
  siteUrl: SITE_URL,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'romanov@easy-move-florida.com',
  // Until a 916 number is live, the Florida number is the honest one to publish —
  // it is answered by the same owner. Set these three on the CA Vercel project
  // the day the local number is provisioned; nothing else needs to change.
  phone: {
    e164: process.env.NEXT_PUBLIC_PHONE_E164 ?? '+17863051844',
    display: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? '786-305-1844',
    whatsapp: process.env.NEXT_PUBLIC_PHONE_WHATSAPP ?? '17863051844',
  },
  nap: {
    // null until the Sacramento address is real. A LocalBusiness node with no
    // streetAddress is valid; one with a made-up street is fraud.
    streetAddress: process.env.NEXT_PUBLIC_STREET_ADDRESS ?? null,
    addressLocality: 'Sacramento',
    addressRegion: 'CA',
    postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE ?? null,
    addressCountry: 'US',
    // Sacramento city centre — the same coordinate the long-distance table
    // already uses for 'sacramento ca'. Replace with the yard's coordinate once
    // there is an address.
    geo: { latitude: 38.5816, longitude: -121.4944 },
  },
  regionLabel: 'the Sacramento area',
  defaultState: 'CA',
  quoteCities: [
    'Sacramento',
    'West Sacramento',
    'Elk Grove',
    'Roseville',
    'Rocklin',
    'Folsom',
    'Citrus Heights',
    'Rancho Cordova',
    'Carmichael',
    'Fair Oaks',
    'Davis',
    'Woodland',
    'El Dorado Hills',
    'Lincoln',
    'Natomas',
  ],
  // English only at launch. The Russian-language pages are a fast follow, not a
  // launch blocker — see the launch plan; Sacramento's Slavic community is the
  // single strongest reason this branch should have them.
  locales: ['en'],
  areaServedCities: [
    { name: 'Sacramento', sameAs: 'https://en.wikipedia.org/wiki/Sacramento,_California' },
    { name: 'West Sacramento', sameAs: 'https://en.wikipedia.org/wiki/West_Sacramento,_California' },
    { name: 'Elk Grove', sameAs: 'https://en.wikipedia.org/wiki/Elk_Grove,_California' },
    { name: 'Roseville', sameAs: 'https://en.wikipedia.org/wiki/Roseville,_California' },
    { name: 'Rocklin', sameAs: 'https://en.wikipedia.org/wiki/Rocklin,_California' },
    { name: 'Folsom', sameAs: 'https://en.wikipedia.org/wiki/Folsom,_California' },
    { name: 'Citrus Heights', sameAs: 'https://en.wikipedia.org/wiki/Citrus_Heights,_California' },
    { name: 'Rancho Cordova', sameAs: 'https://en.wikipedia.org/wiki/Rancho_Cordova,_California' },
    { name: 'Carmichael', sameAs: 'https://en.wikipedia.org/wiki/Carmichael,_California' },
    { name: 'Fair Oaks', sameAs: 'https://en.wikipedia.org/wiki/Fair_Oaks,_California' },
    { name: 'Davis', sameAs: 'https://en.wikipedia.org/wiki/Davis,_California' },
    { name: 'Woodland', sameAs: 'https://en.wikipedia.org/wiki/Woodland,_California' },
    { name: 'El Dorado Hills', sameAs: 'https://en.wikipedia.org/wiki/El_Dorado_Hills,_California' },
    { name: 'Lincoln', sameAs: 'https://en.wikipedia.org/wiki/Lincoln,_California' },
  ],
  // Deliberately absent. This branch has no reviews yet, so no AggregateRating
  // can be emitted. Add it the day there are real Google reviews on the
  // Sacramento profile — never sooner, and never borrowed from Florida.
  rating: undefined,
  sameAs: [],
  licence: {
    regulator: 'California Bureau of Household Goods and Services (BHGS), Division of Household Movers',
    permitLabel: 'Household Mover permit (Cal-T / MTR number)',
    permitNumber: null,
    usdotNumber: null,
    sourceUrl: 'https://bhgs.dca.ca.gov/licensee/hhm_faqs.shtml',
  },
  pricing: {
    // [TODO: owner] PLACEHOLDER — copied from Florida so the calculator runs.
    // Must be checked against Maximum Rate Tariff 4 and against what Sacramento
    // crews actually charge before this domain is made public.
    hourlyRate: { 2: 129, 3: 179, 4: 229 },
    minHours: 3,
    truckFee: 129,
    ldMinimum: 1500,
    doubleDriveTime: true,
    doubleDriveTimeMinMiles: 5,
    rateCapAuthority: 'California Maximum Rate Tariff 4 (BHGS)',
  },
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '19:00',
  },
  // The Sacramento branch is new. Florida's 2021 founding belongs to Florida.
  foundingDate: null,
  // Generate a fresh key for the CA domain before first use; a key file is
  // valid only on the host it is served from.
  indexNow: null,
  sibling: {
    brandName: 'Easy Move Florida',
    url: 'https://www.easy-move-florida.com',
    relation: 'parent',
  },
};
