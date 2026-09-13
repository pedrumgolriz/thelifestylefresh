import { prisma } from "@/lib/db";
import { getMembershipSnapshot } from "@/lib/membership";

export default async function AdminRequestsPage() {
  const [requests, seats] = await Promise.all([
    prisma.inviteRequest.findMany({
      orderBy: { createdAt: "desc" },
    }),
    getMembershipSnapshot(),
  ]);

  return (
    <div>
      <p className="eyebrow">Requests</p>
      <h1 className="serif mt-3 text-4xl tracking-[-0.04em]">Who asked.</h1>
      <div className="mt-8 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {requests.map((request) => (
          <div key={request.id} className="grid gap-4 py-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="serif text-2xl tracking-[-0.03em]">{request.name}</p>
              <p className="text-sm text-ink-soft">
                {request.email} · {request.city}, {request.state} · {request.status}
              </p>
              <p className="mt-2 text-sm leading-6">{request.note}</p>
            </div>
            {request.status === "pending" || request.status === "waitlisted" ? (
              <form action={`/api/admin/requests/${request.id}`} method="post">
                <button className="btn btn-ink" name="intent" value="invite" disabled={seats.atCapacity}>
                  {seats.atCapacity ? "No seat" : "Issue invite"}
                </button>
              </form>
            ) : (
              <p className="text-sm text-ink-soft">{request.status}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
