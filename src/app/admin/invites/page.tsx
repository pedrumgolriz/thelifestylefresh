import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminInvitesPage() {
  const invites = await prisma.invite.findMany({
    orderBy: { createdAt: "desc" },
    include: { issuedByEdition: true },
  });

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="eyebrow-brass">Invites</p>
        <h1 className="serif mt-3 text-4xl tracking-[-0.02em]">Codes.</h1>
        <form action="/api/admin/invites" method="post" className="mt-6 grid gap-3">
          <input className="field" name="code" placeholder="Code (blank to generate)" />
          <input className="field" name="email" type="email" placeholder="Lock to email (optional)" />
          <input className="field" name="note" placeholder="Note" />
          <input className="field" name="maxUses" type="number" min={1} defaultValue={1} />
          <button className="btn btn-ink">Create invitation</button>
        </form>
        <p className="mt-6 text-sm text-ink-soft">
          Share codes (<span className="text-ink">LF-SHARE-…</span>) are generated in batches on the
          Editions page.
        </p>
      </div>
      <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {invites.map((invite) => (
          <div key={invite.id} className="py-5">
            <p className="serif text-2xl tracking-[0.08em]">{invite.code}</p>
            <p className="mt-1 text-sm text-ink-soft">
              {invite.usedCount}/{invite.maxUses} used
              {invite.email ? ` · ${invite.email}` : ""}
              {invite.note ? ` · ${invite.note}` : ""}
              {invite.issuedByEdition
                ? ` · ${invite.issuedByEdition.month}/${invite.issuedByEdition.year}`
                : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
