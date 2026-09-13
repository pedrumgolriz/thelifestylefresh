import Link from "next/link";
import { BarChart, Donut, LineChart, Sparkline, chartColors } from "@/components/admin/charts";
import { prisma } from "@/lib/db";
import { getMembershipSnapshot } from "@/lib/membership";
import { getStripeMetrics } from "@/lib/stripe-metrics";

export const dynamic = "force-dynamic";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthBuckets(count = 12) {
  const now = new Date();
  const buckets: { key: string; label: string; start: Date; end: Date }[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i + 1, 1));
    buckets.push({
      key: `${start.getUTCFullYear()}-${start.getUTCMonth()}`,
      label: `${MONTHS[start.getUTCMonth()]}`,
      start,
      end,
    });
  }
  return buckets;
}

function seriesFromDates(dates: Date[], buckets: ReturnType<typeof monthBuckets>) {
  const counts = new Map(buckets.map((b) => [b.key, 0]));
  for (const d of dates) {
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
    if (counts.has(key)) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return buckets.map((b) => ({ label: b.label, value: counts.get(b.key) ?? 0 }));
}

function cumulative(values: number[]) {
  let sum = 0;
  return values.map((v) => (sum += v));
}

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default async function AdminHomePage() {
  const buckets = monthBuckets(12);

  const [
    pendingRequests,
    inviteCount,
    seats,
    posts,
    letters,
    members,
    memberDates,
    requestDates,
    waitlistDates,
    stripe,
  ] = await Promise.all([
    prisma.inviteRequest.count({ where: { status: "pending" } }),
    prisma.invite.count(),
    getMembershipSnapshot(),
    prisma.post.count({ where: { published: true } }),
    prisma.newsletterSignup.count(),
    prisma.user.count({ where: { role: "MEMBER" } }),
    prisma.user.findMany({ where: { role: "MEMBER" }, select: { createdAt: true } }),
    prisma.inviteRequest.findMany({ select: { createdAt: true, status: true } }),
    prisma.inviteRequest.findMany({ where: { status: "waitlisted" }, select: { createdAt: true } }),
    getStripeMetrics(),
  ]);

  const membersByMonth = seriesFromDates(
    memberDates.map((m) => m.createdAt),
    buckets,
  );
  const requestsByMonth = seriesFromDates(
    requestDates.map((r) => r.createdAt),
    buckets,
  );
  const waitlistByMonth = seriesFromDates(
    waitlistDates.map((w) => w.createdAt),
    buckets,
  );

  const seatedSpark = cumulative(membersByMonth.map((m) => m.value));
  const waitingSpark = cumulative(waitlistByMonth.map((m) => m.value));
  const revenueSpark = stripe.revenueSeries.map((p) => p.amount);

  const recentRequests = await prisma.inviteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats: { label: string; value: string; spark?: number[]; sparkColor?: string }[] = [
    { label: "Seated", value: `${seats.occupied} / ${seats.cap}`, spark: seatedSpark, sparkColor: chartColors.INK },
    { label: "Open seats", value: String(seats.remaining) },
    { label: "Waiting", value: String(seats.waitlisted), spark: waitingSpark, sparkColor: chartColors.LILAC },
    { label: "Pending requests", value: String(pendingRequests), spark: requestsByMonth.map((m) => m.value), sparkColor: chartColors.BRASS },
    { label: "MRR", value: stripe.configured ? formatUSD(stripe.mrr) : "—", spark: revenueSpark.length > 1 ? revenueSpark : undefined, sparkColor: chartColors.OXBLOOD },
    { label: "Active subscriptions", value: stripe.configured ? String(stripe.activeSubscriptions) : "—" },
  ];

  const tableSegments = [
    { label: "Seated", value: seats.occupied, color: chartColors.INK },
    { label: "Open", value: seats.remaining, color: "#e8ded0" },
    { label: "Waiting", value: seats.waitlisted, color: chartColors.LILAC },
  ];

  return (
    <div>
      <p className="eyebrow-brass">Overview</p>
      <h1 className="serif mt-3 text-5xl tracking-[-0.02em]">The house, this morning.</h1>

      {!stripe.configured ? (
        <p className="mt-6 max-w-2xl border border-[var(--rule)] bg-[var(--paper-warm)] px-5 py-4 text-sm leading-6 text-ink-soft">
          Stripe isn&apos;t connected, so revenue and subscription figures are paused. Add{" "}
          <code className="text-ink">STRIPE_SECRET_KEY</code> in{" "}
          <code className="text-ink">.env</code> to see MRR, active subscriptions, and the
          revenue chart.
        </p>
      ) : null}

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="stationery p-6">
            <p className="eyebrow">{stat.label}</p>
            <p className="serif mt-3 text-4xl tracking-[-0.02em]">{stat.value}</p>
            {stat.spark && stat.spark.length > 1 ? (
              <div className="mt-4">
                <Sparkline values={stat.spark} color={stat.sparkColor} />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Revenue + table */}
      <div className="mt-px grid gap-px lg:grid-cols-[1.4fr_1fr]">
        <div className="stationery p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Revenue</p>
              <p className="serif mt-2 text-2xl">Last twelve months</p>
            </div>
            <p className="serif text-2xl text-ink-soft">
              {stripe.configured ? formatUSD(stripe.revenueSeries.reduce((s, p) => s + p.amount, 0)) : "—"}
            </p>
          </div>
          <div className="mt-6">
            <LineChart
              points={stripe.revenueSeries.map((p) => ({ label: p.month, value: p.amount }))}
              format={formatUSD}
            />
          </div>
        </div>
        <div className="stationery p-7">
          <p className="eyebrow">The table</p>
          <p className="serif mt-2 text-2xl">{seats.cap} names at a time</p>
          <div className="mt-6">
            <Donut
              segments={tableSegments}
              centerLabel="kept"
              centerValue={`${seats.occupied}`}
            />
          </div>
        </div>
      </div>

      {/* Members + requests by month */}
      <div className="mt-px grid gap-px lg:grid-cols-2">
        <div className="stationery p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">New members</p>
              <p className="serif mt-2 text-2xl">By month</p>
            </div>
            <p className="serif text-2xl text-ink-soft">{members}</p>
          </div>
          <div className="mt-6">
            <BarChart points={membersByMonth} color={chartColors.INK} />
          </div>
        </div>
        <div className="stationery p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Requests</p>
              <p className="serif mt-2 text-2xl">By month</p>
            </div>
            <p className="serif text-2xl text-ink-soft">{requestDates.length}</p>
          </div>
          <div className="mt-6">
            <BarChart points={requestsByMonth} color={chartColors.BRASS} />
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-px grid gap-px lg:grid-cols-2">
        <div className="stationery p-7">
          <div className="flex items-end justify-between gap-4">
            <p className="eyebrow">Recent payments</p>
            <span className="text-xs text-ink-soft">via Stripe</span>
          </div>
          <ul className="mt-5 divide-y divide-[var(--rule)]">
            {stripe.configured && stripe.recentPayments.length > 0 ? (
              stripe.recentPayments.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="text-ink-soft">
                    {new Date(p.created * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="truncate text-ink-soft">{p.customerEmail || "—"}</span>
                  <span className="serif ml-auto">{formatUSD(p.amount)}</span>
                </li>
              ))
            ) : (
              <li className="py-6 text-sm text-ink-soft">
                {stripe.configured ? "No paid invoices yet." : "Connect Stripe to see payments."}
              </li>
            )}
          </ul>
        </div>
        <div className="stationery p-7">
          <div className="flex items-end justify-between gap-4">
            <p className="eyebrow">Recent requests</p>
            <Link href="/admin/requests" className="link-quiet">
              All
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-[var(--rule)]">
            {recentRequests.length > 0 ? (
              recentRequests.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="serif text-base">{r.name}</span>
                  <span className="truncate text-ink-soft">{r.email}</span>
                  <span className="ml-auto text-xs uppercase tracking-[0.14em] text-ink-soft">
                    {r.status}
                  </span>
                </li>
              ))
            ) : (
              <li className="py-6 text-sm text-ink-soft">No one has written yet.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Quiet secondary counts */}
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-soft">
        <span>Invites issued: <span className="serif text-ink">{inviteCount}</span></span>
        <span>Published essays: <span className="serif text-ink">{posts}</span></span>
        <span>Newsletter names: <span className="serif text-ink">{letters}</span></span>
        {stripe.configured ? (
          <span>Stripe customers: <span className="serif text-ink">{stripe.customers}{stripe.customersExact ? "" : "+"}</span></span>
        ) : null}
      </div>
    </div>
  );
}
