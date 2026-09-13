"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["Lifestyle", "Wellness", "Recipes", "Beauty", "Journal"];
const tones = ["paper", "seal", "blush", "sage", "ink"];

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
        <select className="field" name="coverTone" defaultValue={post?.coverTone || "paper"}>
          {tones.map((tone) => (
            <option key={tone}>{tone}</option>
          ))}
        </select>
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
