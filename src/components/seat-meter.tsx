import type { MembershipSnapshot } from "@/lib/membership";

export function SeatMeter({ seats }: { seats: MembershipSnapshot }) {
  const taken = Math.min(seats.occupied, seats.cap);
  const kept = `${taken} / ${seats.cap} names currently kept`;
  const label = seats.atCapacity
    ? `The house is full. ${seats.cap} of ${seats.cap} names kept.`
    : seats.remaining === 1
      ? `${kept}. One place remains.`
      : `${kept}. ${seats.remaining} places remain.`;

  return (
    <div className="mt-4 max-w-sm">
      <p className="text-sm text-lilac-deep">{label}</p>
      <div
        className="scarcity-track mt-3"
        role="meter"
        aria-label="Names kept at the house"
        aria-valuemin={0}
        aria-valuemax={seats.cap}
        aria-valuenow={taken}
        aria-valuetext={label}
      >
        <div
          className="scarcity-fill"
          style={{ width: `${seats.cap ? (taken / seats.cap) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}
