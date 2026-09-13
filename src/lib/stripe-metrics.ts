import { getStripe } from "./stripe";

export type RevenuePoint = {
  month: string; // "Apr 2026"
  amount: number; // USD
};

export type RecentPayment = {
  id: string;
  amount: number; // USD
  created: number; // unix seconds
  status: string | null;
  customerEmail: string | null;
};

export type StripeMetrics = {
  configured: boolean;
  activeSubscriptions: number;
  mrr: number; // monthly recurring revenue, USD
  customers: number;
  customersExact: boolean;
  revenueSeries: RevenuePoint[]; // last 12 months, paid invoices
  recentPayments: RecentPayment[]; // last 6 paid invoices
  currency: string;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function monthKey(ts: number) {
  const d = new Date(ts * 1000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function normalizeMonthly(amount: number, interval: string | undefined | null) {
  switch (interval) {
    case "year":
      return amount / 12;
    case "week":
      return (amount * 52) / 12;
    case "day":
      return (amount * 365) / 12;
    default:
      return amount; // month
  }
}

function emptyMetrics(): StripeMetrics {
  return {
    configured: false,
    activeSubscriptions: 0,
    mrr: 0,
    customers: 0,
    customersExact: true,
    revenueSeries: [],
    recentPayments: [],
    currency: "usd",
  };
}

/**
 * Pull a small, dashboard-sized snapshot from Stripe.
 * Gracefully degrades when Stripe isn't configured or unreachable.
 */
export async function getStripeMetrics(): Promise<StripeMetrics> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return emptyMetrics();
  }

  try {
    const stripe = getStripe();

    const [subs, customersPage, invoices] = await Promise.all([
      stripe.subscriptions.list({ status: "active", limit: 100 }),
      stripe.customers.list({ limit: 100 }),
      stripe.invoices.list({ status: "paid", limit: 100 }),
    ]);

    let mrr = 0;
    for (const sub of subs.data) {
      for (const item of sub.items.data) {
        const amount = item.price?.unit_amount ?? 0;
        const quantity = item.quantity ?? 1;
        const interval = item.price?.recurring?.interval;
        mrr += normalizeMonthly((amount * quantity) / 100, interval);
      }
    }

    const customersExact = !customersPage.has_more;
    const customers = customersPage.data.length;

    // Build last-12-months revenue series from paid invoices.
    const now = new Date();
    const seriesMap = new Map<string, number>();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
      seriesMap.set(`${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`, 0);
    }
    for (const inv of invoices.data) {
      const key = monthKey(inv.created);
      if (seriesMap.has(key)) {
        seriesMap.set(key, (seriesMap.get(key) ?? 0) + (inv.total / 100));
      }
    }
    const revenueSeries = Array.from(seriesMap.entries()).map(([month, amount]) => ({
      month,
      amount: Math.round(amount * 100) / 100,
    }));

    const recentPayments: RecentPayment[] = invoices.data
      .slice(0, 6)
      .map((inv) => ({
        id: inv.id,
        amount: inv.total / 100,
        created: inv.created,
        status: inv.status,
        customerEmail: (inv.customer_email as string | null) ?? null,
      }));

    return {
      configured: true,
      activeSubscriptions: subs.data.length,
      mrr: Math.round(mrr * 100) / 100,
      customers,
      customersExact,
      revenueSeries,
      recentPayments,
      currency: "usd",
    };
  } catch {
    return emptyMetrics();
  }
}
