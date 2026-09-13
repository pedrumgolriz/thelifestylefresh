import { prisma } from "@/lib/db";

export default async function AdminNewsletterPage() {
  const rows = await prisma.newsletterSignup.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <p className="eyebrow-brass">Newsletter</p>
      <h1 className="serif mt-3 text-4xl tracking-[-0.02em]">Digital letters.</h1>
      <div className="mt-8 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {rows.map((row) => (
          <div key={row.id} className="flex justify-between gap-4 py-4 text-sm">
            <p>{row.email}</p>
            <p className="text-ink-soft">{row.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
