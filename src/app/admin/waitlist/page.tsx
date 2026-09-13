import { prisma } from "@/lib/db";
import { getMembershipSnapshot } from "@/lib/membership";

export default async function AdminWaitlistPage() {
  const [seats, waiting] = await Promise.all([
    getMembershipSnapshot(),
    prisma.inviteRequest.findMany({
      where: { status: "waitlisted" },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <div>
      <p className="eyebrow">Wait</p>
      <h1 className="serif mt-3 text-4xl">Until a seat opens.</h1>
      <p className="mt-3 text-sm text-ink-soft">
        {seats.remaining} open · {waiting.length} waiting. Oldest first. Issue a card only if
        a seat is free — or raise the cap first.
      </p>
      <div className="mt-8 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {waiting.map((request, index) => (
          <div key={request.id} className="grid gap-4 py-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="serif text-2xl">{request.name}</p>
              <p className="text-sm text-ink-soft">
                #{index + 1} · {request.email} · {request.city}, {request.state}
              </p>
              <p className="mt-2 text-sm leading-6">{request.note}</p>
            </div>
            <form action={`/api/admin/requests/${request.id}`} method="post">
              <button className="btn btn-ink" disabled={seats.atCapacity}>
                {seats.atCapacity ? "No seat" : "Issue invite"}
              </button>
            </form>
          </div>
        ))}
        {waiting.length === 0 ? <p className="py-8 text-sm text-ink-soft">No one waits.</p> : null}
      </div>
    </div>
  );
}
