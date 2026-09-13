import { getMembershipSnapshot } from "@/lib/membership";

export default async function AdminSettingsPage() {
  const seats = await getMembershipSnapshot();

  return (
    <div className="max-w-xl">
      <p className="eyebrow">The table</p>
      <h1 className="serif mt-3 text-4xl">How many we keep.</h1>
      <p className="mt-4 text-sm leading-6 text-ink-soft">
        {seats.occupied} seated of {seats.cap}. {seats.remaining} open. {seats.waitlisted} waiting.
        Raise the cap when the house can still post honestly. A canceled membership frees a
        seat and the oldest wait moves to pending.
      </p>
      <form action="/api/admin/settings" method="post" className="mt-8 grid gap-3">
        <label className="grid gap-2 text-sm">
          Member cap
          <input
            className="field"
            type="number"
            name="memberCap"
            min={1}
            defaultValue={seats.cap}
            required
          />
        </label>
        <button className="btn btn-ink">Save the table</button>
      </form>
    </div>
  );
}
