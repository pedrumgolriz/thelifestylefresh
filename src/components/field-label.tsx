export function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="flex flex-wrap items-baseline gap-1">
      {children}
      {required ? (
        <>
          <span className="text-seal" aria-hidden="true">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      ) : null}
    </span>
  );
}
