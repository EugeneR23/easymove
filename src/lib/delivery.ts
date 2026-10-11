/**
 * A delivery channel that is not set up. Thrown, never returned quietly: until
 * 2026-10-11 sendEmail, sendTelegram and sendToAirtable returned early on
 * missing config, Promise.allSettled counted that as "fulfilled", and a lead
 * with no channel configured was logged as delivered while the customer saw
 * "Request received".
 *
 * Its own module so that airtable.ts can use it without importing the Twilio
 * and Resend SDKs that notify.ts pulls in.
 */
export class NotConfiguredError extends Error {
  constructor(channel: string) {
    super(`${channel} not configured`);
    this.name = 'NotConfiguredError';
  }
}
