// ─── Move Types ──────────────────────────────────────────────────────────────
export type MoveType = 'local' | 'long-distance' | 'international' | 'office' | 'specialty';
export type HomeSize = 'studio' | '1br' | '2br' | '3br' | '4br+' | 'office';
export type CrewSize = 2 | 3;
export type QuoteStatus = 'pending' | 'reviewed' | 'sent' | 'accepted' | 'declined';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
export type LeadSource = 'contact-form' | 'quote-wizard' | 'phone' | 'referral';
export type ServiceCategory = 'residential' | 'commercial' | 'specialty' | 'storage';

// ─── Quote ────────────────────────────────────────────────────────────────────
export interface QuoteInventory {
  // Home profile
  homeSize: HomeSize;
  crewSize: CrewSize;
  bedrooms: number;        // derived from homeSize for legacy use
  bathrooms: number;
  estimatedBoxes: number;
  specialItems: string[];
  // Access
  hasElevator: boolean;
  hasStairs: boolean;
  stairsFlights: number;
  isHighRise: boolean;
  needsCOI: boolean;
  // Extra
  hasGarage: boolean;
  hasStorage: boolean;
}

export interface QuoteAddons {
  packingService: boolean;
  unpackingService: boolean;
  furnitureAssembly: boolean;
  storageMonths: number;
  autoTransport: boolean;
  artHandling: boolean;
  climateControlled: boolean;
}

export interface QuotePricing {
  laborRate: number;       // hourly rate × hours
  truckFee: number;        // flat truck/travel fee
  accessFee: number;       // stairs/elevator/high-rise fees
  addonsFee: number;       // packing, specialty, etc.
  // legacy fields (kept for admin dashboard compatibility)
  baseRate: number;
  distanceFee: number;
  inventoryFee: number;
  discount: number;
  total: number;
  currency: 'USD';
  // Metadata shown in summary
  estimatedHours: number;
  crewSize: CrewSize;
  isLongDistance: boolean;
}

export interface Quote {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: QuoteStatus;
  moveType: MoveType;
  fromAddress: string;
  fromCity: string;
  fromState: string;
  fromZip: string;
  toAddress: string;
  toCity: string;
  toState: string;
  toZip: string;
  estimatedDistance: number;
  inventory: QuoteInventory;
  addons: QuoteAddons;
  preferredDate: string;
  flexibleDates: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pricing: QuotePricing;
  adminNotes: string;
  assignedTo: string;
}

export type QuoteDraft = Omit<Quote, 'id' | 'createdAt' | 'updatedAt' | 'pricing' | 'estimatedDistance' | 'status' | 'adminNotes' | 'assignedTo'>;

// ─── Lead ─────────────────────────────────────────────────────────────────────
export interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  source: LeadSource;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  moveType?: MoveType;
  moveDate?: string;
  fromCity?: string;
  toCity?: string;
  adminNotes: string;
  followUpDate?: string;
  assignedTo: string;
  quoteId?: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────
export interface ServiceFeature {
  icon: string;
  label: string;
}

export interface Service {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  category: ServiceCategory;
  name: string;
  tagline: string;
  description: string;
  features: ServiceFeature[];
  startingPrice: number;
  priceUnit: 'per-hour' | 'flat-rate' | 'per-mile' | 'per-month' | 'custom';
  pricingNote?: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface AdminSession {
  email: string;
  name: string;
  role: 'admin' | 'manager';
  loginAt: string;
}

// ─── Testimonial (static mock) ────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: number;
  moveType: string;
}
