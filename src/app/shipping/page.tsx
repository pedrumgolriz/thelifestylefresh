import type { Metadata } from "next";
import { EXCLUDED_US_REGIONS, SHIPPING_COPY, SHIPPING_SHORT } from "@/lib/us";

export const metadata: Metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-16">
      <p className="eyebrow">The post</p>
      <h1 className="serif mt-4 text-5xl tracking-[-0.045em]">{SHIPPING_SHORT}</h1>
      <div className="prose-lf mt-8">
        <p>{SHIPPING_COPY}</p>
        <p>We do not currently ship to:</p>
        <ul className="list-disc space-y-1 pl-5">
          {EXCLUDED_US_REGIONS.map((region) => (
            <li key={region}>{region}</li>
          ))}
          <li>Any address outside the United States</li>
        </ul>
        <p>
          Membership checkout only accepts the contiguous forty-eight states plus
          Washington, D.C. Shipping is included in the monthly correspondence. If you move
          within that map, update the address before the next seal. If a parcel cannot be
          delivered because the address sits outside it, the desk will write.
        </p>
      </div>
    </div>
  );
}
