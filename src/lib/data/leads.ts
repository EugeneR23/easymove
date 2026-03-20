import fs from 'fs';
import path from 'path';
import type { Lead } from '@/types';

const DATA_FILE = process.env.VERCEL
  ? path.join('/tmp', 'leads.json')
  : path.join(process.cwd(), 'data', 'leads.json');

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

export function readAllLeads(): Lead[] {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Lead[];
}

export function readOneLead(id: string): Lead | null {
  return readAllLeads().find((l) => l.id === id) ?? null;
}

export function createLead(lead: Lead): Lead {
  const all = readAllLeads();
  all.unshift(lead);
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>): Lead | null {
  const all = readAllLeads();
  const idx = all.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return all[idx];
}

export function deleteLead(id: string): boolean {
  const all = readAllLeads();
  const filtered = all.filter((l) => l.id !== id);
  if (filtered.length === all.length) return false;
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}
