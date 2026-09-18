import fs from 'fs';
import path from 'path';
import type { Service } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'services.json');

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const seed = getSeedServices();
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2), 'utf-8');
  }
}

export function readAllServices(): Service[] {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return (JSON.parse(raw) as Service[]).filter((s) => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function readAllServicesAdmin(): Service[] {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Service[];
}

export function readOneService(idOrSlug: string): Service | null {
  const all = readAllServicesAdmin();
  return all.find((s) => s.id === idOrSlug || s.slug === idOrSlug) ?? null;
}

export function createService(service: Service): Service {
  const all = readAllServicesAdmin();
  all.push(service);
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return service;
}

export function updateService(id: string, patch: Partial<Service>): Service | null {
  const all = readAllServicesAdmin();
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return all[idx];
}

function getSeedServices(): Service[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'svc-1', slug: 'residential-moving', createdAt: now, updatedAt: now,
      category: 'residential', name: 'Residential & High-Rise Moving', sortOrder: 1,
      tagline: 'Careful, well-organized moves for South Florida condos, high-rises, and single-family homes.',
      description: `High-rise buildings in South Florida come with real logistics: elevator reservations, loading dock windows, COI requirements, and floor protection rules. We've done this many times and know what building managers expect. We handle the paperwork, protect surfaces from lobby to unit, and work within your building's rules without needing hand-holding. Whether you're in a Brickell tower or a Coral Gables home, the level of care stays the same.`,
      features: [
        { icon: 'Building2', label: 'High-rise & condo experience' },
        { icon: 'FileText', label: 'COI provided for building management' },
        // [TODO: FDACS IM# + insurance details from Evgenii]
        { icon: 'Shield', label: 'Owner-led crews' },
        { icon: 'Package', label: 'Pads & stretch wrap included as loaners' },
        { icon: 'Clock', label: 'Elevator & loading dock coordination' },
        { icon: 'Phone', label: 'Direct line to Eugene throughout' },
      ],
      startingPrice: 450, priceUnit: 'flat-rate',
      imageUrl: '/images/Local%20distance.png',
      isActive: true,
    },
    {
      id: 'svc-2', slug: 'long-distance-moving', createdAt: now, updatedAt: now,
      category: 'residential', name: 'Long-Distance Moving Within Florida', sortOrder: 2,
      tagline: 'Moves to anywhere else in Florida, quoted per job. Out of state we refer a licensed carrier.',
      description: `Long-distance inside Florida - Orlando, Tampa, Naples, Jacksonville, the Panhandle - is quoted individually on distance, volume and access at both ends, not from a rate card. You get the figure in writing before anything is booked, and there is no deposit. What we do not do is cross a state line: moving household goods between states requires federal operating authority we do not hold, so we neither quote nor take those jobs. If you are leaving Florida, call anyway - we will name a licensed carrier, and packing or the Florida-side leg is still ours.`,
      features: [
        { icon: 'MapPin', label: 'Anywhere in Florida' },
        { icon: 'CheckCircle', label: 'Quoted individually, in writing' },
        { icon: 'Shield', label: 'No deposit to book' },
        { icon: 'Package', label: 'Packing available at either end' },
        { icon: 'Building2', label: 'Storage on the Florida side' },
        { icon: 'Phone', label: 'Out of state: referral to a licensed carrier' },
      ],
      startingPrice: 0, priceUnit: 'custom',
      pricingNote: 'Quoted individually by distance, volume and access at both ends.\n- Anywhere in Florida\n- Written estimate before booking, no deposit\n- Out of state: not offered - we refer a licensed carrier',
      imageUrl: '/images/Long%20distance.png',
      isActive: true,
    },
    {
      id: 'svc-4', slug: 'office-commercial', createdAt: now, updatedAt: now,
      category: 'commercial', name: 'Office & Commercial', sortOrder: 4,
      tagline: 'Business moves scheduled around your hours, handled with the same care as residential work.',
      description: `Business moves need to happen around your schedule. We work evenings and weekends to keep your downtime short. Our crews handle office furniture, workstations, monitors, and AV equipment carefully, and we disassemble and reassemble modular furniture on-site. We're a small, focused team — not a large commercial moving company — so we take on office jobs where quality and communication matter more than raw speed. Eugene stays directly involved on every commercial job.`,
      features: [
        { icon: 'Building2', label: 'After-hours & weekend scheduling' },
        { icon: 'Monitor', label: 'IT & AV equipment handled carefully' },
        { icon: 'Settings', label: 'Furniture disassembly & reassembly' },
        { icon: 'ClipboardList', label: 'Itemized inventory on request' },
        { icon: 'Lock', label: 'Careful document & file transport' },
        { icon: 'Phone', label: 'Direct owner involvement' },
      ],
      startingPrice: 800, priceUnit: 'custom',
      pricingNote: 'Pricing is based on crew size, job scope, and scheduling requirements.\n• Hourly crew rates apply\n• After-hours and weekend moves available\n• Custom quotes for larger or complex projects',
      imageUrl: '/images/Office.png',
      isActive: true,
    },
    {
      id: 'svc-5', slug: 'specialty-items', createdAt: now, updatedAt: now,
      category: 'specialty', name: 'Fine Art & Specialty Items', sortOrder: 5,
      tagline: 'Careful packing, proper protection, and deliberate placement for pieces that can\'t be replaced.',
      description: `Grand pianos, large paintings, antique furniture, and statement sculptures need more than moving pads and a standard truck. We take extra time with specialty items: custom or purpose-built crating where needed, climate-aware loading, and slow, deliberate placement at the destination. We photograph specialty items before and after the move. If a piece requires equipment or expertise beyond what we offer, we'll tell you upfront rather than take on work we can't do right.`,
      features: [
        { icon: 'Palette', label: 'Fine art packing & protective crating' },
        { icon: 'Music', label: 'Grand piano moving' },
        { icon: 'Thermometer', label: 'Photographic inventory' },
        { icon: 'Camera', label: 'Before & after photo documentation' },
        { icon: 'Lock', label: 'Extra care protocols for high-value items' },
        { icon: 'Star', label: 'Careful placement at destination' },
      ],
      startingPrice: 800, priceUnit: 'custom',
      imageUrl: '/images/Art%20wrap.png',
      isActive: true,
    },
    {
      id: 'svc-6', slug: 'storage-solutions', createdAt: now, updatedAt: now,
      category: 'storage', name: 'Storage Coordination', sortOrder: 6,
      tagline: 'Short- or long-term storage at trusted Miami-Dade facilities — we handle pickup and redelivery.',
      description: `Between a closing and your new home, or when items need to sit safely during a renovation, we can coordinate storage at third-party facilities in Miami-Dade, naming the facility before anything moves. We handle the pickup from your current location and redelivery when you're ready. Storage is month-to-month. We'll recommend the right facility based on what you're storing and how long you need it — and stay involved so you're not managing a separate relationship.`,
      features: [
        { icon: 'Archive', label: 'Climate-controlled space available' },
        { icon: 'Video', label: 'Secured, monitored storage' },
        { icon: 'Truck', label: 'Pickup & redelivery handled by us' },
        { icon: 'Shield', label: 'Storage insurance available' },
        { icon: 'Calendar', label: 'Month-to-month terms' },
        { icon: 'Phone', label: 'We stay involved throughout' },
      ],
      startingPrice: 200, priceUnit: 'per-month',
      imageUrl: '/images/Storage.png',
      isActive: true,
    },
  ];
}
