import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-24 text-center">
      <p className="script text-4xl">Mislaid</p>
      <h1 className="serif mt-4 text-5xl tracking-[-0.04em]">This page was not posted.</h1>
      <Link href="/" className="btn btn-ink mt-8">
        Return home
      </Link>
    </div>
  );
}
