import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-28 text-center">
      <p className="script text-4xl sm:text-5xl">Mislaid</p>
      <h1 className="serif mt-5 text-5xl tracking-[-0.02em]">This page was not posted.</h1>
      <p className="mt-5 text-base leading-7 text-ink-soft">
        The letter may have gone astray. The house keeps the rest.
      </p>
      <Link href="/" className="btn btn-ink mt-8">
        Return to the house
      </Link>
    </div>
  );
}
