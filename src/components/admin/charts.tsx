// Lightweight inline-SVG charts for the desk. No charting dependency.
// All charts are server-renderable (no client JS) and scale to their container.

type Point = { label: string; value: number };

const INK = "var(--ink)";
const LILAC = "var(--lilac)";
const BRASS = "var(--brass)";
const OXBLOOD = "var(--oxblood)";
const PAPER_DEEP = "var(--paper-deep)";

function Empty({ label = "No data yet" }: { label?: string }) {
  return (
    <div className="flex h-32 items-center justify-center text-sm text-ink-soft">{label}</div>
  );
}

function maxOf(points: Point[]) {
  return Math.max(...points.map((p) => p.value), 1);
}

/** A tiny trend line for a stat card. */
export function Sparkline({
  values,
  color = INK,
  height = 36,
}: {
  values: number[];
  color?: string;
  height?: number;
}) {
  if (values.length < 2) return <div style={{ height }} aria-hidden="true" />;
  const w = 100;
  const h = height;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const step = w / (values.length - 1);
  const coords = values.map((v, i) => [i * step, h - 2 - ((v - min) / span) * (h - 4)]);
  const d = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0].toFixed(2)},${c[1].toFixed(2)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** An area + line chart for a monthly series (e.g. revenue). */
export function LineChart({
  points,
  height = 200,
  format = (n) => String(n),
}: {
  points: Point[];
  height?: number;
  format?: (n: number) => string;
}) {
  if (points.length === 0) return <Empty label="No revenue yet" />;
  const w = 320;
  const h = height;
  const padX = 8;
  const padTop = 16;
  const padBottom = 24;
  const max = maxOf(points);
  const innerW = w - padX * 2;
  const innerH = h - padTop - padBottom;
  const step = points.length > 1 ? innerW / (points.length - 1) : 0;
  const coords = points.map((p, i) => {
    const x = padX + i * step;
    const y = padTop + innerH - (p.value / max) * innerH;
    return [x, y];
  });
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0].toFixed(2)},${c[1].toFixed(2)}`).join(" ");
  const area = `${line} L${coords[coords.length - 1][0].toFixed(2)},${padTop + innerH} L${coords[0][0].toFixed(2)},${padTop + innerH} Z`;
  const labelEvery = Math.ceil(points.length / 6);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" role="img" aria-label="line chart">
      <defs>
        <linearGradient id="lf-line-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={LILAC} stopOpacity={0.28} />
          <stop offset="100%" stopColor={LILAC} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lf-line-fill)" />
      <path d={line} fill="none" stroke={INK} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => (
        <circle key={i} cx={c[0]} cy={c[1]} r={2.2} fill={INK} vectorEffect="non-scaling-stroke" />
      ))}
      {/* x labels rendered in HTML below for crispness */}
      <g>
        {coords.map((c, i) =>
          i % labelEvery === 0 || i === coords.length - 1 ? (
            <text
              key={`t-${i}`}
              x={c[0]}
              y={h - 6}
              fontSize={7}
              textAnchor="middle"
              fill="var(--ink-faint)"
            >
              {points[i].label}
            </text>
          ) : null,
        )}
      </g>
      <title>{`Max ${format(max)}`}</title>
    </svg>
  );
}

/** A vertical bar chart. */
export function BarChart({
  points,
  height = 200,
  color = INK,
  format = (n) => String(n),
}: {
  points: Point[];
  height?: number;
  color?: string;
  format?: (n: number) => string;
}) {
  if (points.length === 0) return <Empty />;
  const w = 320;
  const h = height;
  const padTop = 14;
  const padBottom = 24;
  const innerH = h - padTop - padBottom;
  const max = maxOf(points);
  const slot = w / points.length;
  const barW = slot * 0.56;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" role="img" aria-label="bar chart">
      {points.map((p, i) => {
        const bh = (p.value / max) * innerH;
        const x = i * slot + (slot - barW) / 2;
        const y = padTop + innerH - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} fill={color}>
              <title>{`${p.label}: ${format(p.value)}`}</title>
            </rect>
            <text x={x + barW / 2} y={h - 6} fontSize={7} textAnchor="middle" fill="var(--ink-faint)">
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

type Segment = { label: string; value: number; color: string };

/** A donut chart with a centered total. */
export function Donut({
  segments,
  centerLabel,
  centerValue,
  size = 168,
}: {
  segments: Segment[];
  centerLabel?: string;
  centerValue?: string | number;
  size?: number;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = 42;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const computed = segments.reduce(
    (acc, s, i) => {
      const len = (s.value / total) * circumference;
      return {
        offset: acc.offset + len,
        items: [
          ...acc.items,
          {
            key: i,
            len,
            dashOffset: -acc.offset,
            color: s.color,
            label: s.label,
            value: s.value,
          },
        ],
      };
    },
    { offset: 0, items: [] as { key: number; len: number; dashOffset: number; color: string; label: string; value: number }[] },
  );
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="donut chart">
        <circle cx="60" cy="60" r={radius} fill="none" stroke={PAPER_DEEP} strokeWidth={stroke} />
        {computed.items.map((s) => (
          <circle
            key={s.key}
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${s.len} ${circumference - s.len}`}
            strokeDashoffset={s.dashOffset}
            transform="rotate(-90 60 60)"
            strokeLinecap="butt"
          >
            <title>{`${s.label}: ${s.value}`}</title>
          </circle>
        ))}
        {centerValue !== undefined ? (
          <text x="60" y="56" textAnchor="middle" fontSize="20" fill={INK} fontFamily="var(--font-display), Georgia, serif">
            {centerValue}
          </text>
        ) : null}
        {centerLabel ? (
          <text x="60" y="72" textAnchor="middle" fontSize="6.5" letterSpacing="1.5" fill="var(--ink-faint)">
            {centerLabel.toUpperCase()}
          </text>
        ) : null}
      </svg>
      <ul className="grid gap-2 text-sm">
        {segments.map((s, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: s.color }} aria-hidden="true" />
            <span className="text-ink-soft">{s.label}</span>
            <span className="serif ml-auto pl-3">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const chartColors = { INK, LILAC, BRASS, OXBLOOD };
