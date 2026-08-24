import type { MarketConfig } from './types';

/**
 * Florida — the original branch, live since 2021 and the site that currently
 * earns the organic and AI-search traffic.
 *
 * Every value here is lifted verbatim from what the site already published, so
 * an FL build renders byte-identically to before this file existed. Do not
 * "tidy" a number here; change it at its source of truth and copy it across.
 * Rates live in src/lib/pricing.ts, review counts in src/lib/data/credentials.ts.
 */
export const FL: MarketConfig = {
  id: 'fl',
  brandName: 'Easy Move Florida',
  domain: 'www.easy-move-florida.com',
  siteUrl: 'https://www.easy-move-florida.com',
  email: 'romanov@easy-move-florida.com',
  phone: {
    e164: '+17863051844',
    display: '786-305-1844',
    whatsapp: '17863051844',
  },
  nap: {
    // [TODO: confirm with Evgenii] streetAddress is not yet verified against
    // business records. It is published because the GBP carries it.
    streetAddress: '2130 Stirling Rd',
    addressLocality: 'Hollywood',
    addressRegion: 'FL',
    postalCode: '33020',
    addressCountry: 'US',
    geo: { latitude: 26.0038, longitude: -80.158 },
  },
  regionLabel: 'South Florida',
  defaultState: 'FL',
  quoteCities: [
    'Miami',
    'Miami Beach',
    'Aventura',
    'Sunny Isles Beach',
    'Hallandale Beach',
    'Hollywood',
    'Fort Lauderdale',
    'Pompano Beach',
    'Boca Raton',
    'Coral Gables',
    'Coconut Grove',
    'Doral',
    'Brickell',
    'Delray Beach',
  ],
  locales: ['en', 'ru'],
  areaServedCities: [
    { name: 'Miami', sameAs: 'https://en.wikipedia.org/wiki/Miami' },
    { name: 'Miami Beach', sameAs: 'https://en.wikipedia.org/wiki/Miami_Beach,_Florida' },
    { name: 'North Miami', sameAs: 'https://en.wikipedia.org/wiki/North_Miami,_Florida' },
    { name: 'Coral Gables' },
    { name: 'Coconut Grove' },
    { name: 'Brickell' },
    { name: 'Doral', sameAs: 'https://en.wikipedia.org/wiki/Doral,_Florida' },
    { name: 'Aventura' },
    { name: 'Sunny Isles Beach' },
    { name: 'Hallandale Beach', sameAs: 'https://en.wikipedia.org/wiki/Hallandale_Beach,_Florida' },
    { name: 'Hollywood' },
    { name: 'Dania Beach', sameAs: 'https://en.wikipedia.org/wiki/Dania_Beach,_Florida' },
    { name: 'Fort Lauderdale', sameAs: 'https://en.wikipedia.org/wiki/Fort_Lauderdale,_Florida' },
    { name: 'Pompano Beach' },
    { name: 'Boca Raton', sameAs: 'https://en.wikipedia.org/wiki/Boca_Raton,_Florida' },
    { name: 'Delray Beach' },
    { name: 'Palm Beach' },
  ],
  // Verified against the live Google Business Profile (place_id
  // ChIJJcPs4dykvagR_uQxPaSlY_8). Sourced from credentials.ts at the call site
  // so there is still exactly one place to update it.
  rating: { value: '5.0', count: 6 },
  sameAs: [
    'https://maps.app.goo.gl/o4bkrBqVUpgvKyF97',
    'https://www.google.com/maps/place/?q=place_id:ChIJJcPs4dykvagR_uQxPaSlY_8',
    'https://www.thumbtack.com/profile/services/474342774303219734/reviews',
  ],
  licence: {
    regulator: 'Florida Department of Agriculture and Consumer Services (FDACS)',
    permitLabel: 'FDACS mover registration (Chapter 507), format IM####',
    permitNumber: null,
    usdotNumber: null,
    sourceUrl: 'https://www.fdacs.gov/Consumer-Resources/Business-Search',
  },
  pricing: {
    hourlyRate: { 2: 129, 3: 179, 4: 229 },
    minHours: 3,
    truckFee: 129,
    ldMinimum: 1500,
    doubleDriveTime: false,
    doubleDriveTimeMinMiles: 0,
    rateCapAuthority: null,
  },
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '19:00',
  },
  // [TODO: confirm with Evgenii] not yet verified against business records.
  foundingDate: '2021',
  indexNow: {
    key: '186c8626cf8c502a9b50e971fb27fbb6d324e5b44bd9956592991349c64013cc',
    keyFile: '186c8626cf8c502a9b50e971fb27fbb6d324e5b44bd9956592991349c64013cc.txt',
  },
  sibling: null,
};
