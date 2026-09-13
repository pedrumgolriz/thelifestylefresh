export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ink-draw flex items-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="gold-rule flex-1" />
      <svg viewBox="0 0 56 20" className="h-5 w-14 fill-none stroke-current">
        <path d="M4 10h14" strokeWidth="1" />
        <path
          d="M28 3.2c.4 2.2-1.2 3.6-3.2 3.8 2.4.2 3.6 1.8 3.2 4.2 2.2-.6 4.4.8 4.6 3.2-1.8.6-2.8 2.2-2.2 4.2-1.8-.4-3.6.8-4.6 2.6-1-1.8-2.8-3-4.6-2.6.6-2-1-3.6-2.2-4.2.2-2.4 2.4-3.8 4.6-3.2-.4-2.4.8-4 3.2-4.2-2-.2-3.6-1.6-3.2-3.8Z"
          strokeWidth="0.9"
        />
        <path d="M38 10h14" strokeWidth="1" />
      </svg>
      <span className="gold-rule flex-1" />
    </div>
  );
}
