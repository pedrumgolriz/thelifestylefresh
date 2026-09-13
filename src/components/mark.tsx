import Image from "next/image";

export function Mark({
  className = "h-10 w-10",
  decorative = true,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/monogram-ivory.png"
      alt={
        decorative
          ? ""
          : "The Lifestyle Fresh monogram: interlocking L and F in brass on ivory."
      }
      width={160}
      height={160}
      className={`crest ${className}`}
    />
  );
}
