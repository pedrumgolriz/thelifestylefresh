import { prisma } from "@/lib/db";
import { getMembershipSnapshot } from "@/lib/membership";

export default async function AdminHomePage() {
  const [requests, invites, seats, posts, letters] = await Promise.all([
    prisma.inviteRequest.count({ where: { status: "pending" } }),
    prisma.invite.count(),
    getMembershipSnapshot(),
    prisma.post.count({ where: { published: true } }),
    prisma.newsletterSignup.count(),
  ]);

  const stats = [
    ["Seated", `${seats.occupied} / ${seats.cap}`],
    ["Open seats", seats.remaining],
    ["Waiting", seats.waitlisted],
    ["Pending requests", requests],
    ["Invites", invites],
    ["Published essays", posts],
    ["Newsletter", letters],
  ] as const;

  return (
    <div>
      <p className="eyebrow">Desk</p>
      <h1 className="serif mt-3 text-5xl tracking-[-0.045em]">The house, this morning.</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="stationery p-6">
            <p className="eyebrow">{label}</p>
            <p className="serif mt-3 text-4xl tracking-[-0.04em]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
