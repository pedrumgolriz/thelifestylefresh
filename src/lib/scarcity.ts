export const SEASON_CAPACITY = Number(process.env.NEXT_PUBLIC_SEATS_CAPACITY ?? 40);
export const SEASON_REMAINING = Number(process.env.NEXT_PUBLIC_SEATS_REMAINING ?? 11);
export const MEMBERSHIP_TWENTY = "twenty a month";

export function seasonState(remaining = SEASON_REMAINING) {
  if (remaining <= 0) return "closed" as const;
  if (remaining <= 10) return "last" as const;
  return "open" as const;
}

export function filledPercent(remaining = SEASON_REMAINING, capacity = SEASON_CAPACITY) {
  const used = Math.max(0, capacity - remaining);
  return Math.min(98, Math.max(4, Math.round((used / capacity) * 100)));
}
