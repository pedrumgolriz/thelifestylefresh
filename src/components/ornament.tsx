import Image from "next/image";

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ink-draw flex items-center gap-2 text-gold ${className}`} aria-hidden="true">
      <span className="gold-rule flex-1" />
      <span className="h-px w-3 bg-current opacity-70" />
      <Image
        src="/lf-monogram.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 mix-blend-screen"
      />
      <span className="h-px w-3 bg-current opacity-70" />
      <span className="gold-rule flex-1" />
    </div>
  );
}
