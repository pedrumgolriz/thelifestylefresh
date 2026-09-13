import { prisma } from "./db";
import { HOUSE_CAP } from "./house";

const ACTIVE = ["active", "trialing"] as const;
const DEFAULT_CAP = Number(process.env.MEMBER_CAP ?? HOUSE_CAP);

export type MembershipSnapshot = {
  cap: number;
  occupied: number;
  remaining: number;
  waitlisted: number;
  atCapacity: boolean;
  state: "open" | "last" | "closed";
};

export async function getHouseConfig() {
  return prisma.houseConfig.upsert({
    where: { id: "house" },
    update: {},
    create: { id: "house", memberCap: DEFAULT_CAP },
  });
}

export async function countOccupiedSeats() {
  return prisma.subscription.count({
    where: { status: { in: [...ACTIVE] } },
  });
}

export async function getMembershipSnapshot(): Promise<MembershipSnapshot> {
  try {
    const [config, occupied, waitlisted] = await Promise.all([
      getHouseConfig(),
      countOccupiedSeats(),
      prisma.inviteRequest.count({ where: { status: "waitlisted" } }),
    ]);
    const remaining = Math.max(0, config.memberCap - occupied);
    return {
      cap: config.memberCap,
      occupied,
      remaining,
      waitlisted,
      atCapacity: remaining <= 0,
      state: remaining <= 0 ? "closed" : remaining <= 10 ? "last" : "open",
    };
  } catch {
    return {
      cap: DEFAULT_CAP,
      occupied: 0,
      remaining: DEFAULT_CAP,
      waitlisted: 0,
      atCapacity: false,
      state: "open",
    };
  }
}

export async function setMemberCap(memberCap: number) {
  const cap = Math.max(1, Math.floor(memberCap));
  return prisma.houseConfig.upsert({
    where: { id: "house" },
    update: { memberCap: cap },
    create: { id: "house", memberCap: cap },
  });
}

export async function promoteWaitlist(limit: number) {
  const take = Math.max(0, Math.floor(limit));
  if (take === 0) return 0;

  const waiting = await prisma.inviteRequest.findMany({
    where: { status: "waitlisted" },
    orderBy: { createdAt: "asc" },
    take,
    select: { id: true },
  });
  if (waiting.length === 0) return 0;

  await prisma.inviteRequest.updateMany({
    where: { id: { in: waiting.map((entry) => entry.id) } },
    data: { status: "pending" },
  });
  return waiting.length;
}

export async function enqueueWaitlist(entry: {
  name: string;
  email: string;
  city?: string;
  state?: string;
  note?: string;
}) {
  return prisma.inviteRequest.create({
    data: {
      name: entry.name,
      email: entry.email.toLowerCase(),
      city: entry.city,
      state: entry.state,
      note: entry.note,
      status: "waitlisted",
    },
  });
}
