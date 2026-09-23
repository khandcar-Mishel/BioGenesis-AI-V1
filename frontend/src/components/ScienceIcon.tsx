import type { Icon } from '@phosphor-icons/react';

export type ScienceKind = 'design' | 'screening' | 'dynamics';

/** A small, consistent scientific glyph family for the three pipeline stages. */
export function ScienceIcon({ kind, size = 24 }: { kind: ScienceKind; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'design' && <>
        <path d="M7 3c0 7 10 11 10 18M17 3c0 7-10 11-10 18M8 5h8M9 9h6M9 15h6M8 19h8" />
        <circle cx="7" cy="3" r="1.3" fill="currentColor" stroke="none" /><circle cx="17" cy="21" r="1.3" fill="currentColor" stroke="none" />
      </>}
      {kind === 'screening' && <>
        <path d="m4 6 8-4 8 4-8 4-8-4Zm0 6 8 4 8-4M4 18l8 4 8-4" /><path d="m9.5 11 2 2 4-4" />
      </>}
      {kind === 'dynamics' && <>
        <path d="M2 12h3l3-7 4 14 4-11 3 4h3" /><path d="M4 3v1M20 20v1M2 21h4M18 3h4" opacity=".4" />
      </>}
    </svg>
  );
}

export function IconTile({ icon: IconComponent, className = '' }: { icon: Icon; className?: string }) {
  return <span className={`icon-tile ${className}`}><IconComponent size={22} weight="regular" aria-hidden="true" /></span>;
}
