import { HONEYPOT_FIELD } from '@/lib/leadGuard';

/**
 * Off-screen input that people never see and bots fill in. Not display:none —
 * some bots skip hidden inputs — but moved off-screen and removed from the tab
 * order and the accessibility tree.
 */
export default function HoneypotField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Company website</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
