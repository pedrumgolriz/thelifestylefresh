import type { MembershipSnapshot } from "@/lib/membership";

export function SeatMeter({ seats }: { seats: MembershipSnapshot }) {
  const taken = Math.min(seats.occupied, seats.cap);
  const label =
    seats.atCapacity
      ? `The table is full. ${seats.cap} of ${seats.cap} seats taken.`
      : `${seats.remaining} ${seats.remaining === 1 ? "place remains" : "places remain"} of ${seats.cap}.`;

  return (
    <div className="mt-4 max-w-sm">
      <p className="text-sm text-seal">{label}</p>
      <div
        className="scarcity-track mt-2"
        role="meter"
        aria-label="Seats taken"
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
