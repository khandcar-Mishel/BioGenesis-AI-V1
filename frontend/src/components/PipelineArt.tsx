import { useId } from 'react';
import type { ScienceKind } from './ScienceIcon';

/** Lightweight vector diagrams; no WebGL contexts or animation in the tool cards. */
export function PipelineArt({ kind }: { kind: ScienceKind }) {
  const id = useId();
  return <div className={`pipeline-art art-${kind}`} aria-hidden="true">
    <svg viewBox="0 0 360 150" fill="none">
      <defs><linearGradient id={id} x1="80" y1="20" x2="250" y2="140" gradientUnits="userSpaceOnUse"><stop stopColor="currentColor" stopOpacity=".15" /><stop offset=".55" stopColor="currentColor" /><stop offset="1" stopColor="currentColor" stopOpacity=".35" /></linearGradient></defs>
      {kind === 'design' && <>
        <ellipse cx="180" cy="128" rx="85" ry="10" fill="currentColor" opacity=".06" />
        {[0, 1, 2].map(n => <g key={n} transform={`translate(${n * 48 - 38},${n % 2 * 14})`}>
          <path d="M145 15c75 12-48 38 16 57s43 42-9 57" stroke="currentColor" strokeWidth="2" opacity=".18" />
          <path d="M145 15c-47 19 60 31 14 57s-29 45-7 57" stroke={`url(#${id})`} strokeWidth="12" />
          <path d="M145 15c-47 19 60 31 14 57s-29 45-7 57" stroke="white" strokeWidth="1.5" opacity=".35" />
        </g>)}
        <circle cx="266" cy="42" r="5" fill="currentColor" opacity=".6" /><path d="M246 50 264 43M96 99l-18 9" stroke="currentColor" opacity=".3" />
      </>}
      {kind === 'screening' && <>
        {[0, 1, 2].map(n => <g key={n} transform={`translate(${n * 16},${n * -13})`}>
          <path d="m83 74 119-34 70 42-119 34-70-42Z" fill="white" stroke="currentColor" strokeOpacity=".25" />
          <path d="m83 74 70 42 119-34v9l-119 34-70-42Z" fill="currentColor" opacity=".09" />
          {[0, 1, 2, 3, 4].map(j => <circle key={j} cx={132 + j * 23} cy={75 - j * 6.5} r="4" fill="currentColor" opacity={.2 + j * .15} />)}
        </g>)}
        <circle cx="246" cy="104" r="17" fill="currentColor" /><path d="m239 104 5 5 9-10" stroke="white" strokeWidth="2.5" />
      </>}
      {kind === 'dynamics' && <>
        {[0, 1, 2, 3, 4].map(n => <path key={n} d={`M45 ${95 - n * 12}c28 0 23-40 47-25s20 53 42 24 15-61 43-29 17 60 47 18 27-38 48-12 19 16 42 6`} stroke={`url(#${id})`} strokeWidth={n === 2 ? 3 : 1.5} opacity={n === 2 ? 1 : .25} />)}
        <path d="M45 119h270M45 30v89" stroke="currentColor" opacity=".2" strokeDasharray="3 4" /><circle cx="177" cy="65" r="5" fill="currentColor" /><circle cx="177" cy="65" r="10" stroke="currentColor" opacity=".25" />
      </>}
    </svg>
    <span>{kind === 'design' ? '01 / GENERATE' : kind === 'screening' ? '02 / EVALUATE' : '03 / UNDERSTAND'}</span>
  </div>;
}
