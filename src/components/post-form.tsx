"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["Lifestyle", "Wellness", "Recipes", "Beauty", "Journal"];
const tones: { value: string; label: string }[] = [
  { value: "paper", label: "Paper" },
  { value: "brass", label: "Brass" },
  { value: "seal", label: "Seal" },
  { value: "blush", label: "Blush" },
  { value: "sage", label: "Sage" },
  { value: "teal", label: "Teal" },
  { value: "slate", label: "Slate" },
  { value: "ink", label: "Ink" },
  { value: "oxblood", label: "Oxblood" },
  { value: "copper", label: "Copper" },
  { value: "winter", label: "Cinnamon & amber" },
  { value: "spring", label: "Lilac & vanilla" },
  { value: "summer", label: "Apricot & honey" },
  { value: "autumn", label: "Saffron & plum" },
];

type PostValues = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  coverTone?: string;
  published?: boolean;
};

function CoverTonePicker({ defaultValue }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue || "paper");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = tones.find((t) => t.value === value) ?? tones[0];

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="field flex items-center justify-between"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Cover tone: ${current.label}`}
        aria-expanded={open}
      >
        <span className={`cover-${value} h-6 w-24 rounded-[1px]`} />
        <span className="eyebrow">{current.label}</span>
      </button>
      {open ? (
        <div className="absolute z-20 mt-2 grid w-full grid-cols-3 gap-2 border border-[var(--rule)] bg-[var(--paper-lift)] p-2 sm:grid-cols-5">
          {tones.map((t) => (
            <button
              key={t.value}
              type="button"
              title={t.label}
              onClick={() => {
                setValue(t.value);
                setOpen(false);
              }}
              aria-label={t.label}
              aria-pressed={t.value === value}
              className={`cover-${t.value} h-12 w-full rounded-[1px] ${
                t.value === value ? "ring-2 ring-[var(--ink)]" : "ring-1 ring-[var(--rule)]"
              }`}
            />
          ))}
        </div>
      ) : null}
      <input type="hidden" name="coverTone" value={value} />
    </div>
  );
}

export function PostForm({ post }: { post?: PostValues }) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      ...form,
      published: form.published === "on",
    };
    const response = await fetch(post?.id ? `/api/admin/posts/${post.id}` : "/api/admin/posts", {
      method: post?.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      setError("The essay could not be saved.");
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input className="field" name="title" required defaultValue={post?.title} placeholder="Title" />
      <input className="field" name="slug" required defaultValue={post?.slug} placeholder="slug" />
      <input
        className="field"
        name="excerpt"
        required
        defaultValue={post?.excerpt}
        placeholder="Excerpt"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <select className="field" name="category" defaultValue={post?.category || "Journal"}>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <CoverTonePicker defaultValue={post?.coverTone} />
      </div>
      <textarea
        className="field min-h-72"
        name="content"
        required
        defaultValue={post?.content}
        placeholder="Markdown"
      />
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" name="published" defaultChecked={post?.published} />
        Published
      </label>
      <button className="btn btn-ink">{post?.id ? "Save" : "Create"}</button>
      {error ? (
        <p className="text-sm text-seal" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
