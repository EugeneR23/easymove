import fs from 'fs';
import path from 'path';
import type { Quote } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'quotes.json');

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

export function readAllQuotes(): Quote[] {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Quote[];
}

export function readOneQuote(id: string): Quote | null {
  return readAllQuotes().find((q) => q.id === id) ?? null;
}

export function createQuote(quote: Quote): Quote {
  const all = readAllQuotes();
  all.unshift(quote);
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return quote;
}

export function updateQuote(id: string, patch: Partial<Quote>): Quote | null {
  const all = readAllQuotes();
  const idx = all.findIndex((q) => q.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  return all[idx];
}

export function deleteQuote(id: string): boolean {
  const all = readAllQuotes();
  const filtered = all.filter((q) => q.id !== id);
  if (filtered.length === all.length) return false;
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}
