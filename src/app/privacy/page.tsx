import type { Metadata } from "next";
import Link from "next/link";
import { SHIPPING_COPY } from "@/lib/us";

export const metadata: Metadata = {
  title: "Privacy Policy — The Lifestyle Fresh",
  description:
    "What The Lifestyle Fresh collects, why it is kept, how it is shared, and the rights you have over your name and address.",
};

const LAST_UPDATED = "September 13, 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-20">
      <p className="eyebrow-brass">House rules</p>
      <h1 className="serif mt-5 text-5xl tracking-[-0.02em]">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-soft">Last updated: {LAST_UPDATED}</p>

      <div className="prose-lf mt-8">
        <p className="text-sm italic text-ink-soft">
          This policy is a working draft provided for the convenience of members and visitors. It
          is not legal advice. Before relying on it commercially, have qualified counsel review and
          adjust it for your jurisdiction, especially if you serve residents of California
          (CCPA), the EU or UK (GDPR), or other regions with specific privacy laws.
        </p>

        <h2>1. Who we are and what this covers</h2>
        <p>
          The Lifestyle Fresh (the &ldquo;House&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a
          small, independent correspondence house that sends a monthly envelope to an
          invitation-only membership. This Privacy Policy explains what we collect about you, why
          we keep it, how we share it, and the choices and rights you have. It applies to the
          website at thelifestylefresh.com (the &ldquo;Site&rdquo;) and to the membership.
        </p>
        <p>
          We are the controller of the personal information described here. To contact us about
          privacy, write{" "}
          <a className="underline" href="mailto:hello@thelifestylefresh.com">
            hello@thelifestylefresh.com
          </a>
          .
        </p>

        <h2>2. What we collect</h2>
        <h3>To run the membership</h3>
        <ul>
          <li>
            Your name and email, so we can write to you and address the envelope.
          </li>
          <li>
            Your continental U.S. shipping address (street, city, state, ZIP), so we can post the
            envelope. {SHIPPING_COPY}
          </li>
          <li>
            A password for your account, stored only as a one-way hash; we never see your plain
            password.
          </li>
          <li>
            Stripe identifiers (customer and subscription IDs) and the subscription status needed to
            manage billing. We do not store your full card number; card data is handled by Stripe.
          </li>
        </ul>
        <h3>If you ask to join</h3>
        <ul>
          <li>
            The name, email, city, state, and note you give us in an invite request, so we can
            consider your request and write back.
          </li>
        </ul>
        <h3>If you read the journal</h3>
        <ul>
          <li>
            Your email, if you sign up for the newsletter, so we can send occasional letters from
            the house.
          </li>
        </ul>
        <h3>Technical and usage information</h3>
        <ul>
          <li>
            A signed, HTTP-only session cookie (<code>lf_session</code>) that keeps you signed in.
          </li>
          <li>
            Your cookie preference, stored locally in your browser as
            <code> lf_cookie_consent</code>.
          </li>
          <li>
            If you accept analytics cookies, a light analytics cookie that tells us which pages are
            visited. You can refuse those and still request an invite, subscribe, and read the
            journal.
          </li>
          <li>
            Basic server logs (request time, status, approximate region) kept briefly for security
            and reliability. We do not build an advertising profile of you.
          </li>
        </ul>

        <h2>3. How we use it</h2>
        <ul>
          <li>To post the envelope to you and run the membership;</li>
          <li>To process payments and manage your subscription through Stripe;</li>
          <li>To consider your invite request and to write to you about it;</li>
          <li>To send the newsletter you asked for, and to send service notices about your account;</li>
          <li>To keep the membership within its cap and to prevent abuse of invitations;</li>
          <li>To meet legal, tax, and accounting obligations.</li>
        </ul>
        <p>
          We do not sell your personal information, and we do not use it to advertise to you across
          other sites.
        </p>

        <h2>4. Legal bases (GDPR/UK)</h2>
        <p>
          Where EU or UK law applies, we rely on: performance of the contract you enter by becoming
          a member (posting the envelope, billing); our legitimate interests in running a small
          membership securely and preventing abuse; your consent (for the newsletter and for
          analytics cookies); and legal obligations. You may withdraw consent at any time without
          losing rights you have by contract.
        </p>

        <h2>5. How we share it</h2>
        <ul>
          <li>
            <strong>Stripe</strong> &mdash; processes your payments and holds card data. Stripe is a
            separate controller of the payment data it collects; its privacy policy applies.
          </li>
          <li>
            <strong>Hosting and infrastructure</strong> &mdash; the Site and its database are hosted
            on Railway (and its sub-processors), which stores data to keep the service running.
          </li>
          <li>
            <strong>Carriers</strong> &mdash; the postal or courier service that carries your
            envelope receives your name and address as needed for delivery.
          </li>
          <li>
            <strong>As required by law</strong> &mdash; we may disclose information to respond to a
            valid legal request or to protect the rights, property, or safety of the House or
            others.
          </li>
        </ul>
        <p>
          We do not sell or rent the member list. We do not share your information for cross-site
          advertising.
        </p>

        <h2>6. Cookies and similar technologies</h2>
        <p>
          The essential session cookie (<code>lf_session</code>) is necessary for signing in and is
          set without a separate prompt. Analytics cookies are set only if you accept them through
          the cookie banner. Your choice is remembered in your browser as
          <code> lf_cookie_consent</code>. See our{" "}
          <Link href="/cookies" className="underline">
            Cookie Notice
          </Link>{" "}
          for more detail.
        </p>

        <h2>7. How long we keep it</h2>
        <ul>
          <li>
            Membership data is kept for as long as you are a member, and for a reasonable period
            afterward to handle returns, disputes, accounting, and legal obligations.
          </li>
          <li>
            Invite requests that are not accepted are kept long enough to consider them and to
            write back; you may ask us to delete yours at any time.
          </li>
          <li>
            Newsletter sign-ups are kept until you unsubscribe (there is an unsubscribe link in
            every note).
          </li>
          <li>
            Server logs are kept briefly and then deleted.
          </li>
        </ul>

        <h2>8. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to:
        </p>
        <ul>
          <li>see what personal information we hold about you;</li>
          <li>correct information that is wrong or out of date;</li>
          <li>delete your information, subject to legal and accounting obligations;</li>
          <li>export your information in a portable format;</li>
          <li>object to or restrict certain processing;</li>
          <li>withdraw consent for processing that relied on it (including analytics cookies and the newsletter);</li>
          <li>opt out of any &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information as those terms are defined under California law (we do not sell or share your information in those senses).</li>
        </ul>
        <p>
          To exercise any of these, write{" "}
          <a className="underline" href="mailto:hello@thelifestylefresh.com">
            hello@thelifestylefresh.com
          </a>{" "}
          from the email on your account. We will respond within a reasonable time and may ask for
          information to verify your identity. If you are not satisfied with our response, you may
          complain to your local data protection authority.
        </p>

        <h2>9. Children</h2>
        <p>
          The membership is not directed to anyone under eighteen (18), and we do not knowingly
          collect personal information from children. If you believe a child has given us
          information, write us and we will delete it.
        </p>

        <h2>10. International and transfers</h2>
        <p>
          The membership ships only within the contiguous United States, and your data is stored
          and processed in the United States. If you access the Site from outside the U.S., you
          understand that your information is transferred here for the purposes described in this
          policy.
        </p>

        <h2>11. Security</h2>
        <p>
          We use reasonable measures suited to a small membership: HTTPS in transit, hashed
          passwords, an HTTP-only session cookie, and access limited to the people who run the
          House. No method of storage is fully secure, and we cannot guarantee absolute security,
          but we will notify affected members as required by law if a breach occurs.
        </p>

        <h2>12. Changes to this policy</h2>
        <p>
          We may update this policy from time to time and will post the revised version on the Site
          with an updated &ldquo;Last updated&rdquo; date. If a change is material, we will also try
          to notify active members by email.
        </p>

        <h2>13. Contact</h2>
        <p>
          For any privacy question or request, write{" "}
          <a className="underline" href="mailto:hello@thelifestylefresh.com">
            hello@thelifestylefresh.com
          </a>
          . See also our{" "}
          <Link href="/terms" className="underline">
            Terms of Service
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
