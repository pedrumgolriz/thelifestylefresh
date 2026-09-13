import { prisma } from "@/lib/db";
import { SHARE_CODES_PER_ENVELOPE } from "@/lib/house";

export const dynamic = "force-dynamic";

export default async function AdminEditionsPage() {
  const [editions, memberCount] = await Promise.all([
    prisma.edition.findMany({
      include: { items: { orderBy: { sortOrder: "asc" } }, invites: { select: { id: true } } },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    }),
    prisma.user.count({ where: { role: "MEMBER" } }),
  ]);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="eyebrow-brass">Editions</p>
        <h1 className="serif mt-3 text-4xl tracking-[-0.02em]">This month’s seal.</h1>
        <form action="/api/admin/editions" method="post" className="mt-6 grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input className="field" name="month" type="number" min={1} max={12} placeholder="Month" required />
            <input className="field" name="year" type="number" min={2026} placeholder="Year" required />
          </div>
          <input className="field" name="title" required placeholder="Title" />
          <textarea className="field min-h-32" name="letter" required placeholder="Letter" />
          <textarea
            className="field min-h-40"
            name="items"
            placeholder={"One item per line: Category | Name | Description"}
          />
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" name="published" defaultChecked />
            Published
          </label>
          <button className="btn btn-ink">Save edition</button>
        </form>

        <div className="stationery mt-10 p-5">
          <p className="eyebrow-brass">Share invitations</p>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Members on file: <span className="serif text-lg text-ink">{memberCount}</span>. Each
            envelope carries a few one-time codes a member may pass to a friend. Generate a batch
            for an edition, then download the CSV to print and slip into the letters.
          </p>
          <p className="mt-3 text-xs text-ink-soft">
            Codes are <span className="text-ink">LF-SHARE-XXXXXX</span>, one-time use, not locked to
            an inbox. A friend redeems at{" "}
            <span className="text-ink">/join?code=LF-SHARE-XXXXXX</span>.
          </p>
        </div>
      </div>
      <div className="space-y-8">
        {editions.map((edition) => {
          const codes = edition.invites.length;
          const perMember = memberCount > 0 ? Math.ceil(codes / memberCount) : 0;
          return (
            <article key={edition.id} className="stationery p-6">
              <p className="eyebrow">
                {edition.month}/{edition.year} · {edition.published ? "Published" : "Draft"}
              </p>
              <h2 className="serif mt-2 text-3xl tracking-[-0.03em]">{edition.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{edition.letter}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {edition.items.map((item) => (
                  <li key={item.id}>
                    <span className="text-ink-soft">{item.category}</span> — {item.name}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-[var(--rule)] pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="eyebrow-brass">Share codes</p>
                  <p className="text-sm text-ink-soft">
                    {codes} generated{perMember > 0 ? ` · ≈${perMember}/member` : ""}
                  </p>
                </div>

                <form action={`/api/admin/editions/${edition.id}/generate`} method="post" className="mt-3 flex flex-wrap items-end gap-3">
                  <label className="text-sm text-ink-soft">
                    Codes per member
                    <input
                      className="field mt-1 w-28"
                      name="codesPerMember"
                      type="number"
                      min={1}
                      max={50}
                      defaultValue={SHARE_CODES_PER_ENVELOPE}
                    />
                  </label>
                  <button className="btn btn-ink">Generate codes</button>
                  <span className="text-xs text-ink-soft">
                    ≈ {memberCount} × {SHARE_CODES_PER_ENVELOPE} = {memberCount * SHARE_CODES_PER_ENVELOPE} at the default
                  </span>
                </form>

                {codes > 0 ? (
                  <a
                    className="btn btn-ghost mt-3"
                    href={`/api/admin/editions/${edition.id}/codes.csv`}
                  >
                    Download CSV ({codes})
                  </a>
                ) : (
                  <p className="mt-3 text-xs text-ink-soft">
                    No codes yet for this edition.
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
