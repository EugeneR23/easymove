/**
 * Where a lead came from.
 *
 * Until 2026-11-09 nothing recorded it. A lead reached Telegram and Airtable
 * with the form it used and its language, and no way to tell a Google search
 * from an ad click from a directory. Any claim that a change to the site
 * produced more inquiries was therefore a guess.
 *
 * The browser stores the first page and referrer of the visit once, the forms
 * send it with the lead, and the routes print one line in the owner's alert.
 * Nothing here depends on GTM or any third-party script.
 */

export interface Attribution {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  gclid: string;
}

const KEY = 'emfAttribution';
const FIELDS = ['landingPage', 'referrer', 'utmSource', 'utmMedium', 'utmCampaign', 'gclid'] as const;
const EMPTY: Attribution = { landingPage: '', referrer: '', utmSource: '', utmMedium: '', utmCampaign: '', gclid: '' };

/** Browser, first page of the visit. Later pages do not overwrite it. */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    let referrer = '';
    try {
      const host = document.referrer ? new URL(document.referrer).hostname : '';
      // Our own pages are not a source.
      referrer = host && host !== window.location.hostname ? host : '';
    } catch { /* malformed referrer: leave blank */ }
    const a: Attribution = {
      landingPage: window.location.pathname,
      referrer,
      utmSource: q.get('utm_source') ?? '',
      utmMedium: q.get('utm_medium') ?? '',
      utmCampaign: q.get('utm_campaign') ?? '',
      gclid: q.get('gclid') ?? '',
    };
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch { /* storage blocked: the lead still goes out, without a source */ }
}

/** Browser, at submit time. Captures now if the tracker has not run yet. */
export function readAttribution(): Attribution {
  try {
    captureAttribution();
    return sanitizeAttribution(JSON.parse(sessionStorage.getItem(KEY) ?? '{}'));
  } catch {
    return { ...EMPTY };
  }
}

/** Server. The endpoint is public, so every field is forced to a short plain string. */
export function sanitizeAttribution(raw: unknown): Attribution {
  const src = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const out = { ...EMPTY };
  for (const f of FIELDS) {
    const v = src[f];
    out[f] = typeof v === 'string' ? v.replace(/[\r\n<>]/g, ' ').trim().slice(0, 120) : '';
  }
  return out;
}

/**
 * One line for the owner's alert and the Airtable note. Returns "" when the
 * browser sent nothing, so a missing source never prints as a source.
 */
export function attributionLine(a: Attribution): string {
  const channel = a.gclid
    ? 'Google Ads'
    : a.utmSource
      ? [a.utmSource, a.utmMedium, a.utmCampaign].filter(Boolean).join(' / ')
      : a.referrer || (a.landingPage ? 'direct or unknown' : '');
  if (!channel && !a.landingPage) return '';
  return `Source: ${channel}${a.landingPage ? ` | first page ${a.landingPage}` : ''}`;
}
