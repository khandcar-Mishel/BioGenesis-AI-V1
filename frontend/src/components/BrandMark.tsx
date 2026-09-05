/** The one logo mark, reused across the marketing navbar, footer and the workspace app shell. */
export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-lg bg-slate-900 shrink-0"
      style={{ height: size, width: size }}
    >
      <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 20 20">
        <path
          d="M5 2.5c0 5 10 5 10 10s-10 5-10 10M5 5.5c0 3.5 10 3.5 10 7s-10 3.5-10 7"
          fill="none"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
