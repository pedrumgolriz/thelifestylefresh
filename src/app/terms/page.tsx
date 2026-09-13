import type { Metadata } from "next";
import Link from "next/link";
import { MEMBERSHIP_PRICE_LABEL } from "@/lib/catalog";
import { SHIPPING_COPY } from "@/lib/us";

export const metadata: Metadata = {
  title: "Terms of Service — The Lifestyle Fresh",
  description:
    "The terms that govern membership in The Lifestyle Fresh, including billing, shipping, cancellation, and the personal use of invitations.",
};

const LAST_UPDATED = "September 13, 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-20">
      <p className="eyebrow-brass">House rules</p>
      <h1 className="serif mt-5 text-5xl tracking-[-0.02em]">Terms of Service</h1>
      <p className="mt-3 text-sm text-ink-soft">Last updated: {LAST_UPDATED}</p>

      <div className="prose-lf mt-8">
        <p className="text-sm italic text-ink-soft">
          These terms are a working draft provided for the convenience of members and visitors.
          They are not legal advice. The Lifestyle Fresh is a small, independent correspondence
          house; before relying on these terms commercially, have qualified counsel review and
          adjust them for your jurisdiction and operations.
        </p>

        <h2>1. About these terms</h2>
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) govern your access to and use of the
          website at thelifestylefresh.com (the &ldquo;Site&rdquo;) and the monthly correspondence
          membership offered by The Lifestyle Fresh (the &ldquo;House&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). By requesting an invitation, redeeming an
          invitation, creating an account, or continuing to use the Site after these Terms take
          effect, you agree to be bound by them. If you do not agree, do not request an invitation
          or use the membership.
        </p>
        <p>
          We may change these Terms from time to time as described in Section 15. The version that
          applies to you is the one posted on the Site on the date your membership is active.
        </p>

        <h2>2. Eligibility</h2>
        <ul>
          <li>
            You must be at least eighteen (18) years old and legally able to enter a binding
            contract to become a member.
          </li>
          <li>
            Membership is invitation-only. You may only redeem an invitation that was issued to
            you, and you may only redeem it once.
          </li>
          <li>
            The membership currently ships within the contiguous United States, including
            Washington, D.C. You must provide a deliverable address in one of those states to
            redeem an invitation and remain a member. {SHIPPING_COPY}
          </li>
          <li>
            You represent that the name and address you provide are yours and are accurate. We may
            pause or close a membership that we believe was opened with false or borrowed details.
          </li>
        </ul>

        <h2>3. The membership</h2>
        <p>
          Membership is {MEMBERSHIP_PRICE_LABEL} per month, billed in advance through Stripe, our
          payment processor. A membership entitles you to one envelope each month, posted to the
          continental U.S. address on your account, for as long as your subscription is active and
          within the membership cap described below.
        </p>
        <p>
          The House keeps a limited number of names at a time. When the membership is full, new
          invitations and renewals may be placed on a wait; a seat is offered only when one opens.
          Having an invitation does not guarantee a seat if the membership is full at the moment
          you redeem.
        </p>
        <p>
          <strong>Contents vary.</strong> Each envelope contains a letter and a selection of small
          items chosen by the House. We promise a point of view and a standard of care, not a
          fixed inventory. The description of any month&rsquo;s envelope is illustrative and may
          change without notice.
        </p>

        <h2>4. Invitations</h2>
        <ul>
          <li>
            An invitation code is personal. It is intended for the person to whom it was given and
            may be revoked if it appears to have been shared, sold, or misused.
          </li>
          <li>
            Each invitation code may be used once. A code that has already been redeemed cannot be
            used again, and a code is marked used only after the related payment succeeds.
          </li>
          <li>
            Some invitations may be locked to a specific email address or may expire. If yours
            is, the Site will tell you when you try to redeem it.
          </li>
          <li>
            We may decline, suspend, or cancel an invitation or membership at any time if we
            believe these Terms have been breached.
          </li>
        </ul>

        <h2>5. Billing and renewal</h2>
        <ul>
          <li>
            Your membership renews automatically each month until you cancel. The recurring charge
            of {MEMBERSHIP_PRICE_LABEL} is processed by Stripe and appears on your statement under
            the House&rsquo;s billing descriptor.
          </li>
          <li>
            Taxes, if any, are included or added as required by your state. We do not store your
            full card number; card data is handled by Stripe and its certified infrastructure.
          </li>
          <li>
            If a payment fails, we (through Stripe) may retry it. If a recurring payment cannot be
            collected after reasonable attempts, your membership may be paused or ended, and any
            open seat may be offered to the next name on the wait.
          </li>
          <li>
            Price changes, if we ever make them, will be communicated in advance. A price change
            takes effect on your next renewal after notice; continuing to renew after notice
            accepts the new price. If you do not accept it, you may cancel before the renewal as
            described in Section 6.
          </li>
        </ul>

        <h2>6. Cancellation and refunds</h2>
        <ul>
          <li>
            You may cancel at any time from the membership page or the Stripe customer portal
            linked from your account. Cancellation stops future renewals; the current month&rsquo;s
            envelope, once sealed and posted, still ships.
          </li>
          <li>
            Because each envelope is assembled and posted for a specific month, monthly charges
            are generally non-refundable once that month&rsquo;s envelope has been sealed. If you
            cancel before the current month&rsquo;s envelope has been sealed, you may request a
            refund of that month&rsquo;s charge by writing the House.
          </li>
          <li>
            If an envelope is lost, damaged, or materially defective in transit, write the House
            with the details and we will make it right at our discretion&mdash;by replacement,
            credit, or refund.
          </li>
          <li>
            Statutory cancellation rights in your state or country are not limited by this
            Section; nothing here removes rights you cannot waive.
          </li>
        </ul>

        <h2>7. Shipping and fulfillment</h2>
        <p>{SHIPPING_COPY}</p>
        <ul>
          <li>
            We post via common carriers from within the continental United States. Delivery
            times are estimates and may vary with the carrier, weather, and address.
          </li>
          <li>
            You are responsible for keeping your address current. Update it before the next seal
            date; we cannot redirect an envelope that has already been sealed. If an envelope is
            returned because the address was wrong or undeliverable, we may re-post it once at
            your expense or treat it as delivered.
          </li>
          <li>
            We are not responsible for delays or failures caused by the carrier, incorrect
            addresses, or events outside our control.
          </li>
        </ul>

        <h2>8. Your account</h2>
        <ul>
          <li>
            You are responsible for keeping your password and account secure and for activity
            that happens under your account. Tell us promptly if you believe your account has been
            used without permission.
          </li>
          <li>
            You may not transfer, sell, or lend your account or membership. A membership is tied to
            a name and an address, not a resalable good.
          </li>
        </ul>

        <h2>9. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>use the Site or membership in any unlawful way or in a way that harms the House or others;</li>
          <li>
            share, sell, or publish invitation codes beyond the personal use intended, or attempt
            to generate, reverse-engineer, or abuse codes;
          </li>
          <li>
            scrape, copy, or overload the Site, or use automated tools to access it without our
            permission;
          </li>
          <li>
            submit false information in an invite request, or impersonate another person or
            entity;
          </li>
          <li>
            use the membership to resell envelopes or their contents as a commercial venture.
          </li>
        </ul>

        <h2>10. The Site and its content</h2>
        <p>
          The Site&rsquo;s writing, design, marks, and the contents of the envelopes are owned by
          or licensed to the House. You may keep and enjoy what is posted to you, and you may
          share occasional excerpts with attribution. You may not reproduce the Site or the
          envelopes wholesale, or use our name or marks to suggest endorsement, without written
          permission.
        </p>

        <h2>11. What you send us</h2>
        <p>
          If you write the House&mdash;in an invite request, a note, a reply, or otherwise&mdash;you
          give us permission to keep and use what you send to consider your request, reply to you,
          and improve the membership. You keep the rights to what you write; you give us a
          non-exclusive licence to use it for those purposes. Please do not send us anything
          confidential or sensitive beyond what is needed to post an envelope.
        </p>

        <h2>12. Disclaimers</h2>
        <p>
          The membership and Site are provided as-is. Envelopes contain small items selected for
          delight and correspondence; they are not professional advice, and nothing in an envelope
          or on the Site is medical, financial, or legal guidance. We do not guarantee that any
          particular item will be included, that delivery will arrive by a specific date, or that
          the Site will be uninterrupted or error-free. To the fullest extent allowed by law, we
          disclaim all warranties, express or implied, including merchantability and fitness for a
          particular purpose.
        </p>

        <h2>13. Limitation of liability</h2>
        <p>
          To the fullest extent allowed by law, neither the House nor anyone acting for it will be
          liable for any indirect, incidental, special, or consequential damages, or for any loss
          of profits or goodwill, arising out of or related to the membership or the
          Site&mdash;even if we have been advised of the possibility of those damages. Our total
          liability for any claim arising out of or related to these Terms or the membership is
          limited to the amount you paid us in the twelve (12) months before the event giving rise
          to the claim, or {MEMBERSHIP_PRICE_LABEL}, whichever is greater.
        </p>

        <h2>14. Governing law and disputes</h2>
        <p>
          These Terms and any dispute are governed by the laws of the U.S. state in which the House
          is operated, without regard to conflict-of-laws rules. Before any claim is filed, you
          agree to first write the House and try in good faith to resolve the matter informally. If
          we cannot, any claim will be brought in the courts of that state, and you consent to
          personal jurisdiction there, except where local law gives you a right to bring a claim in
          your local courts that cannot be waived.
        </p>

        <h2>15. Changes to these terms</h2>
        <p>
          We may update these Terms from time to time. We will post the revised Terms on the Site
          and update the &ldquo;Last updated&rdquo; date above. If a change is material, we will
          also try to notify active members by email. Your continued renewal after a change takes
          effect accepts the revised Terms; if you do not accept them, you may cancel as described
          in Section 6.
        </p>

        <h2>16. Contact</h2>
        <p>
          The House is The Lifestyle Fresh. You may write us at{" "}
          <a className="underline" href="mailto:hello@thelifestylefresh.com">
            hello@thelifestylefresh.com
          </a>{" "}
          for any question about these Terms, your membership, or your account. See also our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className="underline">
            Cookie Notice
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
