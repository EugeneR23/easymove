/**
 * Airtable CRM helper — EasyMove Elite
 *
 * Required environment variables (set in Vercel → Project → Settings → Environment Variables):
 *   AIRTABLE_API_KEY        Personal Access Token from airtable.com/create/tokens
 *                           Looks like: patXXXXXXXXX.XXXXXXXX
 *   AIRTABLE_BASE_ID        Your base ID from Airtable URL — starts with "app"
 *                           e.g. appXXXXXXXXXXXXXX
 *                           Find it: open your base → Help → API documentation
 *   AIRTABLE_TABLE_NAME     Table name exactly as it appears in Airtable (default: "Leads")
 *
 * NOTE: The base ID always starts with "app". The URL segment "tbl..." is the table ID,
 * and "viw..." is a view ID — neither is the base ID.
 * Go to https://airtable.com/developers/web/api/introduction to find your base ID.
 */

const AIRTABLE_API = 'https://api.airtable.com/v0';

function cfg() {
  return {
    token:   process.env.AIRTABLE_API_KEY,
    baseId:  process.env.AIRTABLE_BASE_ID,
    table:   process.env.AIRTABLE_TABLE_NAME ?? 'Leads',
  };
}

/**
 * Map raw lead source strings to clean CRM source labels.
 */
export function normalizeSource(source: string | undefined): string {
  const map: Record<string, string> = {
    'contact-form':  'contact_form',
    'popup':         'callback_popup',
    'quote-form':    'quote_form',
    'quote_form':    'quote_form',
  };
  return map[source ?? ''] ?? (source ?? 'unknown');
}

/**
 * Create a new record in the Airtable Leads table.
 *
 * Throws on API failure — callers should .catch() this so a CRM failure
 * never blocks lead capture or other notifications.
 */
export async function sendToAirtable(fields: Record<string, unknown>): Promise<void> {
  const { token, baseId, table } = cfg();

  if (!token || !baseId) {
    console.warn('[airtable] AIRTABLE_API_KEY or AIRTABLE_BASE_ID not configured — skipped');
    return;
  }

  const url = `${AIRTABLE_API}/${encodeURIComponent(baseId)}/${encodeURIComponent(table)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      records: [{ fields }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Airtable ${res.status}: ${detail}`);
  }
}

/**
 * Fetch the next upcoming job from Airtable.
 * Used by the Telegram /nextjob command.
 *
 * Returns the fields object of the first matching record, or null.
 */
export async function getNextJob(): Promise<Record<string, unknown> | null> {
  const { token, baseId, table } = cfg();

  if (!token || !baseId) {
    console.warn('[airtable] getNextJob: credentials not configured');
    return null;
  }

  // Filter: Job Date is set, Status is not terminal
  const filter = `AND(
    NOT({Job Date} = BLANK()),
    NOT({Status} = 'Completed'),
    NOT({Status} = 'Lost'),
    NOT({Status} = 'Cancelled')
  )`.replace(/\s+/g, ' ').trim();

  const qs = new URLSearchParams();
  qs.set('filterByFormula', filter);
  qs.set('sort[0][field]',      'Job Date');
  qs.set('sort[0][direction]',  'asc');
  qs.set('maxRecords',          '1');

  const url = `${AIRTABLE_API}/${encodeURIComponent(baseId)}/${encodeURIComponent(table)}?${qs.toString()}`;

  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Airtable ${res.status}: ${detail}`);
  }

  const data = await res.json() as { records: Array<{ fields: Record<string, unknown> }> };
  return data.records[0]?.fields ?? null;
}
