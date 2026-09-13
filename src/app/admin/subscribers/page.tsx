import { prisma } from "@/lib/db";

export default async function AdminSubscribersPage() {
  const members = await prisma.user.findMany({
    where: { role: "MEMBER" },
    include: { subscription: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p className="eyebrow-brass">Members</p>
      <h1 className="serif mt-3 text-4xl tracking-[-0.02em]">The list.</h1>
      <div className="mt-8 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {members.map((member) => (
          <div key={member.id} className="grid gap-2 py-5 md:grid-cols-[1.2fr_1fr_0.6fr]">
            <div>
              <p className="serif text-2xl tracking-[-0.03em]">{member.name || member.email}</p>
              <p className="text-sm text-ink-soft">{member.email}</p>
            </div>
            <p className="text-sm text-ink-soft">
              {[member.addressLine1, member.city, member.state, member.postalCode]
                .filter(Boolean)
                .join(", ")}
            </p>
            <p className="text-sm capitalize text-ink-soft">{member.subscription?.status || "none"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
