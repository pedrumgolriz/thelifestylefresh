import { PostForm } from "@/components/post-form";

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">Journal</p>
      <h1 className="serif mt-3 text-4xl tracking-[-0.04em]">New essay.</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
