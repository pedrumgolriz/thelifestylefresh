import { prisma } from "@/lib/db";

export default async function AdminEditionsPage() {
  const editions = await prisma.edition.findMany({
    include: { items: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });

  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="eyebrow-brass">Editions</p>
        <h1 className="serif mt-3 text-4xl tracking-[-0.02em]">This month’s seal.</h1>
        <form action="/api/admin/editions" method="post" className="mt-6 grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input className="field" name="month" type="number" min={1} max={12} placeholder="Month" required />
            <input className="field" name="year" type="number" min={2026} placeholder="Year" required />
          </div>
          <input className="field" name="title" required placeholder="Title" />
          <textarea className="field min-h-32" name="letter" required placeholder="Letter" />
          <textarea
            className="field min-h-40"
            name="items"
            placeholder={"One item per line: Category | Name | Description"}
          />
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" name="published" defaultChecked />
            Published
          </label>
          <button className="btn btn-ink">Save edition</button>
        </form>
      </div>
      <div className="space-y-8">
        {editions.map((edition) => (
          <article key={edition.id} className="stationery p-6">
            <p className="eyebrow">
              {edition.month}/{edition.year} · {edition.published ? "Published" : "Draft"}
            </p>
            <h2 className="serif mt-2 text-3xl tracking-[-0.03em]">{edition.title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{edition.letter}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {edition.items.map((item) => (
                <li key={item.id}>
                  <span className="text-ink-soft">{item.category}</span> — {item.name}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
