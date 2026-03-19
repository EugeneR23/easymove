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
        { icon: 'Shield', label: 'Fully insured' },
        { icon: 'Package', label: 'Quality packing materials available' },
        { icon: 'Clock', label: 'Elevator & loading dock coordination' },
        { icon: 'Phone', label: 'Direct line to Eugene throughout' },
      ],
      startingPrice: 450, priceUnit: 'flat-rate',
      imageUrl: '/images/Local%20distance.png',
      isActive: true,
    },
    {
      id: 'svc-2', slug: 'long-distance-moving', createdAt: now, updatedAt: now,
      category: 'residential', name: 'Long-Distance Moving', sortOrder: 2,
      tagline: 'Dedicated truck, no shared loads, direct communication from South Florida to your destination.',
      description: `Long-distance moves are quoted individually based on distance, volume, and access at both ends. Your belongings travel on a dedicated truck — no shared loads, no relay warehouses. We give you a realistic delivery window before we commit, stay in contact throughout the drive, and confirm before final delivery. We've moved clients from South Florida to the Northeast, the Southeast, and points in between. Every long-distance quote is handled personally.`,
      features: [
        { icon: 'Truck', label: 'Dedicated truck — no shared loads' },
        { icon: 'Phone', label: 'Regular check-ins en route' },
        { icon: 'CheckCircle', label: 'Honest delivery window upfront' },
        { icon: 'Shield', label: 'Transit insurance' },
        { icon: 'Package', label: 'Professional packing available' },
        { icon: 'MapPin', label: 'Quoted individually per move' },
      ],
      startingPrice: 1200, priceUnit: 'flat-rate',
      imageUrl: '/images/Long%20distance.png',
      isActive: true,
    },
    {
      id: 'svc-3', slug: 'international-moving', createdAt: now, updatedAt: now,
      category: 'specialty', name: 'International & Overseas Moves', sortOrder: 3,
      tagline: 'We handle the Miami end — professional packing and loading, coordinated with your freight carrier.',
      description: `If you're relocating internationally, we handle what we do best: packing your belongings properly for the journey, loading onto your carrier, and managing the logistics on the Miami end. We can recommend vetted freight forwarders for the ocean or air portion — but we're straightforward about our role. International transport, customs documentation, and destination delivery are handled by licensed freight specialists. Our job is to make sure everything leaves in the right condition and is handed off correctly.`,
      features: [
        { icon: 'Package', label: 'International-standard packing' },
        { icon: 'Anchor', label: 'Freight carrier coordination' },
        { icon: 'Globe', label: 'Freight forwarder referrals available' },
        { icon: 'FileText', label: 'Inventory documentation' },
        { icon: 'Shield', label: 'Insured through handoff' },
        { icon: 'Phone', label: 'Single contact on the Miami end' },
      ],
      startingPrice: 4500, priceUnit: 'flat-rate',
      imageUrl: '/images/International.png',
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
        { icon: 'Thermometer', label: 'Climate-aware loading & transport' },
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
      description: `Between a closing and your new home, or when items need to sit safely during a renovation, we can coordinate storage at trusted, climate-controlled facilities in Miami-Dade. We handle the pickup from your current location and redelivery when you're ready. Storage is month-to-month. We'll recommend the right facility based on what you're storing and how long you need it — and stay involved so you're not managing a separate relationship.`,
      features: [
        { icon: 'Archive', label: 'Climate-controlled facilities' },
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
